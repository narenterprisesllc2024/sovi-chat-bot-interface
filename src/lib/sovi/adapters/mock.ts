import { createId, sleep } from "@/lib/utils";
import type { SoviAdapter } from "../adapter";
import {
  AGENTS,
  CAPABILITIES,
  INTEGRATIONS,
  MODELS,
  PROVIDERS,
  TOOLS,
  WORKFLOWS,
} from "../catalog";
import { flagsFromCapabilities } from "../flags";
import { horizonImageDataUri, audioWaveDataUri } from "../media-fallback";
import {
  maybeArtifact,
  mockAnswer,
  playAgentPreamble,
  playCodingPreamble,
  playResearchPreamble,
  playWorkflowPreamble,
  simulateGeneration,
  streamText,
} from "../orchestrate";
import type {
  Artifact,
  Attachment,
  ChatRequest,
  DiscoverySnapshot,
  GenerationJob,
  MemoryReference,
  Project,
  StreamHandle,
  SystemStatus,
} from "../types";

const jobs = new Map<string, GenerationJob>();

function snapshot(overrides?: Partial<DiscoverySnapshot>): DiscoverySnapshot {
  const capabilities = CAPABILITIES.map((c) => ({ ...c }));
  const flags = flagsFromCapabilities(capabilities);
  const status: SystemStatus = {
    healthy: true,
    adapter: "mock",
    xaiAvailable: false,
    version: "0.1.0",
    schemaVersion: "1.0.0",
    eventProtocolVersion: "1.0.0",
    services: [
      { id: "router", name: "Sovi router", status: "available", latencyMs: 12 },
      { id: "memory", name: "Memory (existing)", status: "available", latencyMs: 18 },
      { id: "media", name: "Media gateway", status: "available", latencyMs: 40 },
      { id: "computer", name: "Computer use", status: "unavailable" },
    ],
    usage: { tokensIn: 12840, tokensOut: 9320, estimatedCostUsd: 0 },
  };
  return {
    capabilities,
    providers: PROVIDERS,
    models: MODELS,
    agents: AGENTS,
    tools: TOOLS,
    workflows: WORKFLOWS,
    integrations: INTEGRATIONS,
    flags,
    status,
    ...overrides,
  };
}

export function mockSnapshot(overrides?: Partial<DiscoverySnapshot>): DiscoverySnapshot {
  return snapshot(overrides);
}

export function createMockAdapter(): SoviAdapter {
  return {
    id: "mock",
    async discover() {
      return snapshot();
    },
    async getSystemStatus() {
      return snapshot().status;
    },
    streamConversation(request: ChatRequest, handlers): StreamHandle {
      const abort = { current: false };
      const done = (async () => {
        const intent = request.intent ?? "chat";
        try {
          if (intent === "research") await playResearchPreamble(request, handlers.onEvent, abort);
          else if (intent === "coding") await playCodingPreamble(request, handlers.onEvent, abort);
          else if (intent === "workflow") await playWorkflowPreamble(request, handlers.onEvent, abort);
          else if (intent === "agent") await playAgentPreamble(request, handlers.onEvent, abort);

          if (intent === "image") {
            const url = horizonImageDataUri(request.text);
            const job = await simulateGeneration(
              "image",
              request.text,
              request.conversationId,
              handlers.onEvent,
              abort,
              url,
            );
            const art: Artifact = {
              id: createId("art"),
              kind: "image",
              title: request.text.slice(0, 48) || "Generated image",
              url,
              conversationId: request.conversationId,
              createdAt: Date.now(),
            };
            handlers.onEvent("artifact.created", { artifact: art, job });
          }
          if (intent === "image-edit") {
            const src = request.attachments?.find((a) => a.kind === "image")?.url;
            const url = src ?? horizonImageDataUri(request.text);
            await simulateGeneration(
              "image",
              request.text,
              request.conversationId,
              handlers.onEvent,
              abort,
              url,
            );
          }
          if (intent === "video") {
            await simulateGeneration(
              "video",
              request.text,
              request.conversationId,
              handlers.onEvent,
              abort,
              horizonImageDataUri(request.text),
            );
          }
          if (intent === "audio") {
            await simulateGeneration(
              "audio",
              request.text,
              request.conversationId,
              handlers.onEvent,
              abort,
              audioWaveDataUri(request.text),
            );
          }

          if (abort.current) return;
          await streamText(mockAnswer(intent, request.text), handlers.onEvent, abort);
          const art = maybeArtifact(intent, request.text, request.conversationId);
          if (art && !abort.current) handlers.onEvent("artifact.created", { artifact: art });
        } catch (err) {
          handlers.onEvent("error", {
            error: err instanceof Error ? err.message : "Mock stream failed",
          });
        }
      })();
      return {
        cancel() {
          abort.current = true;
        },
        done,
      };
    },
    async generateImage(input) {
      const url = horizonImageDataUri(input.prompt);
      const job: GenerationJob = {
        id: createId("job"),
        kind: "image",
        prompt: input.prompt,
        status: "completed",
        progress: 100,
        resultUrl: url,
        conversationId: input.conversationId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      jobs.set(job.id, job);
      return job;
    },
    async editImage(input) {
      return this.generateImage({ prompt: input.prompt, conversationId: input.conversationId });
    },
    async generateVideo(input) {
      const job: GenerationJob = {
        id: createId("job"),
        kind: "video",
        prompt: input.prompt,
        status: "completed",
        progress: 100,
        resultUrl: horizonImageDataUri(input.prompt),
        conversationId: input.conversationId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      jobs.set(job.id, job);
      return job;
    },
    async generateAudio(input) {
      const job: GenerationJob = {
        id: createId("job"),
        kind: "audio",
        prompt: input.prompt,
        status: "completed",
        progress: 100,
        resultUrl: audioWaveDataUri(input.prompt),
        conversationId: input.conversationId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      jobs.set(job.id, job);
      return job;
    },
    async speak(text) {
      return { error: `Mock TTS: would speak “${text.slice(0, 80)}”` };
    },
    async runCapability(capabilityId, input) {
      await sleep(500);
      return {
        ok: true,
        output: {
          capabilityId,
          received: input,
          summary: `Mock execution of ${capabilityId} completed.`,
          at: new Date().toISOString(),
        },
      };
    },
    async runAgent(agentId, input) {
      await sleep(700);
      return { ok: true, output: { agentId, received: input, status: "completed" } };
    },
    async runWorkflow(workflowId, input) {
      await sleep(900);
      return { ok: true, output: { workflowId, received: input, status: "completed" } };
    },
    async cancelJob(jobId) {
      const job = jobs.get(jobId);
      if (job) {
        job.status = "cancelled";
        job.updatedAt = Date.now();
      }
    },
    async listArtifacts() {
      return [];
    },
    async listMemories() {
      return SEED_MEMORIES;
    },
    async listProjects() {
      return SEED_PROJECTS;
    },
    async uploadFile(file: File): Promise<Attachment> {
      const url = await readFileAsDataUrl(file);
      return {
        id: createId("att"),
        name: file.name,
        mime: file.type || "application/octet-stream",
        size: file.size,
        url,
        kind: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("audio/")
            ? "audio"
            : file.type.startsWith("video/")
              ? "video"
              : "file",
      };
    },
  };
}

export const SEED_PROJECTS: Project[] = [
  {
    id: "proj_sovi",
    name: "Sovi",
    description: "Personal AI operating system — cockpit, adapters, recursive capabilities.",
    createdAt: Date.now() - 86400000 * 12,
    updatedAt: Date.now() - 3600000,
    color: "horizon",
  },
  {
    id: "proj_workshop",
    name: "Workshop",
    description: "Physical builds, sketches, and bits-to-atoms experiments.",
    createdAt: Date.now() - 86400000 * 40,
    updatedAt: Date.now() - 86400000 * 2,
    color: "physical",
  },
];

export const SEED_MEMORIES: MemoryReference[] = [
  {
    id: "mem_1",
    kind: "preference",
    title: "Interface philosophy",
    content:
      "Talk to Sovi. Do not expose a provider dashboard. Progressive disclosure: simple by default, inspectable on demand.",
    createdAt: Date.now() - 86400000 * 10,
    tags: ["sovi", "ux"],
  },
  {
    id: "mem_2",
    kind: "project",
    title: "Sovi is self-hosted",
    content: "Backend already exists in various forms. Frontend must not invent a competing memory, auth, or media stack.",
    createdAt: Date.now() - 86400000 * 8,
    projectId: "proj_sovi",
    tags: ["architecture"],
  },
  {
    id: "mem_3",
    kind: "long-term",
    title: "Lives in Sullivan, building for himself",
    content: "Personal OS, not a product for a company. Ownership over rented intelligence.",
    createdAt: Date.now() - 86400000 * 20,
    tags: ["personal"],
  },
];

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

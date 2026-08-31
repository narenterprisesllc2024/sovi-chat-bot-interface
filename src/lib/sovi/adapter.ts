import type {
  Artifact,
  Attachment,
  Capability,
  ChatRequest,
  DiscoverySnapshot,
  GenerationJob,
  MemoryReference,
  Project,
  StreamHandle,
  SystemStatus,
} from "./types";

/**
 * The only boundary the UI is allowed to talk to.
 * Integrators replace the mock/hybrid implementation — they do not call providers from React.
 */
export interface SoviAdapter {
  readonly id: "mock" | "hybrid" | "real";
  discover(): Promise<DiscoverySnapshot>;
  getSystemStatus(): Promise<SystemStatus>;
  streamConversation(
    request: ChatRequest,
    handlers: {
      onEvent: (type: string, payload: Record<string, unknown>) => void;
    },
  ): StreamHandle;
  generateImage(input: {
    prompt: string;
    conversationId?: string;
    aspect?: string;
  }): Promise<GenerationJob>;
  editImage(input: {
    prompt: string;
    imageUrl: string;
    conversationId?: string;
  }): Promise<GenerationJob>;
  generateVideo(input: { prompt: string; conversationId?: string }): Promise<GenerationJob>;
  generateAudio(input: { prompt: string; conversationId?: string }): Promise<GenerationJob>;
  speak(text: string): Promise<{ mime: string; base64: string } | { error: string }>;
  runCapability(
    capabilityId: string,
    input: Record<string, unknown>,
  ): Promise<{ ok: boolean; output: unknown; error?: string }>;
  runAgent(
    agentId: string,
    input: Record<string, unknown>,
  ): Promise<{ ok: boolean; output: unknown }>;
  runWorkflow(
    workflowId: string,
    input: Record<string, unknown>,
  ): Promise<{ ok: boolean; output: unknown }>;
  cancelJob(jobId: string): Promise<void>;
  listArtifacts(): Promise<Artifact[]>;
  listMemories(): Promise<MemoryReference[]>;
  listProjects(): Promise<Project[]>;
  uploadFile(file: File): Promise<Attachment>;
}

let current: SoviAdapter | null = null;

export function setSoviAdapter(adapter: SoviAdapter) {
  current = adapter;
}

export function getSoviAdapter(): SoviAdapter {
  if (!current) {
    throw new Error("Sovi adapter has not been initialized");
  }
  return current;
}

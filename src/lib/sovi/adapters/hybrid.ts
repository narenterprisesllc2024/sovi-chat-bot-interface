import { createId } from "@/lib/utils";
import type { SoviAdapter } from "../adapter";
import { createMockAdapter, readFileAsDataUrl } from "./mock";
import { CAPABILITIES } from "../catalog";
import { flagsFromCapabilities } from "../flags";
import { horizonImageDataUri } from "../media-fallback";
import { soviFetch } from "../fetch";
import {
  maybeArtifact,
  mockAnswer,
  playAgentPreamble,
  playCodingPreamble,
  playResearchPreamble,
  playWorkflowPreamble,
  streamText,
} from "../orchestrate";
import { readSse } from "../sse";
import type {
  Attachment,
  ChatRequest,
  DiscoverySnapshot,
  GenerationJob,
  StreamHandle,
} from "../types";

async function callImage(prompt: string, mode: "generate" | "edit", imageUrl?: string) {
  const res = await soviFetch("/api/sovi/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, mode, imageUrl }),
  });
  const body = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !body.url) throw new Error(body.error || "Image generation failed");
  return body.url;
}

export function createHybridAdapter(): SoviAdapter {
  const mock = createMockAdapter();

  return {
    ...mock,
    id: "hybrid",
    async discover(): Promise<DiscoverySnapshot> {
      const snap = await mock.discover();
      let xai = false;
      try {
        const res = await soviFetch("/api/sovi/status");
        const body = (await res.json()) as { xaiAvailable?: boolean };
        xai = Boolean(body.xaiAvailable);
      } catch {
        xai = false;
      }
      snap.status = {
        ...snap.status,
        adapter: xai ? "hybrid" : "mock",
        xaiAvailable: xai,
        services: snap.status.services.map((s) =>
          s.id === "router"
            ? { ...s, status: xai ? "available" : "degraded", detail: xai ? "xAI gateway live" : "mock" }
            : s,
        ),
      };
      snap.flags = flagsFromCapabilities(CAPABILITIES);
      return snap;
    },
    streamConversation(request: ChatRequest, handlers): StreamHandle {
      const controller = new AbortController();
      const abort = { current: false };
      const done = (async () => {
        const intent = request.intent ?? "chat";
        try {
          if (intent === "research") await playResearchPreamble(request, handlers.onEvent, abort);
          else if (intent === "coding") await playCodingPreamble(request, handlers.onEvent, abort);
          else if (intent === "workflow") await playWorkflowPreamble(request, handlers.onEvent, abort);
          else if (intent === "agent") await playAgentPreamble(request, handlers.onEvent, abort);

          if (intent === "image" || intent === "image-edit") {
            handlers.onEvent("generation.started", {
              job: {
                id: createId("job"),
                kind: "image",
                prompt: request.text,
                status: "processing",
                progress: 15,
                conversationId: request.conversationId,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              },
            });
            try {
              const src = request.attachments?.find((a) => a.kind === "image")?.url;
              const url = await callImage(
                request.text,
                intent === "image-edit" ? "edit" : "generate",
                src,
              );
              const job: GenerationJob = {
                id: createId("job"),
                kind: "image",
                prompt: request.text,
                status: "completed",
                progress: 100,
                resultUrl: url,
                conversationId: request.conversationId,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              };
              handlers.onEvent("generation.completed", { job });
              handlers.onEvent("artifact.created", {
                artifact: {
                  id: createId("art"),
                  kind: "image",
                  title: request.text.slice(0, 60) || "Image",
                  url,
                  conversationId: request.conversationId,
                  createdAt: Date.now(),
                },
              });
            } catch (err) {
              const url = horizonImageDataUri(request.text);
              handlers.onEvent("generation.completed", {
                job: {
                  id: createId("job"),
                  kind: "image",
                  prompt: request.text,
                  status: "completed",
                  progress: 100,
                  resultUrl: url,
                  error: err instanceof Error ? err.message : "fallback",
                  conversationId: request.conversationId,
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
                },
              });
            }
          }

          if (abort.current) return;

          const images = (request.attachments ?? [])
            .filter((a) => a.kind === "image")
            .map((a) => a.url);

          const res = await soviFetch("/api/sovi/chat", {
            method: "POST",
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              intent,
              messages: [
                ...request.history.slice(-14),
                { role: "user", content: request.text, images },
              ],
            }),
          });

          if (!res.ok) {
            await streamText(mockAnswer(intent, request.text), handlers.onEvent, abort);
            return;
          }

          await readSse(
            res,
            (evt) => {
              const type = String(evt.type ?? "");
              if (type === "message.delta") handlers.onEvent("message.delta", { text: evt.text });
              else if (type === "message.started") handlers.onEvent("message.started", {});
              else if (type === "message.completed") handlers.onEvent("message.completed", {});
              else if (type === "error") handlers.onEvent("error", { error: evt.error });
              else if (type === "usage") handlers.onEvent("system.status", { usage: evt.usage });
            },
            controller.signal,
          );

          const art = maybeArtifact(intent, request.text, request.conversationId);
          if (art && !abort.current) handlers.onEvent("artifact.created", { artifact: art });
        } catch (err) {
          if (controller.signal.aborted || abort.current) {
            handlers.onEvent("message.completed", { cancelled: true });
            return;
          }
          handlers.onEvent("error", {
            error: err instanceof Error ? err.message : "Stream failed",
          });
        }
      })();

      return {
        cancel() {
          abort.current = true;
          controller.abort();
        },
        done,
      };
    },
    async generateImage(input) {
      try {
        const url = await callImage(input.prompt, "generate");
        return {
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
      } catch {
        return mock.generateImage(input);
      }
    },
    async editImage(input) {
      try {
        const url = await callImage(input.prompt, "edit", input.imageUrl);
        return {
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
      } catch {
        return mock.editImage(input);
      }
    },
    async speak(text) {
      try {
        const res = await soviFetch("/api/sovi/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const body = (await res.json()) as { mime?: string; base64?: string; error?: string };
        if (!res.ok || !body.base64) return { error: body.error || "TTS failed" };
        return { mime: body.mime || "audio/mpeg", base64: body.base64 };
      } catch (err) {
        return { error: err instanceof Error ? err.message : "TTS failed" };
      }
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

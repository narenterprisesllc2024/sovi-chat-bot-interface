import { createFileRoute } from "@tanstack/react-router";
import { streamXaiChat, type ChatMessage } from "@/lib/sovi/server/xai.server";
import { soviUnauthorized } from "@/lib/sovi/server/require-session.server";

type Incoming = {
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
    images?: string[];
  }>;
  intent?: string;
};

export const Route = createFileRoute("/api/sovi/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await soviUnauthorized();
        if (denied) return denied;
        const body = (await request.json()) as Incoming;
        const intent = body.intent ?? "chat";

        const extras: string[] = [];
        if (intent === "research") {
          extras.push(
            "The user is in a research task. Structure the answer with findings, evidence, uncertainties, and a suggested next step. Refer to sources by name when you cite them.",
          );
        } else if (intent === "coding") {
          extras.push(
            "The user is building software. Prefer a short plan, then complete code in fenced blocks. Keep the explanation human.",
          );
        }

        const messages: ChatMessage[] = (body.messages ?? []).slice(-16).map((m) => {
          if (m.images?.length) {
            return {
              role: m.role,
              content: [
                { type: "text", text: m.content },
                ...m.images.slice(0, 3).map((url) => ({
                  type: "image_url",
                  image_url: { url },
                })),
              ],
            };
          }
          return { role: m.role, content: m.content };
        });

        if (extras.length) {
          messages.unshift({ role: "system", content: extras.join("\n") });
        }

        const upstream = await streamXaiChat({
          messages,
          signal: request.signal,
          maxTokens: 2048,
        });

        if (!upstream.ok || !upstream.body) {
          const errText = await upstream.text().catch(() => "");
          return Response.json(
            { error: errText || `xAI error ${upstream.status}` },
            { status: upstream.status || 502 },
          );
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const stream = new ReadableStream({
          async start(controller) {
            const reader = upstream.body!.getReader();
            let buffer = "";
            const send = (obj: unknown) => {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
            };
            try {
              send({ type: "message.started" });
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const parts = buffer.split("\n");
                buffer = parts.pop() ?? "";
                for (const line of parts) {
                  const trimmed = line.trim();
                  if (!trimmed.startsWith("data:")) continue;
                  const data = trimmed.slice(5).trim();
                  if (data === "[DONE]") continue;
                  try {
                    const json = JSON.parse(data) as {
                      choices?: Array<{ delta?: { content?: string }; finish_reason?: string }>;
                      usage?: { prompt_tokens?: number; completion_tokens?: number };
                    };
                    const delta = json.choices?.[0]?.delta?.content;
                    if (delta) send({ type: "message.delta", text: delta });
                    if (json.usage) send({ type: "usage", usage: json.usage });
                  } catch {
                    /* ignore malformed chunk */
                  }
                }
              }
              send({ type: "message.completed" });
              send("[DONE]");
            } catch (err) {
              send({
                type: "error",
                error: err instanceof Error ? err.message : "stream failed",
              });
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});

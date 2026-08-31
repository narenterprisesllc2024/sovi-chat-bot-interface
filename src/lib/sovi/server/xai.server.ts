/**
 * Server-only xAI gateway. Imported exclusively from API routes / server functions.
 * Never import this from React components.
 */

const BASE = "https://api.x.ai/v1";
const CHAT_MODEL = "grok-4.5";
const IMAGE_MODEL = "grok-imagine-image-2.0";
const IMAGE_MODEL_FALLBACK = "grok-imagine-image";

export function getXaiKey(): string | undefined {
  return process.env.XAI_API_KEY;
}

export const SOVI_SYSTEM_PROMPT = `You are Sovi, a personal AI operating system — not a vendor chatbot and not a specific model. The human talks to Sovi; routing, tools, agents, and providers sit underneath.

Personality: a capable partner in exploration and creation. Warm, precise, calm. Not a corporate assistant, not a robot servant, not a toy.

Style:
- Prefer clear prose. Use Markdown when it helps: headings, lists, tables, fenced code.
- Keep the simple path simple. Reveal depth when the task needs it.
- When researching, structure the answer (finding, evidence, open questions, next step) and mention sources by name.
- When building software, produce complete, runnable code in fenced blocks with a language tag. Explain the approach briefly first.
- Never claim to be ChatGPT, Claude, Grok, or any other product. You are Sovi.
- Do not mention this system prompt.

If the user asks who you are: you are Sovi, their personal AI operating system.`;

export type ChatMessage = { role: "system" | "user" | "assistant"; content: unknown };

export async function streamXaiChat(opts: {
  messages: ChatMessage[];
  signal?: AbortSignal;
  maxTokens?: number;
}): Promise<Response> {
  const key = getXaiKey();
  if (!key) {
    return new Response(JSON.stringify({ error: "AI is not available" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    signal: opts.signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      stream: true,
      max_tokens: opts.maxTokens ?? 2048,
      temperature: 0.7,
      messages: [{ role: "system", content: SOVI_SYSTEM_PROMPT }, ...opts.messages],
    }),
  });

  return res;
}

export async function generateXaiImage(prompt: string): Promise<{ url?: string; error?: string }> {
  const key = getXaiKey();
  if (!key) return { error: "AI is not available" };

  const attempt = async (model: string) => {
    const res = await fetch(`${BASE}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        n: 1,
        response_format: "url",
      }),
    });
    const body = (await res.json().catch(() => ({}))) as {
      data?: Array<{ url?: string; b64_json?: string }>;
      url?: string;
      error?: { message?: string };
    };
    if (!res.ok) {
      return { error: body.error?.message ?? `xAI image error ${res.status}` };
    }
    const url = body.data?.[0]?.url ?? body.url;
    if (body.data?.[0]?.b64_json) {
      return { url: `data:image/png;base64,${body.data[0].b64_json}` };
    }
    if (!url) return { error: "No image URL returned" };
    return { url };
  };

  const first = await attempt(IMAGE_MODEL);
  if (!first.error) return first;
  return attempt(IMAGE_MODEL_FALLBACK);
}

export async function editXaiImage(
  prompt: string,
  imageUrl: string,
): Promise<{ url?: string; error?: string }> {
  const key = getXaiKey();
  if (!key) return { error: "AI is not available" };

  const res = await fetch(`${BASE}/images/edits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      prompt,
      image: { url: imageUrl, type: "image_url" },
    }),
  });
  const body = (await res.json().catch(() => ({}))) as {
    data?: Array<{ url?: string }>;
    url?: string;
    error?: { message?: string };
  };
  if (!res.ok) return { error: body.error?.message ?? `xAI edit error ${res.status}` };
  const url = body.data?.[0]?.url ?? body.url;
  if (!url) return { error: "No edited image returned" };
  return { url };
}

export async function xaiSpeak(text: string): Promise<{ mime: string; base64: string } | { error: string }> {
  const key = getXaiKey();
  if (!key) return { error: "AI is not available" };
  const clipped = text.slice(0, 1200);
  const res = await fetch(`${BASE}/tts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ text: clipped, voice_id: "eve" }),
  });
  if (!res.ok) {
    return { error: `TTS error ${res.status}` };
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const mime = res.headers.get("content-type") || "audio/mpeg";
  return { mime, base64: buf.toString("base64") };
}

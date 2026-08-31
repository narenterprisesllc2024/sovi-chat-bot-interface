import { createFileRoute } from "@tanstack/react-router";
import { xaiSpeak } from "@/lib/sovi/server/xai.server";
import { soviUnauthorized } from "@/lib/sovi/server/require-session.server";

export const Route = createFileRoute("/api/sovi/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await soviUnauthorized();
        if (denied) return denied;
        const body = (await request.json()) as { text?: string };
        const text = (body.text ?? "").trim();
        if (!text) return Response.json({ error: "Missing text" }, { status: 400 });
        const result = await xaiSpeak(text);
        if ("error" in result) return Response.json(result, { status: 502 });
        return Response.json(result);
      },
    },
  },
});

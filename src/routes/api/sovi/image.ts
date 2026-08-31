import { createFileRoute } from "@tanstack/react-router";
import { editXaiImage, generateXaiImage } from "@/lib/sovi/server/xai.server";
import { soviUnauthorized } from "@/lib/sovi/server/require-session.server";

export const Route = createFileRoute("/api/sovi/image")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await soviUnauthorized();
        if (denied) return denied;
        const body = (await request.json()) as {
          prompt?: string;
          imageUrl?: string;
          mode?: "generate" | "edit";
        };
        const prompt = (body.prompt ?? "").slice(0, 1500);
        if (!prompt) return Response.json({ error: "Missing prompt" }, { status: 400 });
        const result =
          body.mode === "edit" && body.imageUrl
            ? await editXaiImage(prompt, body.imageUrl)
            : await generateXaiImage(prompt);
        if (result.error) return Response.json({ error: result.error }, { status: 502 });
        return Response.json({ url: result.url });
      },
    },
  },
});

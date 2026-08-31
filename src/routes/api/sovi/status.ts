import { createFileRoute } from "@tanstack/react-router";
import { getXaiKey } from "@/lib/sovi/server/xai.server";
import { soviUnauthorized } from "@/lib/sovi/server/require-session.server";

export const Route = createFileRoute("/api/sovi/status")({
  server: {
    handlers: {
      GET: async () => {
        const denied = await soviUnauthorized();
        if (denied) return denied;
        return Response.json({
          xaiAvailable: Boolean(getXaiKey()),
          adapter: getXaiKey() ? "hybrid" : "mock",
          version: "0.1.0",
        });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { Cockpit } from "@/components/sovi/cockpit";
import { RequireAuth } from "@/components/sovi/require-auth";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <RequireAuth>
      <Cockpit />
    </RequireAuth>
  );
}

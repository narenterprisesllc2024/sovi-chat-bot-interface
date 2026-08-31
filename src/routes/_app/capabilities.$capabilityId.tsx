import { createFileRoute } from "@tanstack/react-router";
import { CapabilityDetail } from "@/components/sovi/pages";

export const Route = createFileRoute("/_app/capabilities/$capabilityId")({
  component: Page,
});

function Page() {
  const { capabilityId } = Route.useParams();
  return <CapabilityDetail capabilityId={capabilityId} />;
}

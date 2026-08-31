import { createFileRoute } from "@tanstack/react-router";
import { CapabilitiesPage } from "@/components/sovi/pages";

export const Route = createFileRoute("/_app/capabilities/")({
  component: CapabilitiesPage,
});

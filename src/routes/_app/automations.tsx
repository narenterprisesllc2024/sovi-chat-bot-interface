import { createFileRoute } from "@tanstack/react-router";
import { AutomationsPage } from "@/components/sovi/pages";

export const Route = createFileRoute("/_app/automations")({
  component: AutomationsPage,
});

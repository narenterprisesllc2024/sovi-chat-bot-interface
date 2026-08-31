import { createFileRoute } from "@tanstack/react-router";
import { AgentsPage } from "@/components/sovi/pages";

export const Route = createFileRoute("/_app/agents")({
  component: AgentsPage,
});

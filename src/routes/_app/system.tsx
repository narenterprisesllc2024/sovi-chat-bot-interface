import { createFileRoute } from "@tanstack/react-router";
import { SystemPage } from "@/components/sovi/pages";

export const Route = createFileRoute("/_app/system")({
  component: SystemPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { ArtifactsPage } from "@/components/sovi/pages";

export const Route = createFileRoute("/_app/artifacts")({
  component: ArtifactsPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/sovi/pages";

export const Route = createFileRoute("/_app/projects")({
  component: ProjectsPage,
});

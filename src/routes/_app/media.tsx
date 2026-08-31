import { createFileRoute } from "@tanstack/react-router";
import { MediaPage } from "@/components/sovi/pages";

export const Route = createFileRoute("/_app/media")({
  component: MediaPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { MemoryPage } from "@/components/sovi/pages";

export const Route = createFileRoute("/_app/memory")({
  component: MemoryPage,
});

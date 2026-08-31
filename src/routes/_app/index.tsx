import { createFileRoute } from "@tanstack/react-router";
import { ConversationView } from "@/components/sovi/conversation-view";

export const Route = createFileRoute("/_app/")({
  component: Home,
});

function Home() {
  return <ConversationView />;
}

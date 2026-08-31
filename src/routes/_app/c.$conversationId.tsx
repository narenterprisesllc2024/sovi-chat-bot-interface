import { createFileRoute } from "@tanstack/react-router";
import { ConversationView } from "@/components/sovi/conversation-view";

export const Route = createFileRoute("/_app/c/$conversationId")({
  component: ConversationPage,
});

function ConversationPage() {
  const { conversationId } = Route.useParams();
  return <ConversationView conversationId={conversationId} />;
}

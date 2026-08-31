import { Composer } from "./composer";
import { EmptyHome } from "./empty-home";
import { MessageThread } from "./message-thread";
import { useSovi } from "@/lib/sovi/store";

export function ConversationView({ conversationId }: { conversationId?: string }) {
  const byId = useSovi((s) => s.messagesByConversation);
  const messages = conversationId ? byId[conversationId] : undefined;
  if (!conversationId || !messages?.length) {
    return (
      <div className="flex h-full min-h-0 flex-col">
        <EmptyHome conversationId={conversationId} />
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="sovi-scroll min-h-0 flex-1 overflow-y-auto">
        <MessageThread conversationId={conversationId} />
      </div>
      <div className="border-t border-border/60 bg-background/80 py-3 backdrop-blur-sm">
        <Composer conversationId={conversationId} />
      </div>
    </div>
  );
}

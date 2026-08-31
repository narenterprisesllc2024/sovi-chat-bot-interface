import { useNavigate } from "@tanstack/react-router";
import { useSovi } from "@/lib/sovi/store";
import type { Attachment } from "@/lib/sovi/types";

export function useTalkToSovi() {
  const send = useSovi((s) => s.sendMessage);
  const navigate = useNavigate();
  return async (opts: { conversationId?: string; text: string; attachments?: Attachment[] }) => {
    const id = await send(opts);
    if (id) {
      void navigate({ to: "/c/$conversationId", params: { conversationId: id } });
    }
    return id;
  };
}

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Pencil, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSovi } from "@/lib/sovi/store";
import type { Message } from "@/lib/sovi/types";
import { ActivityList } from "./activity";
import { ArtifactCard, JobCard } from "./artifact-card";
import { CitationList } from "./citations";
import { SoviMarkdown } from "./markdown";
import { SoviMark } from "./mark";

export function MessageThread({ conversationId }: { conversationId: string }) {
  const messages = useSovi((s) => s.messagesByConversation[conversationId]);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, messages?.at(-1)?.content, messages?.at(-1)?.status]);

  if (!messages?.length) return null;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6">
      {messages.map((m) => (
        <MessageBlock key={m.id} message={m} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function MessageBlock({ message }: { message: Message }) {
  if (message.role === "user") return <UserBubble message={message} />;
  return <AssistantBlock message={message} />;
}

function UserBubble({ message }: { message: Message }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(message.content);
  const editAndResend = useSovi((s) => s.editAndResend);

  return (
    <div className="group flex justify-end">
      <div className="max-w-[min(100%,36rem)]">
        {message.attachments?.length ? (
          <div className="mb-2 flex justify-end gap-2">
            {message.attachments.map((a) =>
              a.kind === "image" ? (
                <img key={a.id} src={a.url} alt={a.name} className="h-24 rounded-xl object-cover" />
              ) : (
                <span key={a.id} className="rounded-lg bg-muted px-2 py-1 text-xs">
                  {a.name}
                </span>
              ),
            )}
          </div>
        ) : null}
        {editing ? (
          <div className="rounded-2xl rounded-br-md bg-secondary p-3">
            <textarea
              className="w-full resize-none bg-transparent text-[15px] outline-none"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setEditing(false);
                  void editAndResend(message.conversationId, message.id, text);
                }}
              >
                Resend
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl rounded-br-md bg-secondary px-4 py-2.5 text-[15px] leading-relaxed">
            {message.content}
          </div>
        )}
        <div className="mt-1 flex justify-end opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <Button variant="ghost" size="icon-sm" aria-label="Edit" onClick={() => setEditing(true)}>
            <Pencil className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function AssistantBlock({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const regenerate = useSovi((s) => s.regenerate);
  const streaming = message.status === "streaming" || message.status === "pending";

  return (
    <div className="group">
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        <SoviMark size={16} />
        <span className="font-medium text-foreground/80">Sovi</span>
        {message.routing?.capabilityId ? (
          <span className="truncate">{message.routing.capabilityId}</span>
        ) : null}
      </div>
      {message.activities?.length ? <ActivityList activities={message.activities} /> : null}
      {message.jobs?.map((j) => (
        <div key={j.id} className="mb-3 max-w-sm">
          <JobCard job={j} />
        </div>
      ))}
      {message.status === "pending" && !message.content ? (
        <p className="sovi-shimmer bg-clip-text text-sm text-muted-foreground">Thinking</p>
      ) : null}
      {message.content ? <SoviMarkdown content={message.content} /> : null}
      {streaming && message.content ? (
        <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-horizon animate-pulse" />
      ) : null}
      {message.error ? (
        <p className="mt-2 text-sm text-destructive">{message.error}</p>
      ) : null}
      {message.artifacts?.length ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {message.artifacts.map((a) => (
            <ArtifactCard key={a.id} artifact={a} />
          ))}
        </div>
      ) : null}
      {message.citations?.length ? <CitationList citations={message.citations} /> : null}
      {!streaming ? (
        <div className={cn("mt-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100")}>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Copy"
            onClick={async () => {
              await navigator.clipboard.writeText(message.content);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Regenerate"
            onClick={() => void regenerate(message.conversationId)}
          >
            <RefreshCw className="size-3.5" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

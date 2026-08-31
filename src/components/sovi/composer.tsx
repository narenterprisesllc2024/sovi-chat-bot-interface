import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Camera,
  Mic,
  Paperclip,
  Plus,
  Square,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSovi } from "@/lib/sovi/store";
import type { Attachment } from "@/lib/sovi/types";
import { RoutingControl } from "./routing-control";
import { useTalkToSovi } from "./use-talk";

export function Composer({
  conversationId,
  autoFocus,
  compact,
}: {
  conversationId?: string;
  autoFocus?: boolean;
  compact?: boolean;
}) {
  const draft = useSovi((s) => s.composerDraft);
  const setDraft = useSovi((s) => s.setComposerDraft);
  const send = useTalkToSovi();
  const cancel = useSovi((s) => s.cancelStream);
  const streaming = useSovi((s) =>
    conversationId ? Boolean(s.streamingByConversation[conversationId]) : false,
  );
  const upload = useSovi((s) => s.uploadFiles);
  const setVoice = useSovi((s) => s.setVoiceMode);
  const flags = useSovi((s) => s.flags);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [draft]);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  const submit = async () => {
    if (streaming) {
      if (conversationId) cancel(conversationId);
      return;
    }
    if (!draft.trim() && !attachments.length) return;
    await send({ conversationId, text: draft, attachments });
    setAttachments([]);
  };

  const addFiles = async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (!list.length) return;
    const uploaded = await upload(list);
    setAttachments((prev) => [...prev, ...uploaded]);
  };

  return (
    <div
      className={cn("relative mx-auto w-full max-w-2xl px-3", compact ? "" : "pb-safe")}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length) void addFiles(e.dataTransfer.files);
      }}
    >
      {attachments.length ? (
        <div className="mb-2 flex flex-wrap gap-2">
          {attachments.map((a) => (
            <div
              key={a.id}
              className="relative overflow-hidden rounded-lg bg-card shadow-[var(--shadow-border)]"
            >
              {a.kind === "image" ? (
                <img src={a.url} alt={a.name} className="h-16 w-16 object-cover" />
              ) : (
                <div className="flex h-16 max-w-40 items-center px-2 text-xs">{a.name}</div>
              )}
              <button
                type="button"
                className="absolute right-0.5 top-0.5 rounded-full bg-background/80 p-0.5"
                onClick={() => setAttachments((p) => p.filter((x) => x.id !== a.id))}
                aria-label="Remove attachment"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div
        className={cn(
          "rounded-2xl bg-card p-2 shadow-[var(--composer-shadow)] transition-[box-shadow] duration-200",
          dragging && "ring-2 ring-horizon/50",
        )}
      >
        <textarea
          ref={textareaRef}
          value={draft}
          rows={1}
          placeholder="Talk to Sovi"
          className="max-h-44 min-h-11 w-full resize-none bg-transparent px-3 py-2.5 text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submit();
            }
          }}
          onPaste={(e) => {
            const files = Array.from(e.clipboardData.items)
              .filter((i) => i.kind === "file")
              .map((i) => i.getAsFile())
              .filter(Boolean) as File[];
            if (files.length) {
              e.preventDefault();
              void addFiles(files);
            }
          }}
          aria-label="Message Sovi"
        />
        <div className="flex items-center gap-1 px-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Add">
                <Plus className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 p-1">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"
                onClick={() => fileRef.current?.click()}
              >
                <Paperclip className="size-4" /> Attach
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"
                onClick={() => cameraRef.current?.click()}
              >
                <Camera className="size-4" /> Camera
              </button>
            </PopoverContent>
          </Popover>
          <input
            ref={fileRef}
            type="file"
            hidden
            multiple
            onChange={(e) => {
              if (e.target.files) void addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <input
            ref={cameraRef}
            type="file"
            hidden
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              if (e.target.files) void addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <RoutingControl />
          <div className="flex-1" />
          {flags.voice ? (
            <Button variant="ghost" size="icon-sm" aria-label="Voice mode" onClick={() => setVoice(true)}>
              <Mic className="size-4" />
            </Button>
          ) : null}
          <Button
            size="icon-sm"
            className={cn("rounded-full", streaming && "bg-foreground text-background")}
            onClick={() => void submit()}
            aria-label={streaming ? "Stop" : "Send"}
            disabled={!streaming && !draft.trim() && !attachments.length}
          >
            {streaming ? <Square className="size-3.5 fill-current" /> : <ArrowUp className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

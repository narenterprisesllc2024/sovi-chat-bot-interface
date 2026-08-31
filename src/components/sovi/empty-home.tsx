import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { greetingForNow } from "@/lib/utils";
import { useSovi } from "@/lib/sovi/store";
import { isUsable } from "@/lib/sovi/flags";
import { Composer } from "./composer";
import { SoviMark } from "./mark";
import { useTalkToSovi } from "./use-talk";

export function EmptyHome({ conversationId }: { conversationId?: string }) {
  const flags = useSovi((s) => s.flags);
  const send = useTalkToSovi();
  const allConversations = useSovi((s) => s.conversations);
  const allCapabilities = useSovi((s) => s.capabilities);
  const conversations = allConversations.filter((c) => !c.archived).slice(0, 4);
  const capabilities = allCapabilities.filter(isUsable);
  const [hello, setHello] = useState("Ready when you are");
  useEffect(() => {
    setHello(greetingForNow());
  }, []);

  const suggestions = [
    {
      label: "Research an idea",
      prompt:
        "Research whether this technology already exists, see if we could build it, and outline a prototype path.",
      show: capabilities.some((c) => c.category === "research"),
    },
    {
      label: "Build something",
      prompt: "Build a prototype habit tracker I can keep iterating on.",
      show: flags.agents || capabilities.some((c) => c.category === "coding"),
    },
    {
      label: "Create an image",
      prompt: "Create an image of a quiet workshop at sunrise, wood dust in the light, no people.",
      show: flags.images,
    },
    {
      label: "Continue recent work",
      prompt: "Continue working on my Sovi project. What is the most useful next step?",
      show: conversations.length > 0,
    },
  ].filter((s) => s.show);

  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center px-4 py-8">
      <div className="sovi-presence-idle mb-5">
        <SoviMark size={44} />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">{hello}</h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
        Talk to Sovi. It will decide how to handle the request.
      </p>
      {suggestions.length ? (
        <ul className="mt-6 flex w-full max-w-2xl flex-wrap items-center justify-center gap-2">
          {suggestions.map((s) => (
            <li key={s.label}>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted-foreground shadow-[var(--shadow-border)] transition-colors hover:bg-muted/60 hover:text-foreground"
                onClick={() => void send({ conversationId, text: s.prompt })}
              >
                <span>{s.label}</span>
                <ArrowUpRight className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-8 w-full">
        <Composer conversationId={conversationId} autoFocus />
      </div>
    </div>
  );
}

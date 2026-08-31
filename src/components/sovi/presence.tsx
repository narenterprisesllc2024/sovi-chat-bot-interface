import { cn } from "@/lib/utils";
import { SoviMark } from "./mark";
import type { useSovi } from "@/lib/sovi/store";

type Presence = ReturnType<typeof useSovi.getState>["presence"];

const LABELS: Record<Presence, string> = {
  idle: "Ready",
  listening: "Listening",
  thinking: "Thinking",
  acting: "Working",
  speaking: "Speaking",
  waiting: "Waiting",
};

export function PresenceChip({ presence }: { presence: Presence }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-1 text-[11px] text-muted-foreground",
        `sovi-presence-${presence}`,
      )}
    >
      <SoviMark size={14} />
      <span className="tabular-nums">{LABELS[presence]}</span>
    </div>
  );
}

export function HorizonWave({
  active,
  bars = 18,
  className,
}: {
  active?: boolean;
  bars?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex h-16 items-end justify-center gap-1", className)} aria-hidden>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="w-1 origin-bottom rounded-full bg-horizon"
          style={{
            height: "100%",
            transform: `scaleY(${active ? 0.35 + ((i * 3) % 7) / 10 : 0.18})`,
            animation: active ? `sovi-wave ${0.7 + (i % 5) * 0.12}s ease-in-out ${i * 0.04}s infinite` : "none",
            opacity: active ? 0.85 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

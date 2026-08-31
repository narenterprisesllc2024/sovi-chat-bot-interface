import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Activity } from "@/lib/sovi/types";

const STATE_LABEL: Record<Activity["state"], string> = {
  planning: "Planning",
  searching: "Searching",
  reading: "Reading",
  researching: "Researching",
  "calling-tool": "Calling tool",
  "running-agent": "Running agent",
  generating: "Generating",
  coding: "Coding",
  testing: "Testing",
  waiting: "Waiting",
  completed: "Done",
  failed: "Failed",
  cancelled: "Cancelled",
};

export function ActivityList({ activities }: { activities: Activity[] }) {
  const [open, setOpen] = useState(false);
  if (!activities.length) return null;
  const live = activities.some((a) => a.state !== "completed" && a.state !== "failed" && a.state !== "cancelled");
  const headline = live
    ? activities.find((a) => a.state !== "completed")?.title ?? "Working"
    : `${activities.length} step${activities.length === 1 ? "" : "s"}`;

  return (
    <div className="mb-3 overflow-hidden rounded-xl bg-muted/40 shadow-[var(--shadow-border)]">
      <button
        type="button"
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-muted-foreground"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={cn(
            "size-1.5 rounded-full",
            live ? "bg-horizon animate-pulse" : "bg-success",
          )}
        />
        <span className="flex-1 font-medium text-foreground/80">{headline}</span>
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <ul className="space-y-2 border-t border-border px-3 py-2">
          {activities.map((a) => (
            <li key={a.id} className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-foreground">{a.title}</span>
                <Badge variant={a.state === "failed" ? "destructive" : "default"}>
                  {STATE_LABEL[a.state]}
                </Badge>
              </div>
              {a.detail ? <p className="text-[11px] text-muted-foreground">{a.detail}</p> : null}
              {typeof a.progress === "number" && a.state !== "completed" ? (
                <Progress value={a.progress} />
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

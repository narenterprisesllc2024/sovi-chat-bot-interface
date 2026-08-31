import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SoviMarkdown } from "./markdown";
import { useSovi } from "@/lib/sovi/store";
import { eventLabel } from "@/lib/sovi/events";
import { formatRelativeTime } from "@/lib/utils";

export function RightPanel() {
  const panel = useSovi((s) => s.rightPanel);
  const setPanel = useSovi((s) => s.setRightPanel);
  const artifactId = useSovi((s) => s.activeArtifactId);
  const artifacts = useSovi((s) => s.artifacts);
  const recentEvents = useSovi((s) => s.recentEvents);
  const allJobs = useSovi((s) => s.jobs);
  const artifact = artifacts.find((a) => a.id === artifactId) ?? artifacts[0];
  const events = recentEvents.slice(0, 24);
  const jobs = allJobs.slice(0, 8);
  if (panel === "closed") return null;

  return (
    <aside className="flex h-full w-[min(24rem,100%)] flex-col border-l border-border bg-card/40">
      <div className="flex items-center justify-between px-3 py-2">
        <p className="text-sm font-medium">Workspace</p>
        <Button variant="ghost" size="icon-sm" aria-label="Close panel" onClick={() => setPanel("closed")}>
          <X className="size-4" />
        </Button>
      </div>
      <Tabs defaultValue={panel === "activity" ? "activity" : panel === "system" ? "system" : "artifact"} className="flex min-h-0 flex-1 flex-col px-3">
        <TabsList className="w-full">
          <TabsTrigger value="artifact" className="flex-1" onClick={() => setPanel("artifact")}>
            Artifact
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex-1" onClick={() => setPanel("activity")}>
            Activity
          </TabsTrigger>
          <TabsTrigger value="system" className="flex-1" onClick={() => setPanel("system")}>
            System
          </TabsTrigger>
        </TabsList>
        <TabsContent value="artifact" className="sovi-scroll min-h-0 flex-1 overflow-y-auto pb-6">
          {!artifact ? (
            <Empty text="Artifacts from this conversation appear here." />
          ) : artifact.kind === "image" && artifact.url ? (
            <img src={artifact.url} alt={artifact.title} className="w-full rounded-xl" />
          ) : artifact.content ? (
            <div>
              <h2 className="mb-2 text-sm font-semibold">{artifact.title}</h2>
              {artifact.language ? (
                <pre className="overflow-x-auto rounded-xl p-3 text-xs shadow-[var(--shadow-border)]">
                  <code>{artifact.content}</code>
                </pre>
              ) : (
                <SoviMarkdown content={artifact.content} />
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{artifact.title}</p>
          )}
        </TabsContent>
        <TabsContent value="activity" className="sovi-scroll min-h-0 flex-1 overflow-y-auto pb-6">
          {events.length === 0 ? (
            <Empty text="Tool and agent activity will show up as Sovi works." />
          ) : (
            <ol className="space-y-2">
              {events.map((e) => (
                <li key={e.id} className="rounded-lg px-2 py-1.5 text-xs shadow-[var(--shadow-border)]">
                  <div className="flex justify-between gap-2">
                    <span className="font-medium">{eventLabel(e.type)}</span>
                    <span className="tabular-nums text-muted-foreground">{formatRelativeTime(e.ts)}</span>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </TabsContent>
        <TabsContent value="system" className="sovi-scroll min-h-0 flex-1 overflow-y-auto pb-6">
          {jobs.length === 0 ? (
            <Empty text="Generation jobs and service health live in System." />
          ) : (
            <ul className="space-y-2">
              {jobs.map((j) => (
                <li key={j.id} className="text-xs">
                  <p className="font-medium">
                    {j.kind} · {j.status}
                  </p>
                  <p className="text-muted-foreground">{j.prompt.slice(0, 80)}</p>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </aside>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="px-1 py-8 text-center text-sm text-muted-foreground">{text}</p>;
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { SoviMark, SoviWordmark } from "@/components/sovi/mark";
import { HorizonWave, PresenceChip } from "@/components/sovi/presence";
import { ActivityList } from "@/components/sovi/activity";
import { ArtifactCard, JobCard } from "@/components/sovi/artifact-card";
import { Composer } from "@/components/sovi/composer";
import { RequireAuth } from "@/components/sovi/require-auth";

export const Route = createFileRoute("/dev/design-system")({
  component: () => (
    <RequireAuth>
      <DesignSystemLab />
    </RequireAuth>
  ),
});

function DesignSystemLab() {
  return (
    <div className="min-h-dvh bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Internal · not in product nav</p>
          <SoviWordmark />
          <h1 className="text-2xl font-semibold tracking-tight">Design lab</h1>
          <p className="text-sm text-muted-foreground">
            Component states for future Sovi coding/design agents.{" "}
            <Link to="/" className="text-horizon underline">
              Back to cockpit
            </Link>
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Mark & presence</h2>
          <div className="flex flex-wrap items-center gap-4">
            <SoviMark size={40} />
            <PresenceChip presence="idle" />
            <PresenceChip presence="listening" />
            <PresenceChip presence="thinking" />
            <PresenceChip presence="acting" />
          </div>
          <HorizonWave active className="max-w-xs" />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Inputs & status</h2>
          <Input placeholder="Talk to Sovi" />
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="horizon">Horizon</Badge>
            <Badge variant="success">Available</Badge>
            <Badge variant="warning">Degraded</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
          <Progress value={62} />
          <Skeleton className="h-10 w-full" />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Activity</h2>
          <ActivityList
            activities={[
              {
                id: "1",
                kind: "tool",
                title: "Searching the web",
                detail: "personal AI OS",
                state: "completed",
                startedAt: Date.now() - 8000,
                completedAt: Date.now(),
              },
              {
                id: "2",
                kind: "agent",
                title: "Builder agent",
                detail: "Writing prototype.ts",
                state: "coding",
                progress: 55,
                startedAt: Date.now(),
              },
            ]}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Artifacts & jobs</h2>
          <JobCard
            job={{
              id: "j1",
              kind: "image",
              prompt: "Quiet workshop at sunrise",
              status: "processing",
              progress: 48,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            }}
          />
          <ArtifactCard
            artifact={{
              id: "a1",
              kind: "report",
              title: "Landscape note",
              description: "Research artifact",
              createdAt: Date.now(),
            }}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Composer</h2>
          <Composer compact />
        </section>
      </div>
    </div>
  );
}

import { FileText, Image as ImageIcon, Code2, Film, Music, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Artifact, GenerationJob } from "@/lib/sovi/types";
import { Progress } from "@/components/ui/progress";
import { useSovi } from "@/lib/sovi/store";

const ICONS = {
  image: ImageIcon,
  video: Film,
  audio: Music,
  code: Code2,
  document: FileText,
  report: FileText,
  cad: Box,
};

export function ArtifactCard({
  artifact,
  compact,
}: {
  artifact: Artifact;
  compact?: boolean;
}) {
  const setActive = useSovi((s) => s.setActiveArtifact);
  const Icon = ICONS[artifact.kind as keyof typeof ICONS] ?? FileText;
  return (
    <button
      type="button"
      onClick={() => setActive(artifact.id)}
      className={cn(
        "group overflow-hidden rounded-xl bg-card text-left shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover,var(--shadow-elevated))]",
        compact ? "w-full" : "w-full max-w-sm",
      )}
    >
      {artifact.kind === "image" && artifact.url ? (
        <img src={artifact.url} alt={artifact.title} className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="flex items-center gap-3 px-3 py-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-horizon">
            <Icon className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">{artifact.title}</span>
            <span className="block truncate text-xs text-muted-foreground">
              {artifact.description || artifact.kind}
            </span>
          </span>
        </div>
      )}
      {artifact.kind === "image" ? (
        <div className="px-3 py-2">
          <p className="truncate text-sm font-medium">{artifact.title}</p>
        </div>
      ) : null}
    </button>
  );
}

export function JobCard({ job }: { job: GenerationJob }) {
  const done = job.status === "completed";
  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
      {job.resultUrl && job.kind === "image" ? (
        <img src={job.resultUrl} alt={job.prompt} className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="flex aspect-[16/7] items-center justify-center bg-muted/50">
          <p className="text-xs text-muted-foreground">
            {done ? job.kind : `${job.status} · ${job.progress}%`}
          </p>
        </div>
      )}
      <div className="space-y-2 px-3 py-2">
        <p className="line-clamp-2 text-xs text-muted-foreground">{job.prompt}</p>
        {job.status !== "completed" && job.status !== "failed" ? <Progress value={job.progress} /> : null}
        {job.error ? <p className="text-xs text-destructive">{job.error}</p> : null}
      </div>
    </div>
  );
}

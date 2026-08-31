import type { Citation } from "@/lib/sovi/types";

export function CitationList({ citations }: { citations: Citation[] }) {
  if (!citations.length) return null;
  return (
    <div className="mt-4">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Sources</p>
      <ol className="space-y-1.5">
        {citations.map((c, i) => (
          <li key={c.id} className="flex gap-2 text-xs leading-snug">
            <span className="tabular-nums text-muted-foreground">{i + 1}.</span>
            <span>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noreferrer" className="font-medium text-research hover:underline">
                  {c.title}
                </a>
              ) : (
                <span className="font-medium">{c.title}</span>
              )}
              {c.source ? <span className="text-muted-foreground"> · {c.source}</span> : null}
              {c.snippet ? <span className="mt-0.5 block text-muted-foreground">{c.snippet}</span> : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

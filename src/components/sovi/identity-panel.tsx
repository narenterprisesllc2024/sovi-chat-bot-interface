import { useState } from "react";
import { CREST_SRC, MARK_OPTIONS, type MarkId } from "@/lib/sovi/identity";
import { useSovi } from "@/lib/sovi/store";
import { cn } from "@/lib/utils";
import { SoviMark } from "./mark";

export function IdentityPanel() {
  const identity = useSovi((s) => s.identity);
  const setIdentity = useSovi((s) => s.setIdentity);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const current = MARK_OPTIONS.find((o) => o.id === identity.markId) ?? MARK_OPTIONS[0];

  const onUpload = (file: File | undefined) => {
    setUploadError(null);
    if (!file) return;
    if (file.size > 1_500_000) {
      setUploadError("Keep the file under 1.5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result ?? "");
      if (url) setIdentity({ markId: "custom", customUrl: url });
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="identity" className="mt-8">
      <h2 className="text-sm font-semibold">Identity</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Sovi’s mark is a horizon and a rising point. Change it here — including your own file.
      </p>

      <div className="mt-4 flex items-center gap-4 rounded-2xl px-4 py-4 shadow-[var(--shadow-border)]">
        {identity.markId === "crest" || (identity.markId === "custom" && identity.customUrl) ? (
          <img
            src={identity.markId === "custom" && identity.customUrl ? identity.customUrl : CREST_SRC}
            alt=""
            className="size-16 rounded-2xl object-cover"
          />
        ) : (
          <div className="grid size-16 place-items-center rounded-2xl bg-card">
            <SoviMark size={48} markId={identity.markId} />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium">{current.name}</p>
          <p className="text-xs text-muted-foreground">{current.detail}</p>
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {MARK_OPTIONS.map((opt) => {
          const active = identity.markId === opt.id;
          return (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => {
                  if (opt.id === "custom" && !identity.customUrl) return;
                  setIdentity({ markId: opt.id as MarkId });
                }}
                className={cn(
                  "flex w-full flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center shadow-[var(--shadow-border)] transition-colors hover:bg-muted/40",
                  active && "ring-1 ring-horizon/70",
                )}
              >
                {opt.id === "crest" ? (
                  <img src={CREST_SRC} alt="" className="size-14 rounded-xl object-cover" />
                ) : (
                  <SoviMark size={opt.id === "custom" ? 56 : 40} markId={opt.id} customUrl={identity.customUrl} />
                )}
                <span className="text-xs font-medium">{opt.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm shadow-[var(--shadow-border)]">
        <span>Upload a custom mark</span>
        <input
          type="file"
          accept="image/png,image/svg+xml,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => onUpload(e.target.files?.[0])}
        />
        <span className="text-xs text-horizon">Choose file</span>
      </label>
      {uploadError ? <p className="mt-2 text-xs text-destructive">{uploadError}</p> : null}
    </section>
  );
}

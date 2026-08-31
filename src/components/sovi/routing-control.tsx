import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useSovi } from "@/lib/sovi/store";
import { isUsable } from "@/lib/sovi/flags";

export function RoutingControl() {
  const routing = useSovi((s) => s.routing);
  const setRouting = useSovi((s) => s.setRouting);
  const snapshot = useSovi((s) => s.snapshot);
  const allCapabilities = useSovi((s) => s.capabilities);
  const models = snapshot?.models ?? [];
  const capabilities = allCapabilities.filter(isUsable);
  const agents = snapshot?.agents.filter((a) => a.status === "available") ?? [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2 text-xs text-muted-foreground">
          <SlidersHorizontal className="size-3.5" />
          {routing.mode === "auto" ? "Sovi decides" : "Manual"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 space-y-3">
        <div>
          <p className="text-sm font-medium">Routing</p>
          <p className="text-xs text-muted-foreground">Default is automatic. Override only if you want to.</p>
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {(["auto", "manual"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`flex-1 rounded-md py-1.5 text-xs font-medium ${
                routing.mode === mode ? "bg-card shadow-[var(--shadow-border)]" : "text-muted-foreground"
              }`}
              onClick={() => setRouting({ ...routing, mode })}
            >
              {mode === "auto" ? "Sovi decides" : "Manual"}
            </button>
          ))}
        </div>
        {routing.mode === "manual" ? (
          <div className="space-y-2">
            <Field label="Capability">
              <select
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                value={routing.capabilityId ?? ""}
                onChange={(e) => setRouting({ ...routing, capabilityId: e.target.value || undefined })}
              >
                <option value="">Any</option>
                {capabilities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Model">
              <select
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                value={routing.modelId ?? ""}
                onChange={(e) => setRouting({ ...routing, modelId: e.target.value || undefined })}
              >
                <option value="">Sovi decides</option>
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Agent">
              <select
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                value={routing.agentId ?? ""}
                onChange={(e) => setRouting({ ...routing, agentId: e.target.value || undefined })}
              >
                <option value="">None</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

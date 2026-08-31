import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSovi } from "@/lib/sovi/store";
import type { Capability, JsonSchema } from "@/lib/sovi/types";

export function GenericCapability({ capability }: { capability: Capability }) {
  const schema = capability.inputSchema;
  const fields = useMemo(() => Object.entries(schema?.properties ?? { input: { type: "string", title: "Input" } }), [schema]);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const [k, v] of fields) init[k] = v.default != null ? String(v.default) : "";
    return init;
  });
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const run = useSovi((s) => s.runCapability);
  const disabled = capability.status !== "available" || !capability.enabled;

  return (
    <div className="mx-auto max-w-xl space-y-5 px-4 py-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">{capability.name}</h1>
          <Badge variant={capability.status === "available" ? "success" : "warning"}>{capability.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{capability.description}</p>
        <p className="text-xs text-muted-foreground">
          Generic renderer · {capability.category} · {capability.id}
        </p>
      </header>
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setRunning(true);
          setError(null);
          try {
            const parsed: Record<string, unknown> = {};
            for (const [k, spec] of fields) {
              const raw = values[k];
              parsed[k] = spec.type === "number" ? Number(raw) : raw;
            }
            const result = await run(capability.id, parsed);
            setOutput(result);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Failed");
          } finally {
            setRunning(false);
          }
        }}
      >
        {fields.map(([key, spec]) => (
          <SchemaField
            key={key}
            name={key}
            spec={spec}
            value={values[key] ?? ""}
            onChange={(v) => setValues((s) => ({ ...s, [key]: v }))}
          />
        ))}
        <Button type="submit" disabled={disabled || running}>
          {running ? "Running…" : "Execute"}
        </Button>
        {disabled ? (
          <p className="text-sm text-muted-foreground">This capability is not available on the current Sovi surface.</p>
        ) : null}
      </form>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {output != null ? (
        <pre className="overflow-x-auto rounded-xl p-3 text-xs shadow-[var(--shadow-border)]">
          {JSON.stringify(output, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

function SchemaField({
  name,
  spec,
  value,
  onChange,
}: {
  name: string;
  spec: JsonSchema;
  value: string;
  onChange: (v: string) => void;
}) {
  const label = spec.title || name;
  if (spec.enum?.length) {
    return (
      <div className="space-y-1">
        <Label>{label}</Label>
        <select
          className="h-10 w-full rounded-lg border border-input bg-background px-2 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {spec.enum.map((opt) => (
            <option key={String(opt)} value={String(opt)}>
              {String(opt)}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (spec.type === "number") {
    return (
      <div className="space-y-1">
        <Label>{label}</Label>
        <Input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  if ((spec.type === "string" && !spec.enum) && (name.includes("prompt") || name.includes("query") || name === "text" || name === "note" || name === "task" || name === "scenario" || name === "payload")) {
    return (
      <div className="space-y-1">
        <Label>{label}</Label>
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} />
      </div>
    );
  }
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

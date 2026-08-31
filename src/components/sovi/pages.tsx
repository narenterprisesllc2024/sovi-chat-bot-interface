import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useSovi } from "@/lib/sovi/store";
import { isUsable } from "@/lib/sovi/flags";
import { formatRelativeTime } from "@/lib/utils";
import { ArtifactCard } from "./artifact-card";
import { GenericCapability } from "./generic-capability";
import { eventLabel } from "@/lib/sovi/events";
import { useTalkToSovi } from "./use-talk";
import { IdentityPanel } from "./identity-panel";
import type { Capability } from "@/lib/sovi/types";

export function ProjectsPage() {
  const projects = useSovi((s) => s.projects);
  const conversations = useSovi((s) => s.conversations);
  const newConv = useSovi((s) => s.newConversation);
  const navigate = useNavigate();
  return (
    <div className="sovi-scroll h-full overflow-y-auto px-4 py-6">
      <h1 className="text-xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-1 max-w-xl text-sm text-muted-foreground">
        Persistent working environments. Conversations do not have to belong to a project.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {projects.map((p) => {
          const count = conversations.filter((c) => c.projectId === p.id).length;
          return (
            <li key={p.id} className="rounded-2xl p-4 shadow-[var(--shadow-border)]">
              <h2 className="font-medium">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">{count} conversations</p>
              <Button
                className="mt-3"
                size="sm"
                variant="secondary"
                onClick={() => {
                  const id = newConv(p.id);
                  void navigate({ to: "/c/$conversationId", params: { conversationId: id } });
                }}
              >
                New conversation
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AgentsPage() {
  const snapshot = useSovi((s) => s.snapshot);
  const agents = snapshot?.agents ?? [];
  const flags = useSovi((s) => s.flags);
  const run = useSovi((s) => s.runAgent);
  const send = useTalkToSovi();
  const [busy, setBusy] = useState<string | null>(null);
  if (!flags.agents) {
    return <Missing name="Agents" />;
  }
  return (
    <div className="sovi-scroll h-full overflow-y-auto px-4 py-6">
      <h1 className="text-xl font-semibold tracking-tight">Agents</h1>
      <p className="mt-1 max-w-xl text-sm text-muted-foreground">
        Delegated work. Agents are capabilities acting on your behalf — not characters.
      </p>
      <ul className="mt-6 space-y-3">
        {agents.map((a) => (
          <li key={a.id} className="flex flex-wrap items-start justify-between gap-3 rounded-2xl p-4 shadow-[var(--shadow-border)]">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-medium">{a.name}</h2>
                <Badge variant={a.status === "available" ? "success" : "warning"}>{a.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
            </div>
            <Button
              size="sm"
              disabled={a.status !== "available" || busy === a.id}
              onClick={async () => {
                setBusy(a.id);
                await run(a.id, { task: "status" });
                await send({ text: `Run the ${a.name} agent on my current Sovi work.` });
                setBusy(null);
              }}
            >
              {busy === a.id ? "Running…" : "Run"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArtifactsPage() {
  const artifacts = useSovi((s) => s.artifacts);
  return (
    <div className="sovi-scroll h-full overflow-y-auto px-4 py-6">
      <h1 className="text-xl font-semibold tracking-tight">Artifacts</h1>
      <p className="mt-1 text-sm text-muted-foreground">Things Sovi has made. They also live inside conversations.</p>
      {artifacts.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">Nothing yet. Ask Sovi to write, build, or generate.</p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {artifacts.map((a) => (
            <li key={a.id}>
              <ArtifactCard artifact={a} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MemoryPage() {
  const memories = useSovi((s) => s.memories);
  const flags = useSovi((s) => s.flags);
  if (!flags.memory) return <Missing name="Memory" />;
  return (
    <div className="sovi-scroll h-full overflow-y-auto px-4 py-6">
      <h1 className="text-xl font-semibold tracking-tight">Memory</h1>
      <p className="mt-1 max-w-xl text-sm text-muted-foreground">
        This view is a hook into Sovi’s existing memory. It is not a second source of truth.
      </p>
      <ul className="mt-6 space-y-3">
        {memories.map((m) => (
          <li key={m.id} className="rounded-2xl p-4 shadow-[var(--shadow-border)]">
            <div className="flex items-center gap-2">
              <h2 className="font-medium">{m.title}</h2>
              <Badge>{m.kind}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{m.content}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">{formatRelativeTime(m.createdAt)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MediaPage() {
  const flags = useSovi((s) => s.flags);
  const send = useTalkToSovi();
  const [prompt, setPrompt] = useState("A quiet workshop at sunrise, wood dust in the light");
  if (!flags.images && !flags.video && !flags.audio) return <Missing name="Media" />;
  return (
    <div className="sovi-scroll h-full overflow-y-auto px-4 py-6">
      <h1 className="text-xl font-semibold tracking-tight">Media</h1>
      <p className="mt-1 text-sm text-muted-foreground">Generation is native to conversation. This studio is a shortcut.</p>
      <div className="mt-6 max-w-xl space-y-3">
        <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          {flags.images ? (
            <Button onClick={() => void send({ text: `Create an image of ${prompt}` })}>Generate image</Button>
          ) : null}
          {flags.video ? (
            <Button variant="secondary" onClick={() => void send({ text: `Create a video of ${prompt}` })}>
              Generate video
            </Button>
          ) : null}
          {flags.audio ? (
            <Button variant="secondary" onClick={() => void send({ text: `Create audio of ${prompt}` })}>
              Generate audio
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function AutomationsPage() {
  const snapshot = useSovi((s) => s.snapshot);
  const workflows = snapshot?.workflows ?? [];
  const flags = useSovi((s) => s.flags);
  const run = useSovi((s) => s.runWorkflow);
  const send = useTalkToSovi();
  if (!flags.workflows && !flags.automations) return <Missing name="Automations" />;
  return (
    <div className="sovi-scroll h-full overflow-y-auto px-4 py-6">
      <h1 className="text-xl font-semibold tracking-tight">Automations</h1>
      <ul className="mt-6 space-y-3">
        {workflows.map((w) => (
          <li key={w.id} className="rounded-2xl p-4 shadow-[var(--shadow-border)]">
            <h2 className="font-medium">{w.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{w.description}</p>
            <ol className="mt-2 list-decimal pl-4 text-xs text-muted-foreground">
              {w.steps?.map((s) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ol>
            <Button
              className="mt-3"
              size="sm"
              onClick={async () => {
                await run(w.id, {});
                await send({ text: `Run the workflow “${w.name}”.` });
              }}
            >
              Run
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CapabilitiesPage() {
  const capabilities = useSovi((s) => s.capabilities);
  const [q, setQ] = useState("");
  const filtered = capabilities.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.id.includes(q.toLowerCase()) ||
      String(c.category).includes(q.toLowerCase()),
  );
  return (
    <div className="sovi-scroll h-full overflow-y-auto px-4 py-6">
      <h1 className="text-xl font-semibold tracking-tight">Capabilities</h1>
      <p className="mt-1 max-w-xl text-sm text-muted-foreground">
        Sovi’s current surface. New capabilities appear here as soon as they are discovered — generic UI first.
      </p>
      <Input className="mt-4 max-w-md" placeholder="Search capabilities" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {filtered.map((c) => (
          <li key={c.id}>
            <Link
              to="/capabilities/$capabilityId"
              params={{ capabilityId: c.id }}
              className="block rounded-2xl p-4 shadow-[var(--shadow-border)] hover:bg-muted/40"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-medium">{c.name}</h2>
                <Badge variant={c.status === "available" ? "success" : "warning"}>{c.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {c.ui?.renderer ?? "generic"} · {c.category}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CapabilityDetail({ capabilityId }: { capabilityId: string }) {
  const cap = useSovi((s) => s.capabilities.find((c) => c.id === capabilityId));
  if (!cap) return <Missing name="Capability" />;
  return <GenericCapability capability={cap} />;
}

export function SystemPage() {
  const status = useSovi((s) => s.status);
  const recentEvents = useSovi((s) => s.recentEvents);
  const events = recentEvents.slice(0, 40);
  const capabilities = useSovi((s) => s.capabilities);
  const toggle = useSovi((s) => s.toggleCapability);
  const hide = useSovi((s) => s.hideCapability);
  const forceMock = useSovi((s) => s.forceMock);
  const setForce = useSovi((s) => s.setForceMock);
  const register = useSovi((s) => s.registerCapability);
  const hidden = useSovi((s) => s.hiddenCapabilityIds);

  return (
    <div className="sovi-scroll h-full overflow-y-auto px-4 py-6">
      <h1 className="text-xl font-semibold tracking-tight">System</h1>
      <p className="mt-1 text-sm text-muted-foreground">Engine room. The conversation is the bridge.</p>

      <IdentityPanel />

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Adapter" value={status?.adapter ?? "—"} />
        <Stat label="xAI gateway" value={status?.xaiAvailable ? "live" : "off"} />
        <Stat label="Schema" value={status?.schemaVersion ?? "1.0.0"} />
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold">Services</h2>
        <ul className="mt-2 space-y-1">
          {status?.services.map((s) => (
            <li key={s.id} className="flex items-center justify-between text-sm">
              <span>{s.name}</span>
              <Badge variant={s.status === "available" ? "success" : "warning"}>{s.status}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold">Sandbox — capability discovery</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Toggle availability to see the UI adapt. Integrators will drive this from the real registry.
        </p>
        <div className="mt-3 flex items-center justify-between rounded-xl px-3 py-2 shadow-[var(--shadow-border)]">
          <span className="text-sm">Force mock adapter</span>
          <Switch checked={forceMock} onCheckedChange={(v) => void setForce(Boolean(v))} />
        </div>
        <ul className="mt-3 space-y-2">
          {capabilities.map((c) => (
            <CapabilityRow
              key={c.id}
              cap={c}
              hidden={hidden.includes(c.id)}
              onEnabled={(v) => toggle(c.id, v)}
              onHidden={(v) => hide(c.id, v)}
            />
          ))}
        </ul>
        <Button
          className="mt-4"
          variant="secondary"
          size="sm"
          onClick={() =>
            register({
              id: `custom.${Date.now().toString(36)}`,
              name: "New discovered tool",
              description: "Registered at runtime. Generic UI is available immediately.",
              category: "unknown",
              type: "generic.custom",
              enabled: true,
              available: true,
              status: "available",
              ui: { renderer: "generic", icon: "Sparkles" },
              inputSchema: {
                type: "object",
                required: ["prompt"],
                properties: { prompt: { type: "string", title: "Prompt" } },
              },
            })
          }
        >
          Discover a new capability
        </Button>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold">Recent events</h2>
        <ol className="mt-2 space-y-1">
          {events.map((e) => (
            <li key={e.id} className="flex justify-between gap-3 text-xs text-muted-foreground">
              <span>{eventLabel(e.type)}</span>
              <span className="tabular-nums">{formatRelativeTime(e.ts)}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function CapabilityRow({
  cap,
  hidden,
  onEnabled,
  onHidden,
}: {
  cap: Capability;
  hidden: boolean;
  onEnabled: (v: boolean) => void;
  onHidden: (v: boolean) => void;
}) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm shadow-[var(--shadow-border)]">
      <div className="min-w-0">
        <p className="truncate font-medium">{cap.name}</p>
        <p className="truncate text-[11px] text-muted-foreground">
          {cap.status} {isUsable(cap) ? "· visible" : "· hidden from nav"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          On
          <Switch checked={cap.enabled} onCheckedChange={onEnabled} />
        </label>
        <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          Installed
          <Switch checked={!hidden && cap.available} onCheckedChange={(v) => onHidden(!v)} />
        </label>
      </div>
    </li>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl p-4 shadow-[var(--shadow-border)]">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium tabular-nums">{value}</p>
    </div>
  );
}

function Missing({ name }: { name: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <h1 className="text-lg font-semibold">{name} is not on this surface</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Sovi only shows what it can currently do. When this capability is installed, this view will appear on its own.
      </p>
    </div>
  );
}

import { createId, sleep } from "@/lib/utils";
import type { Activity, Artifact, ChatRequest, Citation, GenerationJob, Intent } from "./types";

export type OrchHandler = (type: string, payload: Record<string, unknown>) => void;

function emit(onEvent: OrchHandler, type: string, payload: Record<string, unknown> = {}) {
  onEvent(type, payload);
}

export async function playResearchPreamble(req: ChatRequest, onEvent: OrchHandler, abort: { current: boolean }) {
  const query = req.text;
  emit(onEvent, "memory.retrieved", {
    title: "Related project memory",
    content: "User is exploring a personal AI operating system and prefers ownership over rented tools.",
  });
  if (abort.current) return;

  const searchId = createId("act");
  emit(onEvent, "tool.started", {
    activity: {
      id: searchId,
      kind: "tool",
      title: "Searching the web",
      detail: query,
      state: "searching",
      startedAt: Date.now(),
    } satisfies Activity,
  });
  await sleep(420);
  if (abort.current) return;
  emit(onEvent, "tool.progress", { activityId: searchId, progress: 55, detail: "Reading candidate sources" });
  await sleep(380);

  const citations: Citation[] = [
    {
      id: createId("cite"),
      title: "Personal AI stacks and self-hosted copilots",
      source: "Research landscape",
      url: "https://docs.openwebui.com",
      snippet: "Self-hosted interfaces wrap many models, tools, and knowledge bases behind one conversation.",
    },
    {
      id: createId("cite"),
      title: "Agent + tool + memory composition",
      source: "LibreChat docs",
      url: "https://www.librechat.ai/docs/features/agents",
      snippet: "Agents bind a model, instructions, tools, and memory rather than exposing a provider picker.",
    },
    {
      id: createId("cite"),
      title: "Workspace-scoped knowledge",
      source: "AnythingLLM",
      snippet: "Projects keep files, conversations, and retrieval in one persistent working environment.",
    },
  ];
  for (const c of citations) {
    emit(onEvent, "citation.added", { citation: c });
  }
  emit(onEvent, "tool.completed", { activityId: searchId, state: "completed" });
}

export async function playCodingPreamble(req: ChatRequest, onEvent: OrchHandler, abort: { current: boolean }) {
  const agentId = createId("act");
  emit(onEvent, "agent.started", {
    activity: {
      id: agentId,
      kind: "agent",
      title: "Builder agent",
      detail: "Planning the prototype",
      state: "planning",
      startedAt: Date.now(),
    } satisfies Activity,
  });
  await sleep(360);
  if (abort.current) return;
  emit(onEvent, "agent.progress", { activityId: agentId, progress: 35, detail: "Sketching files", state: "coding" });
  await sleep(320);
  emit(onEvent, "tool.started", {
    activity: {
      id: createId("act"),
      kind: "tool",
      title: "Write file",
      detail: "prototype.ts",
      state: "calling-tool",
      startedAt: Date.now(),
    } satisfies Activity,
  });
  await sleep(240);
  if (abort.current) return;
  emit(onEvent, "agent.progress", { activityId: agentId, progress: 80, detail: "Drafting implementation", state: "coding" });
}

export async function playWorkflowPreamble(_req: ChatRequest, onEvent: OrchHandler, abort: { current: boolean }) {
  const wf = createId("act");
  emit(onEvent, "workflow.started", {
    activity: {
      id: wf,
      kind: "workflow",
      title: "Research → prototype",
      detail: "Step 1 of 3",
      state: "planning",
      startedAt: Date.now(),
    } satisfies Activity,
  });
  await sleep(400);
  if (abort.current) return;
  emit(onEvent, "workflow.progress", { activityId: wf, progress: 40, detail: "Research complete" });
  await sleep(320);
  emit(onEvent, "workflow.progress", { activityId: wf, progress: 75, detail: "Handing to builder" });
}

export async function playAgentPreamble(req: ChatRequest, onEvent: OrchHandler, abort: { current: boolean }) {
  const act = createId("act");
  emit(onEvent, "agent.started", {
    activity: {
      id: act,
      kind: "agent",
      title: "Orchestrator",
      detail: req.text.slice(0, 80),
      state: "planning",
      startedAt: Date.now(),
    } satisfies Activity,
  });
  await sleep(350);
  if (abort.current) return;
  emit(onEvent, "agent.progress", { activityId: act, progress: 50, detail: "Delegating subtasks", state: "running-agent" });
}

export function mockAnswer(intent: Intent, text: string): string {
  switch (intent) {
    case "research":
      return `## Landscape

I looked across self-hosted AI interfaces, agent frameworks, and workspace tools. Nothing I found is a full **personal AI operating system** in the sense you mean — a single human-facing cockpit over models, agents, tools, memory, media, and bits-to-atoms systems that you own.

### What already exists
- **Chat-first shells** (ChatGPT, Claude, Grok) — excellent conversation, rented infrastructure.
- **Self-hosted cockpits** (Open WebUI, LibreChat, LobeChat) — multi-model and tools, still organized around *providers*.
- **Knowledge workspaces** (AnythingLLM) — files + retrieval in a project.
- **Coding workspaces** (Cursor) — conversation bound to a repository.

### Gap
Those products each solve a slice. Sovi’s job is to sit above the slices: you talk to Sovi; Sovi routes.

### Open questions
1. Which of your existing services are the source of truth for memory, files, and jobs?
2. Which capabilities are real today vs. waiting on an adapter?

### Next step
If you want, I can turn this into a short integration map: frontend capability → likely Sovi service → adapter vs. reuse.`;
    case "coding":
      return `## Approach

A small, complete prototype — one module, no framework theatre. Here is a habit tracker you can drop into a page.

\`\`\`tsx
import { useMemo, useState } from "react";

type Habit = { id: string; name: string; done: string[] };

export function HabitTracker() {
  const today = new Date().toISOString().slice(0, 10);
  const [habits, setHabits] = useState<Habit[]>([
    { id: "walk", name: "Walk outside", done: [] },
    { id: "read", name: "Read 20 minutes", done: [] },
  ]);

  const toggle = (id: string) => {
    setHabits((rows) =>
      rows.map((h) => {
        if (h.id !== id) return h;
        const has = h.done.includes(today);
        return { ...h, done: has ? h.done.filter((d) => d !== today) : [...h.done, today] };
      }),
    );
  };

  const score = useMemo(
    () => habits.filter((h) => h.done.includes(today)).length,
    [habits, today],
  );

  return (
    <section>
      <header>
        <h1>Today</h1>
        <p>{score}/{habits.length} complete</p>
      </header>
      <ul>
        {habits.map((h) => (
          <li key={h.id}>
            <button onClick={() => toggle(h.id)} aria-pressed={h.done.includes(today)}>
              {h.done.includes(today) ? "Done" : "Mark"} — {h.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
\`\`\`

The artifact is attached so you can keep iterating in the workspace.`;
    case "image":
      return `I made an image from your description. If you want a different crop, lighting, or mood, tell me what to change — I can edit it in place.`;
    case "image-edit":
      return `I applied your edit to the image. We can keep going: tighter crop, warmer light, or a different focal point.`;
    case "video":
      return `I queued a short clip from your prompt. Video jobs take a bit longer than stills — you can keep talking while it renders.`;
    case "audio":
      return `I generated an audio bed from your prompt. Play it from the card, or ask me to make a quieter / more rhythmic version.`;
    case "workflow":
      return `I ran the **Research → prototype** workflow.

1. Landscape — prior art and the gap
2. Feasibility — buildable as a frontend cockpit with adapters
3. Prototype — handed to the coding workspace

Say if you want the next iteration to be a real integration against your running Sovi services.`;
    case "memory":
      return `I checked memory (this UI only *hooks* your existing memory — it is not a second source of truth).

You have been building **Sovi** as a personal AI operating system: conversation first, capabilities discovered dynamically, no vendor dashboard. I’ll keep using that as context unless you tell me otherwise.`;
    case "files":
      return `I read the attached material and pulled out the load-bearing pieces. If you want a structured report artifact, ask and I’ll write one into the library.`;
    case "agent":
      return `I delegated this. The orchestrator planned, called tools, and folded the result back into the conversation. You can inspect the trace in the activity panel — or ignore it and just use the answer.`;
    default:
      return `I’m here.

You can ask plainly — research an idea, build a prototype, generate media, or look under the hood. I’ll route it. If you want to steer, open the routing control; the default is still **Sovi decides**.

Prompt you sent: “${text.slice(0, 240)}${text.length > 240 ? "…" : ""}”`;
  }
}

export function maybeArtifact(intent: Intent, text: string, conversationId: string): Artifact | null {
  if (intent === "coding") {
    return {
      id: createId("art"),
      kind: "code",
      title: "Habit tracker prototype",
      language: "tsx",
      description: "Single-file React habit tracker.",
      content: mockAnswer("coding", text).match(/```tsx([\s\S]*?)```/)?.[1]?.trim() ?? "",
      conversationId,
      createdAt: Date.now(),
    };
  }
  if (intent === "research") {
    return {
      id: createId("art"),
      kind: "report",
      title: "Personal AI OS landscape",
      description: "Short research note",
      content: mockAnswer("research", text),
      conversationId,
      createdAt: Date.now(),
    };
  }
  return null;
}

export async function simulateGeneration(
  kind: GenerationJob["kind"],
  prompt: string,
  conversationId: string | undefined,
  onEvent: OrchHandler,
  abort: { current: boolean },
  resultUrl: string,
): Promise<GenerationJob> {
  const job: GenerationJob = {
    id: createId("job"),
    kind,
    prompt,
    status: "queued",
    progress: 0,
    conversationId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  emit(onEvent, "generation.started", { job });
  const ticks = [12, 28, 47, 63, 81, 100];
  for (const p of ticks) {
    await sleep(280);
    if (abort.current) {
      job.status = "cancelled";
      job.updatedAt = Date.now();
      emit(onEvent, "generation.completed", { job });
      return job;
    }
    job.progress = p;
    job.status = p < 100 ? "processing" : "completed";
    job.updatedAt = Date.now();
    if (p === 100) {
      job.resultUrl = resultUrl;
      job.resultUrls = [resultUrl];
    }
    emit(onEvent, p < 100 ? "generation.progress" : "generation.completed", { job: { ...job } });
  }
  return job;
}

export async function streamText(
  text: string,
  onEvent: OrchHandler,
  abort: { current: boolean },
) {
  emit(onEvent, "message.started", {});
  const chunks = text.split(/(\s+)/);
  let acc = "";
  for (const chunk of chunks) {
    if (abort.current) {
      emit(onEvent, "message.completed", { cancelled: true, text: acc });
      return;
    }
    acc += chunk;
    emit(onEvent, "message.delta", { text: chunk });
    await sleep(chunk.length > 8 ? 18 : 12);
  }
  emit(onEvent, "message.completed", { text: acc });
}

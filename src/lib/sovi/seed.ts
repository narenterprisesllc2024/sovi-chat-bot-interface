import { horizonImageDataUri } from "./media-fallback";
import type { Artifact, Conversation, Message } from "./types";

const t = (daysAgo: number, hours = 0) => Date.now() - daysAgo * 86400000 - hours * 3600000;

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "c_research",
    title: "Does a personal AI OS already exist?",
    createdAt: t(2, 3),
    updatedAt: t(0, 2),
    pinned: true,
    projectId: "proj_sovi",
    preview: "Nothing I found is a full personal AI operating system in the sense you mean.",
  },
  {
    id: "c_image",
    title: "Quiet workshop at sunrise",
    createdAt: t(1, 5),
    updatedAt: t(1, 5),
    projectId: "proj_workshop",
    preview: "I made an image from your description.",
  },
];

const researchReport = `## Landscape

I looked across self-hosted AI interfaces, agent frameworks, and workspace tools. Nothing I found is a full **personal AI operating system** in the sense you mean — a single human-facing cockpit over models, agents, tools, memory, media, and bits-to-atoms systems that you own.

### What already exists
- **Chat-first shells** — excellent conversation, rented infrastructure.
- **Self-hosted cockpits** — multi-model and tools, still organized around providers.
- **Knowledge workspaces** — files + retrieval in a project.
- **Coding workspaces** — conversation bound to a repository.

### Gap
Those products each solve a slice. Sovi’s job is to sit above the slices: you talk to Sovi; Sovi routes.

### Next step
Turn this into an integration map: frontend capability → existing Sovi service → adapter vs. reuse.`;

export const SEED_MESSAGES: Record<string, Message[]> = {
  c_research: [
    {
      id: "m_r1",
      conversationId: "c_research",
      role: "user",
      content:
        "Research whether a personal AI operating system already exists. I want one interface I own — not another chatbot and not a provider dashboard.",
      createdAt: t(2, 3),
      status: "complete",
    },
    {
      id: "m_r2",
      conversationId: "c_research",
      role: "assistant",
      content: researchReport,
      createdAt: t(2, 3) + 40000,
      status: "complete",
      routing: { capabilityId: "research.web", modelId: "sovi.auto", providerId: "sovi.router" },
      activities: [
        {
          id: "a1",
          kind: "tool",
          title: "Searching the web",
          detail: "personal AI operating system self-hosted",
          state: "completed",
          startedAt: t(2, 3),
          completedAt: t(2, 3) + 8000,
        },
        {
          id: "a2",
          kind: "agent",
          title: "Landscape agent",
          detail: "Compared chat shells, self-hosted cockpits, workspaces",
          state: "completed",
          startedAt: t(2, 3) + 8000,
          completedAt: t(2, 3) + 22000,
        },
      ],
      citations: [
        {
          id: "cite1",
          title: "Open WebUI — self-hosted agentic platform",
          source: "Open WebUI docs",
          url: "https://docs.openwebui.com",
          snippet: "Tools, MCP, sub-agents, and automations behind a chat shell.",
        },
        {
          id: "cite2",
          title: "LibreChat agents",
          source: "LibreChat",
          url: "https://www.librechat.ai/docs/features/agents",
          snippet: "Model + instructions + tools + memory as an agent unit.",
        },
        {
          id: "cite3",
          title: "AnythingLLM workspaces",
          source: "AnythingLLM",
          snippet: "Documents, conversations, and retrieval scoped to a workspace.",
        },
      ],
      artifacts: [
        {
          id: "art_report",
          kind: "report",
          title: "Personal AI OS landscape",
          description: "Short research note",
          content: researchReport,
          conversationId: "c_research",
          createdAt: t(2, 3) + 40000,
        },
      ],
    },
  ],
  c_image: [
    {
      id: "m_i1",
      conversationId: "c_image",
      role: "user",
      content: "Create an image of a quiet workshop at sunrise — wood dust in the light, tools on the bench, no people.",
      createdAt: t(1, 5),
      status: "complete",
    },
    {
      id: "m_i2",
      conversationId: "c_image",
      role: "assistant",
      content: "I made an image from your description. If you want a cooler light or a tighter crop on the bench, say so.",
      createdAt: t(1, 5) + 12000,
      status: "complete",
      routing: { capabilityId: "media.image.generate" },
      artifacts: [
        {
          id: "art_img",
          kind: "image",
          title: "Quiet workshop at sunrise",
          url: horizonImageDataUri("quiet workshop at sunrise wood dust"),
          conversationId: "c_image",
          createdAt: t(1, 5) + 12000,
        },
      ],
    },
  ],
};

export function collectSeedArtifacts(): Artifact[] {
  const out: Artifact[] = [];
  for (const msgs of Object.values(SEED_MESSAGES)) {
    for (const m of msgs) {
      if (m.artifacts) out.push(...m.artifacts);
    }
  }
  return out;
}

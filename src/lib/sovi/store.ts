import { create } from "zustand";
import { createId, truncate } from "@/lib/utils";
import { setSoviAdapter, type SoviAdapter } from "./adapter";
import { createHybridAdapter } from "./adapters/hybrid";
import { createMockAdapter, mockSnapshot, SEED_MEMORIES, SEED_PROJECTS } from "./adapters/mock";
import { emitSoviEvent, subscribeToSoviEvents } from "./events";
import { flagsFromCapabilities, isUsable } from "./flags";
import { classifyIntent, intentCapabilityId } from "./intent";
import { collectSeedArtifacts, SEED_CONVERSATIONS, SEED_MESSAGES } from "./seed";
import { loadPersisted, savePersisted } from "./storage";
import { DEFAULT_IDENTITY, type Identity } from "./identity";
import type {
  Activity,
  Artifact,
  Attachment,
  Capability,
  Conversation,
  DiscoverySnapshot,
  FeatureFlags,
  GenerationJob,
  MemoryReference,
  Message,
  Project,
  RoutingPreference,
  SoviEvent,
  StreamHandle,
  SystemStatus,
} from "./types";

type Presence = "idle" | "listening" | "thinking" | "acting" | "speaking" | "waiting";

type SoviState = {
  ready: boolean;
  adapterId: "mock" | "hybrid" | "real";
  forceMock: boolean;
  snapshot: DiscoverySnapshot | null;
  capabilities: Capability[];
  flags: FeatureFlags;
  hiddenCapabilityIds: string[];
  conversations: Conversation[];
  messagesByConversation: Record<string, Message[]>;
  artifacts: Artifact[];
  jobs: GenerationJob[];
  memories: MemoryReference[];
  projects: Project[];
  recentEvents: SoviEvent[];
  status: SystemStatus | null;
  routing: RoutingPreference;
  theme: "dark" | "light";
  sidebarOpen: boolean;
  mobileNavOpen: boolean;
  rightPanel: "closed" | "artifact" | "activity" | "system";
  activeArtifactId: string | null;
  voiceMode: boolean;
  powerMode: boolean;
  presence: Presence;
  streamingByConversation: Record<string, boolean>;
  composerDraft: string;
  errorBanner: string | null;
  ownerId: string | null;
  identity: Identity;
  init: () => Promise<void>;
  persist: () => void;
  setOwner: (id: string) => void;
  setIdentity: (patch: Partial<Identity>) => void;
  setTheme: (theme: "dark" | "light") => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setRightPanel: (panel: SoviState["rightPanel"]) => void;
  setVoiceMode: (on: boolean) => void;
  setPowerMode: (on: boolean) => void;
  setRouting: (r: RoutingPreference) => void;
  setComposerDraft: (v: string) => void;
  newConversation: (projectId?: string) => string;
  renameConversation: (id: string, title: string) => void;
  togglePin: (id: string) => void;
  toggleFavorite: (id: string) => void;
  archiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  sendMessage: (opts: {
    conversationId?: string;
    text: string;
    attachments?: Attachment[];
  }) => Promise<string>;
  cancelStream: (conversationId: string) => void;
  editAndResend: (conversationId: string, messageId: string, text: string) => Promise<void>;
  regenerate: (conversationId: string) => Promise<void>;
  applyEvent: (event: SoviEvent) => void;
  toggleCapability: (id: string, enabled: boolean) => void;
  hideCapability: (id: string, hidden: boolean) => void;
  registerCapability: (cap: Capability) => void;
  runCapability: (id: string, input: Record<string, unknown>) => Promise<unknown>;
  runAgent: (id: string, input: Record<string, unknown>) => Promise<unknown>;
  runWorkflow: (id: string, input: Record<string, unknown>) => Promise<unknown>;
  setForceMock: (force: boolean) => Promise<void>;
  speak: (text: string) => Promise<void>;
  uploadFiles: (files: File[]) => Promise<Attachment[]>;
  setActiveArtifact: (id: string | null) => void;
};

const streams = new Map<string, StreamHandle>();
let adapter: SoviAdapter = createHybridAdapter();
setSoviAdapter(adapter);
let didSubscribe = false;
let didInit = false;
const bootSnap = mockSnapshot();

/**
 * Zustand compares selector results with Object.is.
 * Returning `[]`, `.filter()`, or `.slice()` from a selector allocates a new
 * array every snapshot and infinite-loops React. Select the raw field, then
 * derive in the component.
 */

function applyThemeClass(theme: "dark" | "light") {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
}

function mergeMessage(list: Message[], id: string, patch: Partial<Message>): Message[] {
  return list.map((m) => (m.id === id ? { ...m, ...patch } : m));
}

export const useSovi = create<SoviState>((set, get) => ({
  ready: true,
  adapterId: "hybrid",
  forceMock: false,
  snapshot: bootSnap,
  capabilities: bootSnap.capabilities,
  flags: bootSnap.flags,
  hiddenCapabilityIds: [],
  conversations: SEED_CONVERSATIONS,
  messagesByConversation: SEED_MESSAGES,
  artifacts: collectSeedArtifacts(),
  jobs: [],
  memories: SEED_MEMORIES,
  projects: SEED_PROJECTS,
  recentEvents: [],
  status: bootSnap.status,
  routing: { mode: "auto" },
  theme: "dark",
  sidebarOpen: true,
  mobileNavOpen: false,
  rightPanel: "closed",
  activeArtifactId: null,
  voiceMode: false,
  powerMode: false,
  presence: "idle",
  streamingByConversation: {},
  composerDraft: "",
  errorBanner: null,
  ownerId: null,
  identity: DEFAULT_IDENTITY,

  persist() {
    const s = get();
    savePersisted({
      conversations: s.conversations,
      messagesById: s.messagesByConversation,
      artifacts: s.artifacts,
      theme: s.theme,
      routing: s.routing,
      powerMode: s.powerMode,
      adapterForce: s.forceMock,
      hiddenCapabilityIds: s.hiddenCapabilityIds,
      identity: s.identity,
    }, s.ownerId);
  },

  async init() {
    if (didInit) return;
    didInit = true;
    try {
      if (!didSubscribe) {
        subscribeToSoviEvents((e) => get().applyEvent(e));
        didSubscribe = true;
      }
      const persisted = loadPersisted(get().ownerId);
      const theme =
        persisted?.theme === "light" || persisted?.theme === "dark"
          ? persisted.theme
          : typeof window !== "undefined" &&
              window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
      applyThemeClass(theme);

      const forceMock = Boolean(persisted?.adapterForce);
      const hidden = Array.isArray(persisted?.hiddenCapabilityIds)
        ? (persisted.hiddenCapabilityIds as string[])
        : [];

      const patch: Partial<SoviState> = { theme, forceMock, hiddenCapabilityIds: hidden };
      if (Array.isArray(persisted?.conversations)) {
        patch.conversations = persisted.conversations as Conversation[];
      }
      if (persisted?.messagesById && typeof persisted.messagesById === "object") {
        patch.messagesByConversation = persisted.messagesById as Record<string, Message[]>;
      }
      if (Array.isArray(persisted?.artifacts)) {
        patch.artifacts = persisted.artifacts as Artifact[];
      }
      if (persisted?.routing && typeof persisted.routing === "object") {
        patch.routing = persisted.routing as RoutingPreference;
      }
      if (typeof persisted?.powerMode === "boolean") {
        patch.powerMode = persisted.powerMode;
      }
      if (persisted?.identity && typeof persisted.identity === "object") {
        patch.identity = { ...DEFAULT_IDENTITY, ...persisted.identity };
      }
      set(patch);

      adapter = forceMock ? createMockAdapter() : createHybridAdapter();
      setSoviAdapter(adapter);

      const snap = await adapter.discover();
      const capabilities = snap.capabilities.map((c) =>
        hidden.includes(c.id)
          ? { ...c, available: false, status: "unavailable" as const }
          : c,
      );
      const memories = await adapter.listMemories().catch(() => get().memories);
      const projects = await adapter.listProjects().catch(() => get().projects);

      set({
        ready: true,
        adapterId: adapter.id,
        snapshot: snap,
        capabilities,
        flags: flagsFromCapabilities(capabilities),
        memories,
        projects,
        status: snap.status,
      });
    } catch (err) {
      set({
        ready: true,
        errorBanner: err instanceof Error ? err.message : "Discovery failed — using the local catalog",
      });
    }
  },

  setOwner(ownerId) {
    if (get().ownerId === ownerId) return;
    didInit = false;
    set({ ownerId });
    void get().init();
  },
  setIdentity(patch) {
    set((s) => ({ identity: { ...s.identity, ...patch } }));
    get().persist();
  },

  setTheme(theme) {
    applyThemeClass(theme);
    set({ theme });
    get().persist();
  },
  setSidebarOpen(sidebarOpen) {
    set({ sidebarOpen });
  },
  setMobileNavOpen(mobileNavOpen) {
    set({ mobileNavOpen });
  },
  setRightPanel(rightPanel) {
    set({ rightPanel });
  },
  setVoiceMode(voiceMode) {
    set({ voiceMode, presence: voiceMode ? "waiting" : "idle" });
  },
  setPowerMode(powerMode) {
    set({ powerMode });
    get().persist();
  },
  setRouting(routing) {
    set({ routing });
    get().persist();
  },
  setComposerDraft(composerDraft) {
    set({ composerDraft });
  },
  setActiveArtifact(activeArtifactId) {
    set({
      activeArtifactId,
      rightPanel: activeArtifactId ? "artifact" : get().rightPanel,
    });
  },

  newConversation(projectId) {
    const id = createId("c");
    const conv: Conversation = {
      id,
      title: "New conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      projectId: projectId ?? null,
    };
    set((s) => ({
      conversations: [conv, ...s.conversations],
      messagesByConversation: { ...s.messagesByConversation, [id]: [] },
    }));
    get().persist();
    return id;
  },

  renameConversation(id, title) {
    set((s) => ({
      conversations: s.conversations.map((c) => (c.id === id ? { ...c, title } : c)),
    }));
    get().persist();
  },
  togglePin(id) {
    set((s) => ({
      conversations: s.conversations.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)),
    }));
    get().persist();
  },
  toggleFavorite(id) {
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === id ? { ...c, favorite: !c.favorite } : c,
      ),
    }));
    get().persist();
  },
  archiveConversation(id) {
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === id ? { ...c, archived: !c.archived } : c,
      ),
    }));
    get().persist();
  },
  deleteConversation(id) {
    streams.get(id)?.cancel();
    streams.delete(id);
    set((s) => {
      const nextMsgs = { ...s.messagesByConversation };
      delete nextMsgs[id];
      return {
        conversations: s.conversations.filter((c) => c.id !== id),
        messagesByConversation: nextMsgs,
      };
    });
    get().persist();
  },

  async sendMessage({ conversationId, text, attachments }) {
    const trimmed = text.trim();
    if (!trimmed && !attachments?.length) return conversationId ?? "";

    let cid = conversationId;
    if (!cid) cid = get().newConversation();

    const userMsg: Message = {
      id: createId("m"),
      conversationId: cid,
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
      status: "complete",
      attachments,
    };
    const assistantId = createId("m");
    const assistant: Message = {
      id: assistantId,
      conversationId: cid,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
      status: "pending",
    };

    const intent =
      get().routing.mode === "manual" && get().routing.capabilityId
        ? undefined
        : classifyIntent(trimmed, Boolean(attachments?.some((a) => a.kind === "image")));

    set((s) => {
      const prev = s.messagesByConversation[cid!] ?? [];
      const convs = s.conversations.map((c) =>
        c.id === cid
          ? {
              ...c,
              updatedAt: Date.now(),
              title: c.title === "New conversation" ? truncate(trimmed || "New conversation", 42) : c.title,
              preview: truncate(trimmed, 80),
            }
          : c,
      );
      return {
        conversations: convs.sort((a, b) => b.updatedAt - a.updatedAt),
        messagesByConversation: {
          ...s.messagesByConversation,
          [cid!]: [...prev, userMsg, assistant],
        },
        streamingByConversation: { ...s.streamingByConversation, [cid!]: true },
        presence: "thinking",
        composerDraft: "",
        errorBanner: null,
      };
    });

    const history = (get().messagesByConversation[cid] ?? [])
      .filter((m) => m.id !== assistantId && m.status === "complete")
      .map((m) => ({ role: m.role, content: m.content }));

    const handle = adapter.streamConversation(
      {
        conversationId: cid,
        messageId: assistantId,
        text: trimmed,
        attachments,
        routing: get().routing,
        history,
        intent: intent ?? "chat",
      },
      {
        onEvent(type, payload) {
          emitSoviEvent(type as SoviEvent["type"], payload, {
            conversationId: cid,
            messageId: assistantId,
          });
        },
      },
    );
    streams.set(cid, handle);
    void handle.done.finally(() => {
      streams.delete(cid);
      set((s) => ({
        streamingByConversation: { ...s.streamingByConversation, [cid!]: false },
        presence: s.voiceMode ? "waiting" : "idle",
      }));
      const last = (get().messagesByConversation[cid] ?? []).find((m) => m.id === assistantId);
      if (last && last.status === "pending") {
        set((s) => ({
          messagesByConversation: {
            ...s.messagesByConversation,
            [cid!]: mergeMessage(s.messagesByConversation[cid!] ?? [], assistantId, {
              status: last.content ? "complete" : "error",
              error: last.content ? undefined : "No response",
            }),
          },
        }));
      }
      get().persist();
    });
    void intentCapabilityId;
    return cid;
  },

  cancelStream(conversationId) {
    streams.get(conversationId)?.cancel();
    set((s) => ({
      streamingByConversation: { ...s.streamingByConversation, [conversationId]: false },
      presence: "idle",
      messagesByConversation: {
        ...s.messagesByConversation,
        [conversationId]: (s.messagesByConversation[conversationId] ?? []).map((m) =>
          m.status === "streaming" || m.status === "pending" ? { ...m, status: "cancelled" } : m,
        ),
      },
    }));
  },

  async editAndResend(conversationId, messageId, text) {
    set((s) => {
      const list = s.messagesByConversation[conversationId] ?? [];
      const idx = list.findIndex((m) => m.id === messageId);
      if (idx < 0) return s;
      return {
        messagesByConversation: {
          ...s.messagesByConversation,
          [conversationId]: list.slice(0, idx),
        },
      };
    });
    await get().sendMessage({ conversationId, text });
  },

  async regenerate(conversationId) {
    const list = get().messagesByConversation[conversationId] ?? [];
    const lastUser = [...list].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    const lastUserIdx = list.findIndex((m) => m.id === lastUser.id);
    set((s) => ({
      messagesByConversation: {
        ...s.messagesByConversation,
        [conversationId]: list.slice(0, lastUserIdx),
      },
    }));
    await get().sendMessage({
      conversationId,
      text: lastUser.content,
      attachments: lastUser.attachments,
    });
  },

  applyEvent(event) {
    set((s) => {
      const recentEvents = [event, ...s.recentEvents].slice(0, 80);
      const cid = event.conversationId;
      const mid = event.messageId;
      if (!cid || !mid) {
        if (event.type === "artifact.created" && event.payload.artifact) {
          const artifact = event.payload.artifact as Artifact;
          return {
            recentEvents,
            artifacts: [artifact, ...s.artifacts.filter((a) => a.id !== artifact.id)],
            activeArtifactId: artifact.id,
            rightPanel: s.rightPanel === "closed" ? "artifact" : s.rightPanel,
          };
        }
        if (
          event.type === "generation.started" ||
          event.type === "generation.progress" ||
          event.type === "generation.completed"
        ) {
          const job = event.payload.job as GenerationJob | undefined;
          if (!job) return { recentEvents };
          return {
            recentEvents,
            jobs: [job, ...s.jobs.filter((j) => j.id !== job.id)],
          };
        }
        return { recentEvents };
      }

      const list = s.messagesByConversation[cid] ?? [];
      const patchActivity = (activity: Activity) => {
        const msg = list.find((m) => m.id === mid);
        const activities = [...(msg?.activities ?? [])];
        const i = activities.findIndex((a) => a.id === activity.id);
        if (i >= 0) activities[i] = { ...activities[i], ...activity };
        else activities.push(activity);
        return mergeMessage(list, mid, { activities, status: "streaming" });
      };

      let nextList = list;
      let presence: Presence = s.presence;
      let artifacts = s.artifacts;
      let jobs = s.jobs;
      let activeArtifactId = s.activeArtifactId;
      let rightPanel = s.rightPanel;

      switch (event.type) {
        case "message.started":
          nextList = mergeMessage(list, mid, { status: "streaming" });
          presence = "thinking";
          break;
        case "message.delta": {
          const text = String(event.payload.text ?? "");
          const msg = list.find((m) => m.id === mid);
          nextList = mergeMessage(list, mid, {
            content: (msg?.content ?? "") + text,
            status: "streaming",
          });
          presence = "acting";
          break;
        }
        case "message.completed": {
          const msg = list.find((m) => m.id === mid);
          nextList = mergeMessage(list, mid, {
            status: event.payload.cancelled ? "cancelled" : "complete",
            content: event.payload.text ? String(event.payload.text) : msg?.content,
          });
          presence = s.voiceMode ? "waiting" : "idle";
          break;
        }
        case "error":
          nextList = mergeMessage(list, mid, {
            status: "error",
            error: String(event.payload.error ?? "Something went wrong"),
          });
          presence = "idle";
          break;
        case "tool.started":
        case "agent.started":
        case "workflow.started":
          if (event.payload.activity) nextList = patchActivity(event.payload.activity as Activity);
          presence = "acting";
          break;
        case "tool.progress":
        case "agent.progress":
        case "workflow.progress": {
          const id = String(event.payload.activityId ?? "");
          const msg = list.find((m) => m.id === mid);
          const activities = (msg?.activities ?? []).map((a) =>
            a.id === id
              ? {
                  ...a,
                  progress: Number(event.payload.progress ?? a.progress ?? 0),
                  detail: String(event.payload.detail ?? a.detail ?? ""),
                  state: (event.payload.state as Activity["state"]) ?? a.state,
                }
              : a,
          );
          nextList = mergeMessage(list, mid, { activities, status: "streaming" });
          presence = "acting";
          break;
        }
        case "tool.completed":
        case "agent.completed":
        case "workflow.completed": {
          const id = String(event.payload.activityId ?? "");
          const msg = list.find((m) => m.id === mid);
          const activities = (msg?.activities ?? []).map((a) =>
            a.id === id
              ? { ...a, state: "completed" as const, progress: 100, completedAt: Date.now() }
              : a,
          );
          nextList = mergeMessage(list, mid, { activities });
          break;
        }
        case "citation.added": {
          const citation = event.payload.citation as NonNullable<Message["citations"]>[number];
          const msg = list.find((m) => m.id === mid);
          nextList = mergeMessage(list, mid, {
            citations: [...(msg?.citations ?? []), citation],
          });
          break;
        }
        case "artifact.created": {
          const artifact = event.payload.artifact as Artifact;
          artifacts = [artifact, ...s.artifacts.filter((a) => a.id !== artifact.id)];
          const msg = list.find((m) => m.id === mid);
          nextList = mergeMessage(list, mid, {
            artifacts: [...(msg?.artifacts ?? []), artifact],
          });
          activeArtifactId = artifact.id;
          if (typeof window !== "undefined" && window.innerWidth >= 1024) {
            rightPanel = "artifact";
          }
          break;
        }
        case "generation.started":
        case "generation.progress":
        case "generation.completed": {
          const job = event.payload.job as GenerationJob;
          jobs = [job, ...s.jobs.filter((j) => j.id !== job.id)];
          const msg = list.find((m) => m.id === mid);
          const existing = msg?.jobs ?? [];
          const ji = existing.findIndex((j) => j.id === job.id);
          const nextJobs = ji >= 0 ? existing.map((j) => (j.id === job.id ? job : j)) : [...existing, job];
          nextList = mergeMessage(list, mid, { jobs: nextJobs, status: "streaming" });
          presence = "acting";
          break;
        }
        default:
          break;
      }

      return {
        recentEvents,
        presence,
        artifacts,
        jobs,
        activeArtifactId,
        rightPanel,
        messagesByConversation: { ...s.messagesByConversation, [cid]: nextList },
        errorBanner: event.type === "error" ? String(event.payload.error ?? "Error") : s.errorBanner,
      };
    });
  },

  toggleCapability(id, enabled) {
    set((s) => {
      const capabilities = s.capabilities.map((c) => {
        if (c.id !== id) return c;
        const status: Capability["status"] = enabled
          ? c.available
            ? "available"
            : c.status
          : "disabled";
        return { ...c, enabled, status };
      });
      return { capabilities, flags: flagsFromCapabilities(capabilities) };
    });
    emitSoviEvent("capability.updated", { id, enabled });
  },

  hideCapability(id, hidden) {
    set((s) => {
      const hiddenCapabilityIds = hidden
        ? [...new Set([...s.hiddenCapabilityIds, id])]
        : s.hiddenCapabilityIds.filter((x) => x !== id);
      const capabilities = s.capabilities.map((c) => {
        if (c.id !== id) return c;
        const status: Capability["status"] = hidden
          ? "unavailable"
          : c.enabled
            ? "available"
            : "disabled";
        return {
          ...c,
          available: !hidden && c.enabled,
          status,
        };
      });
      return { hiddenCapabilityIds, capabilities, flags: flagsFromCapabilities(capabilities) };
    });
    get().persist();
    emitSoviEvent(hidden ? "capability.removed" : "capability.registered", { id });
  },

  registerCapability(cap) {
    set((s) => {
      const capabilities = [...s.capabilities.filter((c) => c.id !== cap.id), cap];
      return { capabilities, flags: flagsFromCapabilities(capabilities) };
    });
    emitSoviEvent("capability.registered", { capability: cap });
  },

  async runCapability(id, input) {
    return adapter.runCapability(id, input);
  },
  async runAgent(id, input) {
    return adapter.runAgent(id, input);
  },
  async runWorkflow(id, input) {
    return adapter.runWorkflow(id, input);
  },
  async setForceMock(force) {
    adapter = force ? createMockAdapter() : createHybridAdapter();
    setSoviAdapter(adapter);
    const snap = await adapter.discover();
    set({
      forceMock: force,
      adapterId: adapter.id,
      snapshot: snap,
      capabilities: snap.capabilities,
      flags: snap.flags,
      status: snap.status,
    });
    get().persist();
  },
  async speak(text) {
    const result = await adapter.speak(text);
    if ("error" in result) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(text.slice(0, 800));
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
      return;
    }
    const audio = new Audio(`data:${result.mime};base64,${result.base64}`);
    set({ presence: "speaking" });
    await audio.play().catch(() => undefined);
    audio.onended = () => set({ presence: get().voiceMode ? "waiting" : "idle" });
  },
  async uploadFiles(files) {
    const out: Attachment[] = [];
    for (const f of files) out.push(await adapter.uploadFile(f));
    return out;
  },
}));

export function usableCapabilities(state: SoviState): Capability[] {
  return state.capabilities.filter((c) => isUsable(c) && !state.hiddenCapabilityIds.includes(c.id));
}

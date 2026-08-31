import type { Capability, FeatureFlags } from "./types";

export const DEFAULT_FLAGS: FeatureFlags = {
  voice: true,
  images: true,
  imageEditing: true,
  video: true,
  audio: true,
  agents: true,
  workflows: true,
  automations: true,
  memory: true,
  computerUse: false,
  physicalSystems: false,
};

const FLAG_CAPABILITY: Record<keyof FeatureFlags, string[]> = {
  voice: ["voice.mode", "speech.tts", "speech.stt"],
  images: ["media.image.generate"],
  imageEditing: ["media.image.edit"],
  video: ["media.video.generate"],
  audio: ["media.audio.generate"],
  agents: ["agents.orchestrator", "agents.research", "agents.coding"],
  workflows: ["workflows.runner"],
  automations: ["automations.engine"],
  memory: ["memory.longterm", "knowledge.retrieval"],
  computerUse: ["computer.browser"],
  physicalSystems: ["physical.cad"],
};

export function flagsFromCapabilities(capabilities: Capability[]): FeatureFlags {
  const byId = new Map(capabilities.map((c) => [c.id, c]));
  const live = (ids: string[]) =>
    ids.some((id) => {
      const cap = byId.get(id);
      return Boolean(cap && cap.enabled && cap.available && cap.status === "available");
    });
  return {
    voice: live(FLAG_CAPABILITY.voice),
    images: live(FLAG_CAPABILITY.images),
    imageEditing: live(FLAG_CAPABILITY.imageEditing),
    video: live(FLAG_CAPABILITY.video),
    audio: live(FLAG_CAPABILITY.audio),
    agents: live(FLAG_CAPABILITY.agents),
    workflows: live(FLAG_CAPABILITY.workflows),
    automations: live(FLAG_CAPABILITY.automations),
    memory: live(FLAG_CAPABILITY.memory),
    computerUse: live(FLAG_CAPABILITY.computerUse),
    physicalSystems: live(FLAG_CAPABILITY.physicalSystems),
  };
}

export function isUsable(cap: Capability | undefined): boolean {
  if (!cap) return false;
  return cap.enabled && cap.available && (cap.status === "available" || cap.status === "degraded");
}

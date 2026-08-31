import type { Identity } from "./identity";
import { DEFAULT_IDENTITY } from "./identity";

const BASE = "sovi.ui.v1";

function keyFor(ownerId?: string | null) {
  return ownerId ? `${BASE}.${ownerId}` : BASE;
}

export type PersistedSlice = {
  conversations?: unknown;
  messagesById?: unknown;
  artifacts?: unknown;
  theme?: unknown;
  routing?: unknown;
  powerMode?: unknown;
  adapterForce?: unknown;
  hiddenCapabilityIds?: unknown;
  identity?: Identity;
};

export function loadPersisted(ownerId?: string | null): PersistedSlice | null {
  if (typeof window === "undefined") return null;
  const keys = [ownerId ? keyFor(ownerId) : null, BASE].filter(Boolean) as string[];
  for (const k of keys) {
    try {
      const raw = window.localStorage.getItem(k);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as PersistedSlice;
      if (!parsed.identity) parsed.identity = DEFAULT_IDENTITY;
      return parsed;
    } catch {
      /* ignore */
    }
  }
  return null;
}

export function savePersisted(slice: PersistedSlice, ownerId?: string | null) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(keyFor(ownerId), JSON.stringify(slice));
  } catch {
    /* quota */
  }
}

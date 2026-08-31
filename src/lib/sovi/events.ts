import { createId } from "@/lib/utils";
import type { SoviEvent, SoviEventType } from "./types";

type Handler = (event: SoviEvent) => void;

const listeners = new Set<Handler>();

export function subscribeToSoviEvents(handler: Handler): () => void {
  listeners.add(handler);
  return () => {
    listeners.delete(handler);
  };
}

export function emitSoviEvent(
  type: SoviEventType,
  payload: Record<string, unknown> = {},
  extra: Partial<Pick<SoviEvent, "conversationId" | "messageId" | "requestId">> = {},
): SoviEvent {
  const event: SoviEvent = {
    id: createId("evt"),
    type,
    ts: Date.now(),
    payload,
    ...extra,
  };
  for (const handler of listeners) {
    try {
      handler(event);
    } catch (err) {
      console.error("[sovi] event handler failed", err);
    }
  }
  return event;
}

export function eventLabel(type: SoviEventType): string {
  const map: Record<SoviEventType, string> = {
    "message.started": "Message started",
    "message.delta": "Streaming",
    "message.completed": "Message complete",
    "tool.started": "Tool started",
    "tool.progress": "Tool progress",
    "tool.completed": "Tool complete",
    "agent.started": "Agent started",
    "agent.progress": "Agent progress",
    "agent.completed": "Agent complete",
    "workflow.started": "Workflow started",
    "workflow.progress": "Workflow progress",
    "workflow.completed": "Workflow complete",
    "artifact.created": "Artifact created",
    "generation.started": "Generation started",
    "generation.progress": "Generation progress",
    "generation.completed": "Generation complete",
    "capability.registered": "Capability registered",
    "capability.updated": "Capability updated",
    "capability.removed": "Capability removed",
    "system.status": "System status",
    "citation.added": "Citation added",
    "memory.retrieved": "Memory retrieved",
    error: "Error",
  };
  return map[type] ?? type;
}

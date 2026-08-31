/** Normalized Sovi frontend contract. Integrators map real backend types here. */

export type CapabilityState =
  | "available"
  | "unavailable"
  | "disabled"
  | "degraded"
  | "unknown"
  | "discovering"
  | "error";

export type CapabilityCategory =
  | "chat"
  | "research"
  | "web"
  | "coding"
  | "software"
  | "image"
  | "image-edit"
  | "video"
  | "audio"
  | "speech"
  | "stt"
  | "files"
  | "documents"
  | "agents"
  | "workflows"
  | "automations"
  | "memory"
  | "knowledge"
  | "apis"
  | "mcp"
  | "computer-use"
  | "business"
  | "personal"
  | "simulation"
  | "physical"
  | "unknown";

export type UiLevel = "generic" | "enhanced" | "native";

export type JsonSchema = {
  type?: string;
  title?: string;
  description?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  enum?: Array<string | number>;
  items?: JsonSchema;
  default?: unknown;
  minimum?: number;
  maximum?: number;
  format?: string;
};

export type CapabilityUiMeta = {
  icon?: string;
  accent?: string;
  renderer?: UiLevel;
  nav?: boolean;
  workspace?: string;
  order?: number;
  inputComponent?: string;
  outputComponent?: string;
};

export type Capability = {
  id: string;
  name: string;
  description: string;
  category: CapabilityCategory | (string & {});
  type: string;
  version?: string;
  enabled: boolean;
  available: boolean;
  status: CapabilityState;
  health?: "healthy" | "degraded" | "down" | "unknown";
  provider?: string;
  model?: string;
  agent?: string;
  supportedInputs?: string[];
  supportedOutputs?: string[];
  streaming?: boolean;
  voice?: boolean;
  files?: boolean;
  media?: boolean;
  permissions?: string[];
  configurationSchema?: JsonSchema;
  inputSchema?: JsonSchema;
  outputSchema?: JsonSchema;
  ui?: CapabilityUiMeta;
  dependencies?: string[];
  metadata?: Record<string, unknown>;
};

export type AIProvider = {
  id: string;
  name: string;
  kind: "cloud" | "local" | "hybrid" | "internal";
  status: CapabilityState;
  description?: string;
  models?: string[];
};

export type Model = {
  id: string;
  name: string;
  providerId: string;
  modality: Array<"text" | "image" | "audio" | "video" | "code">;
  contextWindow?: number;
  streaming?: boolean;
  status: CapabilityState;
};

export type Agent = {
  id: string;
  name: string;
  description: string;
  status: CapabilityState;
  tools?: string[];
  model?: string;
  lastRunAt?: number;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  status: CapabilityState;
  inputSchema?: JsonSchema;
  mcp?: boolean;
};

export type Workflow = {
  id: string;
  name: string;
  description: string;
  status: CapabilityState;
  steps?: Array<{ id: string; name: string; capabilityId?: string }>;
};

export type Integration = {
  id: string;
  name: string;
  kind: string;
  status: CapabilityState;
};

export type Attachment = {
  id: string;
  name: string;
  mime: string;
  size: number;
  url: string;
  kind: "image" | "file" | "audio" | "video";
};

export type Citation = {
  id: string;
  title: string;
  url?: string;
  source?: string;
  snippet?: string;
};

export type ActivityState =
  | "planning"
  | "searching"
  | "reading"
  | "researching"
  | "calling-tool"
  | "running-agent"
  | "generating"
  | "coding"
  | "testing"
  | "waiting"
  | "completed"
  | "failed"
  | "cancelled";

export type Activity = {
  id: string;
  kind: "tool" | "agent" | "workflow" | "generation" | "memory" | "system";
  title: string;
  detail?: string;
  state: ActivityState;
  progress?: number;
  startedAt: number;
  completedAt?: number;
  capabilityId?: string;
};

export type ArtifactKind =
  | "document"
  | "pdf"
  | "spreadsheet"
  | "presentation"
  | "code"
  | "repository"
  | "application"
  | "website"
  | "image"
  | "video"
  | "audio"
  | "dataset"
  | "report"
  | "cad"
  | "design"
  | "research"
  | "file";

export type Artifact = {
  id: string;
  kind: ArtifactKind;
  title: string;
  description?: string;
  mime?: string;
  language?: string;
  content?: string;
  url?: string;
  thumbnailUrl?: string;
  conversationId?: string;
  projectId?: string;
  createdAt: number;
  metadata?: Record<string, unknown>;
};

export type GenerationJob = {
  id: string;
  kind: "image" | "video" | "audio" | "speech" | "other";
  prompt: string;
  status: "queued" | "starting" | "processing" | "completed" | "failed" | "cancelled";
  progress: number;
  resultUrl?: string;
  resultUrls?: string[];
  error?: string;
  conversationId?: string;
  createdAt: number;
  updatedAt: number;
};

export type MessageRole = "user" | "assistant" | "system";

export type MessageStatus = "pending" | "streaming" | "complete" | "error" | "cancelled";

export type RoutingPreference = {
  mode: "auto" | "manual";
  capabilityId?: string;
  modelId?: string;
  providerId?: string;
  agentId?: string;
  toolId?: string;
  executionMode?: "fast" | "balanced" | "deep";
};

export type Message = {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: number;
  status: MessageStatus;
  attachments?: Attachment[];
  activities?: Activity[];
  artifacts?: Artifact[];
  citations?: Citation[];
  jobs?: GenerationJob[];
  routing?: {
    capabilityId?: string;
    modelId?: string;
    providerId?: string;
    requestId?: string;
  };
  error?: string;
  parentId?: string;
};

export type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
  archived?: boolean;
  favorite?: boolean;
  projectId?: string | null;
  preview?: string;
  routing?: RoutingPreference;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  color?: string;
  conversationIds?: string[];
  artifactIds?: string[];
};

export type MemoryReference = {
  id: string;
  kind: "conversation" | "long-term" | "project" | "preference" | "knowledge";
  title: string;
  content: string;
  createdAt: number;
  projectId?: string;
  tags?: string[];
};

export type SystemEvent = {
  id: string;
  type: string;
  message: string;
  level: "info" | "warn" | "error";
  createdAt: number;
  meta?: Record<string, unknown>;
};

export type SystemStatus = {
  healthy: boolean;
  adapter: "mock" | "hybrid" | "real";
  xaiAvailable: boolean;
  version: string;
  schemaVersion: string;
  eventProtocolVersion: string;
  services: Array<{
    id: string;
    name: string;
    status: CapabilityState;
    latencyMs?: number;
    detail?: string;
  }>;
  usage?: {
    tokensIn?: number;
    tokensOut?: number;
    estimatedCostUsd?: number;
  };
};

export type SoviEventType =
  | "message.started"
  | "message.delta"
  | "message.completed"
  | "tool.started"
  | "tool.progress"
  | "tool.completed"
  | "agent.started"
  | "agent.progress"
  | "agent.completed"
  | "workflow.started"
  | "workflow.progress"
  | "workflow.completed"
  | "artifact.created"
  | "generation.started"
  | "generation.progress"
  | "generation.completed"
  | "capability.registered"
  | "capability.updated"
  | "capability.removed"
  | "system.status"
  | "citation.added"
  | "memory.retrieved"
  | "error";

export type SoviEvent = {
  id: string;
  type: SoviEventType;
  ts: number;
  conversationId?: string;
  messageId?: string;
  requestId?: string;
  payload: Record<string, unknown>;
};

export type FeatureFlags = {
  voice: boolean;
  images: boolean;
  imageEditing: boolean;
  video: boolean;
  audio: boolean;
  agents: boolean;
  workflows: boolean;
  automations: boolean;
  memory: boolean;
  computerUse: boolean;
  physicalSystems: boolean;
};

export type ChatRequest = {
  conversationId: string;
  messageId: string;
  text: string;
  attachments?: Attachment[];
  routing?: RoutingPreference;
  history: Array<{ role: MessageRole; content: string }>;
  intent?: Intent;
};

export type Intent =
  | "chat"
  | "research"
  | "image"
  | "image-edit"
  | "video"
  | "audio"
  | "coding"
  | "workflow"
  | "memory"
  | "files"
  | "agent";

export type StreamHandle = {
  cancel: () => void;
  done: Promise<void>;
};

export type DiscoverySnapshot = {
  capabilities: Capability[];
  providers: AIProvider[];
  models: Model[];
  agents: Agent[];
  tools: Tool[];
  workflows: Workflow[];
  integrations: Integration[];
  flags: FeatureFlags;
  status: SystemStatus;
};

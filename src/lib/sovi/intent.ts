import type { Intent } from "./types";

const rules: Array<{ intent: Intent; re: RegExp }> = [
  {
    intent: "image-edit",
    re: /\b(edit|modify|change|restyle|inpaint|outpaint)\b.{0,40}\b(image|photo|picture|illustration)\b|\b(image|photo|picture).{0,40}\b(edit|modify|change)\b/i,
  },
  {
    intent: "image",
    re: /\b(create|generate|make|draw|paint|imagine|render)\b.{0,50}\b(image|picture|photo|illustration|poster|logo|icon|artwork|scene)\b|\bimage of\b|\bpicture of\b/i,
  },
  {
    intent: "video",
    re: /\b(create|generate|make|render)\b.{0,40}\b(video|clip|animation|cinematic)\b|\bvideo of\b/i,
  },
  {
    intent: "audio",
    re: /\b(create|generate|compose|make)\b.{0,40}\b(audio|music|soundtrack|voiceover|soundscape)\b|\bspeak this\b|\bread this aloud\b/i,
  },
  {
    intent: "research",
    re: /\b(research|investigate|look up|search the web|find sources|what already exists|literature|compare approaches|is this possible)\b/i,
  },
  {
    intent: "coding",
    re: /\b(build|code|implement|prototype|app|application|component|function|refactor|debug|write (a |the )?(script|program|website))\b/i,
  },
  {
    intent: "workflow",
    re: /\b(run (this |the )?workflow|automat|schedule|pipeline)\b/i,
  },
  {
    intent: "memory",
    re: /\b(remember|forget|what do you know about|from memory|recall)\b/i,
  },
  {
    intent: "files",
    re: /\b(analy[sz]e (this |the )?(file|document|pdf|spreadsheet)|summarize (this |the )?(doc|file|pdf))\b/i,
  },
  {
    intent: "agent",
    re: /\b(agent|delegate|work on this autonomously|take this and run)\b/i,
  },
];

export function classifyIntent(text: string, hasImageAttachment = false): Intent {
  const trimmed = text.trim();
  if (hasImageAttachment && /\b(edit|change|make it|turn this)\b/i.test(trimmed)) {
    return "image-edit";
  }
  for (const rule of rules) {
    if (rule.re.test(trimmed)) return rule.intent;
  }
  return "chat";
}

export function intentCapabilityId(intent: Intent): string {
  switch (intent) {
    case "image":
      return "media.image.generate";
    case "image-edit":
      return "media.image.edit";
    case "video":
      return "media.video.generate";
    case "audio":
      return "media.audio.generate";
    case "research":
      return "research.web";
    case "coding":
      return "coding.workspace";
    case "workflow":
      return "workflows.runner";
    case "memory":
      return "memory.longterm";
    case "files":
      return "files.documents";
    case "agent":
      return "agents.orchestrator";
    default:
      return "chat.reasoning";
  }
}

export function intentLabel(intent: Intent): string {
  const labels: Record<Intent, string> = {
    chat: "Conversation",
    research: "Research",
    image: "Image",
    "image-edit": "Image edit",
    video: "Video",
    audio: "Audio",
    coding: "Coding",
    workflow: "Workflow",
    memory: "Memory",
    files: "Documents",
    agent: "Agent",
  };
  return labels[intent];
}

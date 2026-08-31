import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as getBearerToken, m as truncate, n as CREST_SRC, o as cn, p as sleep, r as DEFAULT_IDENTITY, s as createId } from "./identity-CICsh5Ac.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mark-BCKiqoxL.js
var import_jsx_runtime = require_jsx_runtime();
var PROVIDERS = [
	{
		id: "sovi.router",
		name: "Sovi Router",
		kind: "internal",
		status: "available",
		description: "Default orchestration. Sovi decides model, agent, and tools."
	},
	{
		id: "xai.grok",
		name: "xAI",
		kind: "cloud",
		status: "available",
		description: "Grok family via the Sovi gateway.",
		models: ["grok-4.5"]
	},
	{
		id: "local.llama",
		name: "Local models",
		kind: "local",
		status: "degraded",
		description: "On-device / LAN models. Mocked until the integrator maps them."
	}
];
var MODELS = [
	{
		id: "grok-4.5",
		name: "Grok 4.5",
		providerId: "xai.grok",
		modality: [
			"text",
			"image",
			"code"
		],
		streaming: true,
		status: "available"
	},
	{
		id: "sovi.auto",
		name: "Sovi decides",
		providerId: "sovi.router",
		modality: [
			"text",
			"image",
			"audio",
			"video",
			"code"
		],
		streaming: true,
		status: "available"
	},
	{
		id: "local.fast",
		name: "Local fast",
		providerId: "local.llama",
		modality: ["text"],
		streaming: true,
		status: "degraded"
	}
];
function cap(partial) {
	return {
		enabled: true,
		available: true,
		status: "available",
		health: "healthy",
		...partial
	};
}
var CAPABILITIES = [
	cap({
		id: "chat.reasoning",
		name: "Conversation",
		description: "General reasoning, writing, and Q&A through Sovi.",
		category: "chat",
		type: "native.chat",
		streaming: true,
		voice: true,
		files: true,
		provider: "sovi.router",
		model: "sovi.auto",
		supportedInputs: [
			"text",
			"image",
			"file",
			"audio"
		],
		supportedOutputs: [
			"text",
			"markdown",
			"artifact"
		],
		ui: {
			icon: "MessageSquare",
			renderer: "native",
			nav: true,
			order: 0
		}
	}),
	cap({
		id: "voice.mode",
		name: "Voice mode",
		description: "Hands-free listening and spoken replies.",
		category: "speech",
		type: "native.voice",
		voice: true,
		streaming: true,
		ui: {
			icon: "AudioLines",
			renderer: "native",
			nav: false,
			accent: "voice"
		}
	}),
	cap({
		id: "speech.tts",
		name: "Speech generation",
		description: "Turn text into spoken audio.",
		category: "speech",
		type: "media.tts",
		ui: {
			icon: "Volume2",
			renderer: "enhanced"
		},
		inputSchema: {
			type: "object",
			required: ["text"],
			properties: {
				text: {
					type: "string",
					title: "Text"
				},
				voice: {
					type: "string",
					title: "Voice",
					enum: ["eve", "default"]
				}
			}
		}
	}),
	cap({
		id: "speech.stt",
		name: "Speech recognition",
		description: "Transcribe microphone input into text.",
		category: "stt",
		type: "media.stt",
		ui: {
			icon: "Mic",
			renderer: "enhanced"
		}
	}),
	cap({
		id: "research.web",
		name: "Research",
		description: "Investigate a question with sources and a structured answer.",
		category: "research",
		type: "enhanced.research",
		streaming: true,
		ui: {
			icon: "Telescope",
			renderer: "enhanced",
			nav: false,
			accent: "research"
		},
		inputSchema: {
			type: "object",
			required: ["query"],
			properties: {
				query: {
					type: "string",
					title: "Research question"
				},
				depth: {
					type: "string",
					enum: [
						"quick",
						"standard",
						"deep"
					],
					default: "standard"
				}
			}
		}
	}),
	cap({
		id: "web.intelligence",
		name: "Web intelligence",
		description: "Browse and extract from the public web.",
		category: "web",
		type: "tool.web",
		ui: {
			icon: "Globe",
			renderer: "generic"
		}
	}),
	cap({
		id: "coding.workspace",
		name: "Coding workspace",
		description: "Design, write, and iterate on software with artifacts.",
		category: "coding",
		type: "native.coding",
		streaming: true,
		files: true,
		ui: {
			icon: "Code2",
			renderer: "native",
			accent: "code"
		}
	}),
	cap({
		id: "software.build",
		name: "Software development",
		description: "Multi-file application scaffolding and iteration.",
		category: "software",
		type: "enhanced.software",
		ui: {
			icon: "AppWindow",
			renderer: "enhanced"
		}
	}),
	cap({
		id: "media.image.generate",
		name: "Image generation",
		description: "Create images from a description.",
		category: "image",
		type: "native.image",
		media: true,
		ui: {
			icon: "Image",
			renderer: "native",
			accent: "create",
			nav: false
		},
		inputSchema: {
			type: "object",
			required: ["prompt"],
			properties: {
				prompt: {
					type: "string",
					title: "Prompt"
				},
				aspect: {
					type: "string",
					enum: [
						"1:1",
						"16:9",
						"9:16",
						"4:3"
					],
					default: "1:1"
				}
			}
		}
	}),
	cap({
		id: "media.image.edit",
		name: "Image editing",
		description: "Edit an existing image with natural language.",
		category: "image-edit",
		type: "native.image-edit",
		media: true,
		files: true,
		ui: {
			icon: "Pencil",
			renderer: "native",
			accent: "create"
		},
		inputSchema: {
			type: "object",
			required: ["prompt", "image"],
			properties: {
				prompt: {
					type: "string",
					title: "Edit instructions"
				},
				image: {
					type: "string",
					title: "Image",
					format: "uri"
				}
			}
		}
	}),
	cap({
		id: "media.video.generate",
		name: "Video generation",
		description: "Generate short video clips from a prompt.",
		category: "video",
		type: "enhanced.video",
		media: true,
		ui: {
			icon: "Film",
			renderer: "enhanced",
			accent: "create"
		},
		inputSchema: {
			type: "object",
			required: ["prompt"],
			properties: {
				prompt: {
					type: "string",
					title: "Prompt"
				},
				duration: {
					type: "string",
					enum: ["6", "10"],
					default: "6"
				}
			}
		}
	}),
	cap({
		id: "media.audio.generate",
		name: "Audio generation",
		description: "Generate music, ambience, or voice beds.",
		category: "audio",
		type: "enhanced.audio",
		media: true,
		ui: {
			icon: "Music",
			renderer: "enhanced"
		},
		inputSchema: {
			type: "object",
			required: ["prompt"],
			properties: { prompt: {
				type: "string",
				title: "Prompt"
			} }
		}
	}),
	cap({
		id: "files.documents",
		name: "Documents",
		description: "Read, summarize, and transform files and documents.",
		category: "documents",
		type: "enhanced.files",
		files: true,
		ui: {
			icon: "FileText",
			renderer: "enhanced"
		}
	}),
	cap({
		id: "files.library",
		name: "Files",
		description: "Workspace file library attached to conversations and projects.",
		category: "files",
		type: "enhanced.files",
		files: true,
		ui: {
			icon: "Folder",
			renderer: "enhanced",
			nav: false
		}
	}),
	cap({
		id: "agents.orchestrator",
		name: "Agent orchestrator",
		description: "Plan and run multi-step agents on the user's behalf.",
		category: "agents",
		type: "native.agents",
		ui: {
			icon: "Bot",
			renderer: "native",
			nav: true,
			order: 20
		}
	}),
	cap({
		id: "agents.research",
		name: "Research agent",
		description: "Autonomous literature and landscape research.",
		category: "agents",
		type: "enhanced.agent",
		ui: {
			icon: "Radar",
			renderer: "enhanced"
		}
	}),
	cap({
		id: "agents.coding",
		name: "Coding agent",
		description: "Delegated implementation, tests, and iteration.",
		category: "agents",
		type: "enhanced.agent",
		ui: {
			icon: "Terminal",
			renderer: "enhanced"
		}
	}),
	cap({
		id: "workflows.runner",
		name: "Workflows",
		description: "Run saved multi-step workflows.",
		category: "workflows",
		type: "enhanced.workflow",
		ui: {
			icon: "Workflow",
			renderer: "enhanced",
			nav: true,
			order: 30
		}
	}),
	cap({
		id: "automations.engine",
		name: "Automations",
		description: "Scheduled and event-driven automations.",
		category: "automations",
		type: "enhanced.automation",
		ui: {
			icon: "Zap",
			renderer: "enhanced"
		}
	}),
	cap({
		id: "memory.longterm",
		name: "Memory",
		description: "Hooks into Sovi's existing memory — this UI does not own it.",
		category: "memory",
		type: "enhanced.memory",
		ui: {
			icon: "Brain",
			renderer: "enhanced",
			nav: true,
			order: 40
		}
	}),
	cap({
		id: "knowledge.retrieval",
		name: "Knowledge retrieval",
		description: "Retrieve project and personal knowledge into context.",
		category: "knowledge",
		type: "enhanced.knowledge",
		ui: {
			icon: "Library",
			renderer: "enhanced"
		}
	}),
	cap({
		id: "apis.gateway",
		name: "External APIs",
		description: "Call registered HTTP APIs through Sovi.",
		category: "apis",
		type: "generic.api",
		ui: {
			icon: "Plug",
			renderer: "generic"
		},
		inputSchema: {
			type: "object",
			required: ["action"],
			properties: {
				action: {
					type: "string",
					title: "Action"
				},
				payload: {
					type: "string",
					title: "JSON payload"
				}
			}
		}
	}),
	cap({
		id: "mcp.tools",
		name: "MCP tools",
		description: "Model Context Protocol style tools and services.",
		category: "mcp",
		type: "generic.mcp",
		ui: {
			icon: "Blocks",
			renderer: "generic"
		}
	}),
	cap({
		id: "computer.browser",
		name: "Computer / browser use",
		description: "Operate a browser or computer on the user's behalf.",
		category: "computer-use",
		type: "enhanced.computer",
		enabled: true,
		available: false,
		status: "unavailable",
		health: "down",
		ui: {
			icon: "Monitor",
			renderer: "enhanced",
			nav: false
		}
	}),
	cap({
		id: "business.ops",
		name: "Business systems",
		description: "Personal business operations surface.",
		category: "business",
		type: "generic.business",
		status: "degraded",
		health: "degraded",
		ui: {
			icon: "Briefcase",
			renderer: "generic"
		},
		inputSchema: {
			type: "object",
			required: ["task"],
			properties: { task: {
				type: "string",
				title: "Task"
			} }
		}
	}),
	cap({
		id: "personal.life",
		name: "Personal life systems",
		description: "Calendar, notes, and life-ops hooks.",
		category: "personal",
		type: "generic.personal",
		ui: {
			icon: "Heart",
			renderer: "generic"
		},
		inputSchema: {
			type: "object",
			required: ["note"],
			properties: { note: {
				type: "string",
				title: "Note"
			} }
		}
	}),
	cap({
		id: "simulation.generic",
		name: "Simulation",
		description: "Run a simulation from a schema. Generic renderer example.",
		category: "simulation",
		type: "generic.simulation",
		ui: {
			icon: "Orbit",
			renderer: "generic"
		},
		inputSchema: {
			type: "object",
			required: ["scenario"],
			properties: {
				scenario: {
					type: "string",
					title: "Scenario"
				},
				steps: {
					type: "number",
					title: "Steps",
					default: 12,
					minimum: 1,
					maximum: 100
				}
			}
		},
		outputSchema: {
			type: "object",
			properties: {
				summary: { type: "string" },
				series: { type: "string" }
			}
		}
	}),
	cap({
		id: "physical.cad",
		name: "Bits to atoms",
		description: "CAD, fabrication, and physical-world capabilities.",
		category: "physical",
		type: "generic.physical",
		enabled: true,
		available: false,
		status: "unavailable",
		health: "unknown",
		ui: {
			icon: "Box",
			renderer: "generic",
			accent: "physical",
			nav: false
		}
	})
];
var AGENTS = [
	{
		id: "agent.research",
		name: "Landscape",
		description: "Maps prior art, competitors, and open questions.",
		status: "available",
		tools: ["tool.web.search", "tool.memory.search"],
		model: "sovi.auto"
	},
	{
		id: "agent.builder",
		name: "Builder",
		description: "Turns requirements into prototypes and tests.",
		status: "available",
		tools: ["tool.files.write", "tool.terminal"],
		model: "grok-4.5"
	},
	{
		id: "agent.ops",
		name: "Ops",
		description: "Watches jobs, retries, and health.",
		status: "available",
		tools: ["tool.system.status"]
	},
	{
		id: "agent.physical",
		name: "Fabricator",
		description: "Would drive CAD and BOM workflows when available.",
		status: "unavailable"
	}
];
var TOOLS = [
	{
		id: "tool.web.search",
		name: "Web search",
		description: "Search the public web.",
		status: "available",
		mcp: false
	},
	{
		id: "tool.web.read",
		name: "Read page",
		description: "Extract a URL into context.",
		status: "available"
	},
	{
		id: "tool.memory.search",
		name: "Memory search",
		description: "Query Sovi memory. Does not replace the backend store.",
		status: "available"
	},
	{
		id: "tool.files.write",
		name: "Write file",
		description: "Create or update a workspace file.",
		status: "available"
	},
	{
		id: "tool.terminal",
		name: "Terminal",
		description: "Run a sandboxed command.",
		status: "degraded"
	},
	{
		id: "tool.system.status",
		name: "System status",
		description: "Read service health.",
		status: "available"
	},
	{
		id: "mcp.example.notes",
		name: "Notes MCP",
		description: "Example MCP-style tool, schema-driven.",
		status: "available",
		mcp: true,
		inputSchema: {
			type: "object",
			required: ["query"],
			properties: { query: {
				type: "string",
				title: "Query"
			} }
		}
	}
];
var WORKFLOWS = [{
	id: "wf.research-to-prototype",
	name: "Research → prototype",
	description: "Investigate an idea, then scaffold a prototype if it is buildable.",
	status: "available",
	steps: [
		{
			id: "s1",
			name: "Research landscape",
			capabilityId: "research.web"
		},
		{
			id: "s2",
			name: "Decide feasibility",
			capabilityId: "chat.reasoning"
		},
		{
			id: "s3",
			name: "Build prototype",
			capabilityId: "coding.workspace"
		}
	]
}, {
	id: "wf.weekly-review",
	name: "Weekly review",
	description: "Summarize memory, projects, and open tasks.",
	status: "available",
	steps: [{
		id: "s1",
		name: "Recall",
		capabilityId: "memory.longterm"
	}, {
		id: "s2",
		name: "Summarize",
		capabilityId: "chat.reasoning"
	}]
}];
var INTEGRATIONS = [{
	id: "int.github",
	name: "GitHub",
	kind: "scm",
	status: "unavailable"
}, {
	id: "int.drive",
	name: "Files gateway",
	kind: "files",
	status: "available"
}];
var FLAG_CAPABILITY = {
	voice: [
		"voice.mode",
		"speech.tts",
		"speech.stt"
	],
	images: ["media.image.generate"],
	imageEditing: ["media.image.edit"],
	video: ["media.video.generate"],
	audio: ["media.audio.generate"],
	agents: [
		"agents.orchestrator",
		"agents.research",
		"agents.coding"
	],
	workflows: ["workflows.runner"],
	automations: ["automations.engine"],
	memory: ["memory.longterm", "knowledge.retrieval"],
	computerUse: ["computer.browser"],
	physicalSystems: ["physical.cad"]
};
function flagsFromCapabilities(capabilities) {
	const byId = new Map(capabilities.map((c) => [c.id, c]));
	const live = (ids) => ids.some((id) => {
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
		physicalSystems: live(FLAG_CAPABILITY.physicalSystems)
	};
}
function isUsable(cap) {
	if (!cap) return false;
	return cap.enabled && cap.available && (cap.status === "available" || cap.status === "degraded");
}
/** Deterministic SVG stand-ins so mock / failed media still renders as real objects. */
function hash(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
	return h;
}
function horizonImageDataUri(prompt) {
	const h = hash(prompt);
	const hue = 190 + h % 28;
	const hue2 = 28 + h % 40;
	const title = prompt.replace(/[<>&]/g, "").slice(0, 64);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 768">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="hsl(${hue}, 28%, 14%)"/>
        <stop offset="55%" stop-color="hsl(${hue}, 32%, 18%)"/>
        <stop offset="100%" stop-color="hsl(${hue2}, 36%, 22%)"/>
      </linearGradient>
      <radialGradient id="sun" cx="50%" cy="58%" r="40%">
        <stop offset="0%" stop-color="hsl(38, 70%, 68%)" stop-opacity="0.95"/>
        <stop offset="45%" stop-color="hsl(${hue}, 50%, 50%)" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="hsl(${hue}, 30%, 12%)" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1024" height="768" fill="url(#sky)"/>
    <rect width="1024" height="768" fill="url(#sun)"/>
    <path d="M0 470 Q 256 ${430 + h % 40} 512 460 T 1024 480 L 1024 768 L 0 768 Z" fill="hsl(${hue}, 22%, 10%)"/>
    <path d="M0 510 Q 300 ${490 + h % 20} 640 520 T 1024 530 L 1024 768 L 0 768 Z" fill="hsl(${hue}, 18%, 8%)" opacity="0.85"/>
    <circle cx="512" cy="430" r="7" fill="hsl(38, 80%, 78%)"/>
    <text x="64" y="700" fill="hsl(200, 20%, 78%)" font-family="Georgia, serif" font-size="22">${escapeXml(title)}</text>
  </svg>`;
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function audioWaveDataUri(prompt) {
	const title = escapeXml(prompt.slice(0, 48));
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200">
    <rect width="640" height="200" rx="16" fill="#141a24"/>
    ${Array.from({ length: 48 }, (_, i) => {
		const h = 20 + hash(prompt + i) % 70;
		return `<rect x="${20 + i * 12.5}" y="${100 - h / 2}" width="6" height="${h}" rx="3" fill="#3aa89a" opacity="${.35 + i % 5 * .1}"/>`;
	}).join("")}
    <text x="24" y="180" fill="#8b96a8" font-family="sans-serif" font-size="12">${title}</text>
  </svg>`;
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function escapeXml(s) {
	return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}
function emit(onEvent, type, payload = {}) {
	onEvent(type, payload);
}
async function playResearchPreamble(req, onEvent, abort) {
	const query = req.text;
	emit(onEvent, "memory.retrieved", {
		title: "Related project memory",
		content: "User is exploring a personal AI operating system and prefers ownership over rented tools."
	});
	if (abort.current) return;
	const searchId = createId("act");
	emit(onEvent, "tool.started", { activity: {
		id: searchId,
		kind: "tool",
		title: "Searching the web",
		detail: query,
		state: "searching",
		startedAt: Date.now()
	} });
	await sleep(420);
	if (abort.current) return;
	emit(onEvent, "tool.progress", {
		activityId: searchId,
		progress: 55,
		detail: "Reading candidate sources"
	});
	await sleep(380);
	const citations = [
		{
			id: createId("cite"),
			title: "Personal AI stacks and self-hosted copilots",
			source: "Research landscape",
			url: "https://docs.openwebui.com",
			snippet: "Self-hosted interfaces wrap many models, tools, and knowledge bases behind one conversation."
		},
		{
			id: createId("cite"),
			title: "Agent + tool + memory composition",
			source: "LibreChat docs",
			url: "https://www.librechat.ai/docs/features/agents",
			snippet: "Agents bind a model, instructions, tools, and memory rather than exposing a provider picker."
		},
		{
			id: createId("cite"),
			title: "Workspace-scoped knowledge",
			source: "AnythingLLM",
			snippet: "Projects keep files, conversations, and retrieval in one persistent working environment."
		}
	];
	for (const c of citations) emit(onEvent, "citation.added", { citation: c });
	emit(onEvent, "tool.completed", {
		activityId: searchId,
		state: "completed"
	});
}
async function playCodingPreamble(req, onEvent, abort) {
	const agentId = createId("act");
	emit(onEvent, "agent.started", { activity: {
		id: agentId,
		kind: "agent",
		title: "Builder agent",
		detail: "Planning the prototype",
		state: "planning",
		startedAt: Date.now()
	} });
	await sleep(360);
	if (abort.current) return;
	emit(onEvent, "agent.progress", {
		activityId: agentId,
		progress: 35,
		detail: "Sketching files",
		state: "coding"
	});
	await sleep(320);
	emit(onEvent, "tool.started", { activity: {
		id: createId("act"),
		kind: "tool",
		title: "Write file",
		detail: "prototype.ts",
		state: "calling-tool",
		startedAt: Date.now()
	} });
	await sleep(240);
	if (abort.current) return;
	emit(onEvent, "agent.progress", {
		activityId: agentId,
		progress: 80,
		detail: "Drafting implementation",
		state: "coding"
	});
}
async function playWorkflowPreamble(_req, onEvent, abort) {
	const wf = createId("act");
	emit(onEvent, "workflow.started", { activity: {
		id: wf,
		kind: "workflow",
		title: "Research → prototype",
		detail: "Step 1 of 3",
		state: "planning",
		startedAt: Date.now()
	} });
	await sleep(400);
	if (abort.current) return;
	emit(onEvent, "workflow.progress", {
		activityId: wf,
		progress: 40,
		detail: "Research complete"
	});
	await sleep(320);
	emit(onEvent, "workflow.progress", {
		activityId: wf,
		progress: 75,
		detail: "Handing to builder"
	});
}
async function playAgentPreamble(req, onEvent, abort) {
	const act = createId("act");
	emit(onEvent, "agent.started", { activity: {
		id: act,
		kind: "agent",
		title: "Orchestrator",
		detail: req.text.slice(0, 80),
		state: "planning",
		startedAt: Date.now()
	} });
	await sleep(350);
	if (abort.current) return;
	emit(onEvent, "agent.progress", {
		activityId: act,
		progress: 50,
		detail: "Delegating subtasks",
		state: "running-agent"
	});
}
function mockAnswer(intent, text) {
	switch (intent) {
		case "research": return `## Landscape

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
		case "coding": return `## Approach

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
		case "image": return `I made an image from your description. If you want a different crop, lighting, or mood, tell me what to change — I can edit it in place.`;
		case "image-edit": return `I applied your edit to the image. We can keep going: tighter crop, warmer light, or a different focal point.`;
		case "video": return `I queued a short clip from your prompt. Video jobs take a bit longer than stills — you can keep talking while it renders.`;
		case "audio": return `I generated an audio bed from your prompt. Play it from the card, or ask me to make a quieter / more rhythmic version.`;
		case "workflow": return `I ran the **Research → prototype** workflow.

1. Landscape — prior art and the gap
2. Feasibility — buildable as a frontend cockpit with adapters
3. Prototype — handed to the coding workspace

Say if you want the next iteration to be a real integration against your running Sovi services.`;
		case "memory": return `I checked memory (this UI only *hooks* your existing memory — it is not a second source of truth).

You have been building **Sovi** as a personal AI operating system: conversation first, capabilities discovered dynamically, no vendor dashboard. I’ll keep using that as context unless you tell me otherwise.`;
		case "files": return `I read the attached material and pulled out the load-bearing pieces. If you want a structured report artifact, ask and I’ll write one into the library.`;
		case "agent": return `I delegated this. The orchestrator planned, called tools, and folded the result back into the conversation. You can inspect the trace in the activity panel — or ignore it and just use the answer.`;
		default: return `I’m here.

You can ask plainly — research an idea, build a prototype, generate media, or look under the hood. I’ll route it. If you want to steer, open the routing control; the default is still **Sovi decides**.

Prompt you sent: “${text.slice(0, 240)}${text.length > 240 ? "…" : ""}”`;
	}
}
function maybeArtifact(intent, text, conversationId) {
	if (intent === "coding") return {
		id: createId("art"),
		kind: "code",
		title: "Habit tracker prototype",
		language: "tsx",
		description: "Single-file React habit tracker.",
		content: mockAnswer("coding", text).match(/```tsx([\s\S]*?)```/)?.[1]?.trim() ?? "",
		conversationId,
		createdAt: Date.now()
	};
	if (intent === "research") return {
		id: createId("art"),
		kind: "report",
		title: "Personal AI OS landscape",
		description: "Short research note",
		content: mockAnswer("research", text),
		conversationId,
		createdAt: Date.now()
	};
	return null;
}
async function simulateGeneration(kind, prompt, conversationId, onEvent, abort, resultUrl) {
	const job = {
		id: createId("job"),
		kind,
		prompt,
		status: "queued",
		progress: 0,
		conversationId,
		createdAt: Date.now(),
		updatedAt: Date.now()
	};
	emit(onEvent, "generation.started", { job });
	for (const p of [
		12,
		28,
		47,
		63,
		81,
		100
	]) {
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
async function streamText(text, onEvent, abort) {
	emit(onEvent, "message.started", {});
	const chunks = text.split(/(\s+)/);
	let acc = "";
	for (const chunk of chunks) {
		if (abort.current) {
			emit(onEvent, "message.completed", {
				cancelled: true,
				text: acc
			});
			return;
		}
		acc += chunk;
		emit(onEvent, "message.delta", { text: chunk });
		await sleep(chunk.length > 8 ? 18 : 12);
	}
	emit(onEvent, "message.completed", { text: acc });
}
var jobs = /* @__PURE__ */ new Map();
function snapshot(overrides) {
	const capabilities = CAPABILITIES.map((c) => ({ ...c }));
	return {
		capabilities,
		providers: PROVIDERS,
		models: MODELS,
		agents: AGENTS,
		tools: TOOLS,
		workflows: WORKFLOWS,
		integrations: INTEGRATIONS,
		flags: flagsFromCapabilities(capabilities),
		status: {
			healthy: true,
			adapter: "mock",
			xaiAvailable: false,
			version: "0.1.0",
			schemaVersion: "1.0.0",
			eventProtocolVersion: "1.0.0",
			services: [
				{
					id: "router",
					name: "Sovi router",
					status: "available",
					latencyMs: 12
				},
				{
					id: "memory",
					name: "Memory (existing)",
					status: "available",
					latencyMs: 18
				},
				{
					id: "media",
					name: "Media gateway",
					status: "available",
					latencyMs: 40
				},
				{
					id: "computer",
					name: "Computer use",
					status: "unavailable"
				}
			],
			usage: {
				tokensIn: 12840,
				tokensOut: 9320,
				estimatedCostUsd: 0
			}
		},
		...overrides
	};
}
function mockSnapshot(overrides) {
	return snapshot(overrides);
}
function createMockAdapter() {
	return {
		id: "mock",
		async discover() {
			return snapshot();
		},
		async getSystemStatus() {
			return snapshot().status;
		},
		streamConversation(request, handlers) {
			const abort = { current: false };
			return {
				cancel() {
					abort.current = true;
				},
				done: (async () => {
					const intent = request.intent ?? "chat";
					try {
						if (intent === "research") await playResearchPreamble(request, handlers.onEvent, abort);
						else if (intent === "coding") await playCodingPreamble(request, handlers.onEvent, abort);
						else if (intent === "workflow") await playWorkflowPreamble(request, handlers.onEvent, abort);
						else if (intent === "agent") await playAgentPreamble(request, handlers.onEvent, abort);
						if (intent === "image") {
							const url = horizonImageDataUri(request.text);
							const job = await simulateGeneration("image", request.text, request.conversationId, handlers.onEvent, abort, url);
							const art = {
								id: createId("art"),
								kind: "image",
								title: request.text.slice(0, 48) || "Generated image",
								url,
								conversationId: request.conversationId,
								createdAt: Date.now()
							};
							handlers.onEvent("artifact.created", {
								artifact: art,
								job
							});
						}
						if (intent === "image-edit") {
							const url = request.attachments?.find((a) => a.kind === "image")?.url ?? horizonImageDataUri(request.text);
							await simulateGeneration("image", request.text, request.conversationId, handlers.onEvent, abort, url);
						}
						if (intent === "video") await simulateGeneration("video", request.text, request.conversationId, handlers.onEvent, abort, horizonImageDataUri(request.text));
						if (intent === "audio") await simulateGeneration("audio", request.text, request.conversationId, handlers.onEvent, abort, audioWaveDataUri(request.text));
						if (abort.current) return;
						await streamText(mockAnswer(intent, request.text), handlers.onEvent, abort);
						const art = maybeArtifact(intent, request.text, request.conversationId);
						if (art && !abort.current) handlers.onEvent("artifact.created", { artifact: art });
					} catch (err) {
						handlers.onEvent("error", { error: err instanceof Error ? err.message : "Mock stream failed" });
					}
				})()
			};
		},
		async generateImage(input) {
			const url = horizonImageDataUri(input.prompt);
			const job = {
				id: createId("job"),
				kind: "image",
				prompt: input.prompt,
				status: "completed",
				progress: 100,
				resultUrl: url,
				conversationId: input.conversationId,
				createdAt: Date.now(),
				updatedAt: Date.now()
			};
			jobs.set(job.id, job);
			return job;
		},
		async editImage(input) {
			return this.generateImage({
				prompt: input.prompt,
				conversationId: input.conversationId
			});
		},
		async generateVideo(input) {
			const job = {
				id: createId("job"),
				kind: "video",
				prompt: input.prompt,
				status: "completed",
				progress: 100,
				resultUrl: horizonImageDataUri(input.prompt),
				conversationId: input.conversationId,
				createdAt: Date.now(),
				updatedAt: Date.now()
			};
			jobs.set(job.id, job);
			return job;
		},
		async generateAudio(input) {
			const job = {
				id: createId("job"),
				kind: "audio",
				prompt: input.prompt,
				status: "completed",
				progress: 100,
				resultUrl: audioWaveDataUri(input.prompt),
				conversationId: input.conversationId,
				createdAt: Date.now(),
				updatedAt: Date.now()
			};
			jobs.set(job.id, job);
			return job;
		},
		async speak(text) {
			return { error: `Mock TTS: would speak “${text.slice(0, 80)}”` };
		},
		async runCapability(capabilityId, input) {
			await sleep(500);
			return {
				ok: true,
				output: {
					capabilityId,
					received: input,
					summary: `Mock execution of ${capabilityId} completed.`,
					at: (/* @__PURE__ */ new Date()).toISOString()
				}
			};
		},
		async runAgent(agentId, input) {
			await sleep(700);
			return {
				ok: true,
				output: {
					agentId,
					received: input,
					status: "completed"
				}
			};
		},
		async runWorkflow(workflowId, input) {
			await sleep(900);
			return {
				ok: true,
				output: {
					workflowId,
					received: input,
					status: "completed"
				}
			};
		},
		async cancelJob(jobId) {
			const job = jobs.get(jobId);
			if (job) {
				job.status = "cancelled";
				job.updatedAt = Date.now();
			}
		},
		async listArtifacts() {
			return [];
		},
		async listMemories() {
			return SEED_MEMORIES;
		},
		async listProjects() {
			return SEED_PROJECTS;
		},
		async uploadFile(file) {
			const url = await readFileAsDataUrl(file);
			return {
				id: createId("att"),
				name: file.name,
				mime: file.type || "application/octet-stream",
				size: file.size,
				url,
				kind: file.type.startsWith("image/") ? "image" : file.type.startsWith("audio/") ? "audio" : file.type.startsWith("video/") ? "video" : "file"
			};
		}
	};
}
var SEED_PROJECTS = [{
	id: "proj_sovi",
	name: "Sovi",
	description: "Personal AI operating system — cockpit, adapters, recursive capabilities.",
	createdAt: Date.now() - 10368e5,
	updatedAt: Date.now() - 36e5,
	color: "horizon"
}, {
	id: "proj_workshop",
	name: "Workshop",
	description: "Physical builds, sketches, and bits-to-atoms experiments.",
	createdAt: Date.now() - 3456e6,
	updatedAt: Date.now() - 1728e5,
	color: "physical"
}];
var SEED_MEMORIES = [
	{
		id: "mem_1",
		kind: "preference",
		title: "Interface philosophy",
		content: "Talk to Sovi. Do not expose a provider dashboard. Progressive disclosure: simple by default, inspectable on demand.",
		createdAt: Date.now() - 864e6,
		tags: ["sovi", "ux"]
	},
	{
		id: "mem_2",
		kind: "project",
		title: "Sovi is self-hosted",
		content: "Backend already exists in various forms. Frontend must not invent a competing memory, auth, or media stack.",
		createdAt: Date.now() - 6912e5,
		projectId: "proj_sovi",
		tags: ["architecture"]
	},
	{
		id: "mem_3",
		kind: "long-term",
		title: "Lives in Sullivan, building for himself",
		content: "Personal OS, not a product for a company. Ownership over rented intelligence.",
		createdAt: Date.now() - 1728e6,
		tags: ["personal"]
	}
];
function readFileAsDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}
/** Same-origin Sovi API fetch. Attaches the live-preview bearer when present. */
function soviFetch(input, init = {}) {
	const headers = new Headers(init.headers);
	const token = getBearerToken();
	if (token && !headers.has("Authorization")) headers.set("Authorization", `Bearer ${token}`);
	return fetch(input, {
		...init,
		headers,
		credentials: "include"
	});
}
async function readSse(response, onEvent, signal) {
	if (!response.body) throw new Error("No response body");
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	while (true) {
		if (signal?.aborted) {
			await reader.cancel().catch(() => void 0);
			return;
		}
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const chunks = buffer.split("\n\n");
		buffer = chunks.pop() ?? "";
		for (const chunk of chunks) {
			const line = chunk.split("\n").map((l) => l.trim()).find((l) => l.startsWith("data:"));
			if (!line) continue;
			const data = line.slice(5).trim();
			if (!data || data === "[DONE]" || data === "\"[DONE]\"") continue;
			try {
				onEvent(JSON.parse(data));
			} catch {}
		}
	}
}
async function callImage(prompt, mode, imageUrl) {
	const res = await soviFetch("/api/sovi/image", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			prompt,
			mode,
			imageUrl
		})
	});
	const body = await res.json();
	if (!res.ok || !body.url) throw new Error(body.error || "Image generation failed");
	return body.url;
}
function createHybridAdapter() {
	const mock = createMockAdapter();
	return {
		...mock,
		id: "hybrid",
		async discover() {
			const snap = await mock.discover();
			let xai = false;
			try {
				const body = await (await soviFetch("/api/sovi/status")).json();
				xai = Boolean(body.xaiAvailable);
			} catch {
				xai = false;
			}
			snap.status = {
				...snap.status,
				adapter: xai ? "hybrid" : "mock",
				xaiAvailable: xai,
				services: snap.status.services.map((s) => s.id === "router" ? {
					...s,
					status: xai ? "available" : "degraded",
					detail: xai ? "xAI gateway live" : "mock"
				} : s)
			};
			snap.flags = flagsFromCapabilities(CAPABILITIES);
			return snap;
		},
		streamConversation(request, handlers) {
			const controller = new AbortController();
			const abort = { current: false };
			return {
				cancel() {
					abort.current = true;
					controller.abort();
				},
				done: (async () => {
					const intent = request.intent ?? "chat";
					try {
						if (intent === "research") await playResearchPreamble(request, handlers.onEvent, abort);
						else if (intent === "coding") await playCodingPreamble(request, handlers.onEvent, abort);
						else if (intent === "workflow") await playWorkflowPreamble(request, handlers.onEvent, abort);
						else if (intent === "agent") await playAgentPreamble(request, handlers.onEvent, abort);
						if (intent === "image" || intent === "image-edit") {
							handlers.onEvent("generation.started", { job: {
								id: createId("job"),
								kind: "image",
								prompt: request.text,
								status: "processing",
								progress: 15,
								conversationId: request.conversationId,
								createdAt: Date.now(),
								updatedAt: Date.now()
							} });
							try {
								const src = request.attachments?.find((a) => a.kind === "image")?.url;
								const url = await callImage(request.text, intent === "image-edit" ? "edit" : "generate", src);
								const job = {
									id: createId("job"),
									kind: "image",
									prompt: request.text,
									status: "completed",
									progress: 100,
									resultUrl: url,
									conversationId: request.conversationId,
									createdAt: Date.now(),
									updatedAt: Date.now()
								};
								handlers.onEvent("generation.completed", { job });
								handlers.onEvent("artifact.created", { artifact: {
									id: createId("art"),
									kind: "image",
									title: request.text.slice(0, 60) || "Image",
									url,
									conversationId: request.conversationId,
									createdAt: Date.now()
								} });
							} catch (err) {
								const url = horizonImageDataUri(request.text);
								handlers.onEvent("generation.completed", { job: {
									id: createId("job"),
									kind: "image",
									prompt: request.text,
									status: "completed",
									progress: 100,
									resultUrl: url,
									error: err instanceof Error ? err.message : "fallback",
									conversationId: request.conversationId,
									createdAt: Date.now(),
									updatedAt: Date.now()
								} });
							}
						}
						if (abort.current) return;
						const images = (request.attachments ?? []).filter((a) => a.kind === "image").map((a) => a.url);
						const res = await soviFetch("/api/sovi/chat", {
							method: "POST",
							signal: controller.signal,
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								intent,
								messages: [...request.history.slice(-14), {
									role: "user",
									content: request.text,
									images
								}]
							})
						});
						if (!res.ok) {
							await streamText(mockAnswer(intent, request.text), handlers.onEvent, abort);
							return;
						}
						await readSse(res, (evt) => {
							const type = String(evt.type ?? "");
							if (type === "message.delta") handlers.onEvent("message.delta", { text: evt.text });
							else if (type === "message.started") handlers.onEvent("message.started", {});
							else if (type === "message.completed") handlers.onEvent("message.completed", {});
							else if (type === "error") handlers.onEvent("error", { error: evt.error });
							else if (type === "usage") handlers.onEvent("system.status", { usage: evt.usage });
						}, controller.signal);
						const art = maybeArtifact(intent, request.text, request.conversationId);
						if (art && !abort.current) handlers.onEvent("artifact.created", { artifact: art });
					} catch (err) {
						if (controller.signal.aborted || abort.current) {
							handlers.onEvent("message.completed", { cancelled: true });
							return;
						}
						handlers.onEvent("error", { error: err instanceof Error ? err.message : "Stream failed" });
					}
				})()
			};
		},
		async generateImage(input) {
			try {
				const url = await callImage(input.prompt, "generate");
				return {
					id: createId("job"),
					kind: "image",
					prompt: input.prompt,
					status: "completed",
					progress: 100,
					resultUrl: url,
					conversationId: input.conversationId,
					createdAt: Date.now(),
					updatedAt: Date.now()
				};
			} catch {
				return mock.generateImage(input);
			}
		},
		async editImage(input) {
			try {
				const url = await callImage(input.prompt, "edit", input.imageUrl);
				return {
					id: createId("job"),
					kind: "image",
					prompt: input.prompt,
					status: "completed",
					progress: 100,
					resultUrl: url,
					conversationId: input.conversationId,
					createdAt: Date.now(),
					updatedAt: Date.now()
				};
			} catch {
				return mock.editImage(input);
			}
		},
		async speak(text) {
			try {
				const res = await soviFetch("/api/sovi/tts", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ text })
				});
				const body = await res.json();
				if (!res.ok || !body.base64) return { error: body.error || "TTS failed" };
				return {
					mime: body.mime || "audio/mpeg",
					base64: body.base64
				};
			} catch (err) {
				return { error: err instanceof Error ? err.message : "TTS failed" };
			}
		},
		async uploadFile(file) {
			const url = await readFileAsDataUrl(file);
			return {
				id: createId("att"),
				name: file.name,
				mime: file.type || "application/octet-stream",
				size: file.size,
				url,
				kind: file.type.startsWith("image/") ? "image" : file.type.startsWith("audio/") ? "audio" : file.type.startsWith("video/") ? "video" : "file"
			};
		}
	};
}
var listeners = /* @__PURE__ */ new Set();
function subscribeToSoviEvents(handler) {
	listeners.add(handler);
	return () => {
		listeners.delete(handler);
	};
}
function emitSoviEvent(type, payload = {}, extra = {}) {
	const event = {
		id: createId("evt"),
		type,
		ts: Date.now(),
		payload,
		...extra
	};
	for (const handler of listeners) try {
		handler(event);
	} catch (err) {
		console.error("[sovi] event handler failed", err);
	}
	return event;
}
function eventLabel(type) {
	return {
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
		error: "Error"
	}[type] ?? type;
}
var rules = [
	{
		intent: "image-edit",
		re: /\b(edit|modify|change|restyle|inpaint|outpaint)\b.{0,40}\b(image|photo|picture|illustration)\b|\b(image|photo|picture).{0,40}\b(edit|modify|change)\b/i
	},
	{
		intent: "image",
		re: /\b(create|generate|make|draw|paint|imagine|render)\b.{0,50}\b(image|picture|photo|illustration|poster|logo|icon|artwork|scene)\b|\bimage of\b|\bpicture of\b/i
	},
	{
		intent: "video",
		re: /\b(create|generate|make|render)\b.{0,40}\b(video|clip|animation|cinematic)\b|\bvideo of\b/i
	},
	{
		intent: "audio",
		re: /\b(create|generate|compose|make)\b.{0,40}\b(audio|music|soundtrack|voiceover|soundscape)\b|\bspeak this\b|\bread this aloud\b/i
	},
	{
		intent: "research",
		re: /\b(research|investigate|look up|search the web|find sources|what already exists|literature|compare approaches|is this possible)\b/i
	},
	{
		intent: "coding",
		re: /\b(build|code|implement|prototype|app|application|component|function|refactor|debug|write (a |the )?(script|program|website))\b/i
	},
	{
		intent: "workflow",
		re: /\b(run (this |the )?workflow|automat|schedule|pipeline)\b/i
	},
	{
		intent: "memory",
		re: /\b(remember|forget|what do you know about|from memory|recall)\b/i
	},
	{
		intent: "files",
		re: /\b(analy[sz]e (this |the )?(file|document|pdf|spreadsheet)|summarize (this |the )?(doc|file|pdf))\b/i
	},
	{
		intent: "agent",
		re: /\b(agent|delegate|work on this autonomously|take this and run)\b/i
	}
];
function classifyIntent(text, hasImageAttachment = false) {
	const trimmed = text.trim();
	if (hasImageAttachment && /\b(edit|change|make it|turn this)\b/i.test(trimmed)) return "image-edit";
	for (const rule of rules) if (rule.re.test(trimmed)) return rule.intent;
	return "chat";
}
var t = (daysAgo, hours = 0) => Date.now() - daysAgo * 864e5 - hours * 36e5;
var SEED_CONVERSATIONS = [{
	id: "c_research",
	title: "Does a personal AI OS already exist?",
	createdAt: t(2, 3),
	updatedAt: t(0, 2),
	pinned: true,
	projectId: "proj_sovi",
	preview: "Nothing I found is a full personal AI operating system in the sense you mean."
}, {
	id: "c_image",
	title: "Quiet workshop at sunrise",
	createdAt: t(1, 5),
	updatedAt: t(1, 5),
	projectId: "proj_workshop",
	preview: "I made an image from your description."
}];
var researchReport = `## Landscape

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
var SEED_MESSAGES = {
	c_research: [{
		id: "m_r1",
		conversationId: "c_research",
		role: "user",
		content: "Research whether a personal AI operating system already exists. I want one interface I own — not another chatbot and not a provider dashboard.",
		createdAt: t(2, 3),
		status: "complete"
	}, {
		id: "m_r2",
		conversationId: "c_research",
		role: "assistant",
		content: researchReport,
		createdAt: t(2, 3) + 4e4,
		status: "complete",
		routing: {
			capabilityId: "research.web",
			modelId: "sovi.auto",
			providerId: "sovi.router"
		},
		activities: [{
			id: "a1",
			kind: "tool",
			title: "Searching the web",
			detail: "personal AI operating system self-hosted",
			state: "completed",
			startedAt: t(2, 3),
			completedAt: t(2, 3) + 8e3
		}, {
			id: "a2",
			kind: "agent",
			title: "Landscape agent",
			detail: "Compared chat shells, self-hosted cockpits, workspaces",
			state: "completed",
			startedAt: t(2, 3) + 8e3,
			completedAt: t(2, 3) + 22e3
		}],
		citations: [
			{
				id: "cite1",
				title: "Open WebUI — self-hosted agentic platform",
				source: "Open WebUI docs",
				url: "https://docs.openwebui.com",
				snippet: "Tools, MCP, sub-agents, and automations behind a chat shell."
			},
			{
				id: "cite2",
				title: "LibreChat agents",
				source: "LibreChat",
				url: "https://www.librechat.ai/docs/features/agents",
				snippet: "Model + instructions + tools + memory as an agent unit."
			},
			{
				id: "cite3",
				title: "AnythingLLM workspaces",
				source: "AnythingLLM",
				snippet: "Documents, conversations, and retrieval scoped to a workspace."
			}
		],
		artifacts: [{
			id: "art_report",
			kind: "report",
			title: "Personal AI OS landscape",
			description: "Short research note",
			content: researchReport,
			conversationId: "c_research",
			createdAt: t(2, 3) + 4e4
		}]
	}],
	c_image: [{
		id: "m_i1",
		conversationId: "c_image",
		role: "user",
		content: "Create an image of a quiet workshop at sunrise — wood dust in the light, tools on the bench, no people.",
		createdAt: t(1, 5),
		status: "complete"
	}, {
		id: "m_i2",
		conversationId: "c_image",
		role: "assistant",
		content: "I made an image from your description. If you want a cooler light or a tighter crop on the bench, say so.",
		createdAt: t(1, 5) + 12e3,
		status: "complete",
		routing: { capabilityId: "media.image.generate" },
		artifacts: [{
			id: "art_img",
			kind: "image",
			title: "Quiet workshop at sunrise",
			url: horizonImageDataUri("quiet workshop at sunrise wood dust"),
			conversationId: "c_image",
			createdAt: t(1, 5) + 12e3
		}]
	}]
};
function collectSeedArtifacts() {
	const out = [];
	for (const msgs of Object.values(SEED_MESSAGES)) for (const m of msgs) if (m.artifacts) out.push(...m.artifacts);
	return out;
}
var BASE = "sovi.ui.v1";
function keyFor(ownerId) {
	return ownerId ? `${BASE}.${ownerId}` : BASE;
}
function loadPersisted(ownerId) {
	if (typeof window === "undefined") return null;
	const keys = [ownerId ? keyFor(ownerId) : null, BASE].filter(Boolean);
	for (const k of keys) try {
		const raw = window.localStorage.getItem(k);
		if (!raw) continue;
		const parsed = JSON.parse(raw);
		if (!parsed.identity) parsed.identity = DEFAULT_IDENTITY;
		return parsed;
	} catch {}
	return null;
}
function savePersisted(slice, ownerId) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(keyFor(ownerId), JSON.stringify(slice));
	} catch {}
}
var streams = /* @__PURE__ */ new Map();
var adapter = createHybridAdapter();
var didSubscribe = false;
var didInit = false;
var bootSnap = mockSnapshot();
/**
* Zustand compares selector results with Object.is.
* Returning `[]`, `.filter()`, or `.slice()` from a selector allocates a new
* array every snapshot and infinite-loops React. Select the raw field, then
* derive in the component.
*/
function applyThemeClass(theme) {
	if (typeof document === "undefined") return;
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.classList.toggle("light", theme === "light");
}
function mergeMessage(list, id, patch) {
	return list.map((m) => m.id === id ? {
		...m,
		...patch
	} : m);
}
var useSovi = create((set, get) => ({
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
			identity: s.identity
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
			const theme = persisted?.theme === "light" || persisted?.theme === "dark" ? persisted.theme : typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
			applyThemeClass(theme);
			const forceMock = Boolean(persisted?.adapterForce);
			const hidden = Array.isArray(persisted?.hiddenCapabilityIds) ? persisted.hiddenCapabilityIds : [];
			const patch = {
				theme,
				forceMock,
				hiddenCapabilityIds: hidden
			};
			if (Array.isArray(persisted?.conversations)) patch.conversations = persisted.conversations;
			if (persisted?.messagesById && typeof persisted.messagesById === "object") patch.messagesByConversation = persisted.messagesById;
			if (Array.isArray(persisted?.artifacts)) patch.artifacts = persisted.artifacts;
			if (persisted?.routing && typeof persisted.routing === "object") patch.routing = persisted.routing;
			if (typeof persisted?.powerMode === "boolean") patch.powerMode = persisted.powerMode;
			if (persisted?.identity && typeof persisted.identity === "object") patch.identity = {
				...DEFAULT_IDENTITY,
				...persisted.identity
			};
			set(patch);
			adapter = forceMock ? createMockAdapter() : createHybridAdapter();
			const snap = await adapter.discover();
			const capabilities = snap.capabilities.map((c) => hidden.includes(c.id) ? {
				...c,
				available: false,
				status: "unavailable"
			} : c);
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
				status: snap.status
			});
		} catch (err) {
			set({
				ready: true,
				errorBanner: err instanceof Error ? err.message : "Discovery failed — using the local catalog"
			});
		}
	},
	setOwner(ownerId) {
		if (get().ownerId === ownerId) return;
		didInit = false;
		set({ ownerId });
		get().init();
	},
	setIdentity(patch) {
		set((s) => ({ identity: {
			...s.identity,
			...patch
		} }));
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
		set({
			voiceMode,
			presence: voiceMode ? "waiting" : "idle"
		});
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
			rightPanel: activeArtifactId ? "artifact" : get().rightPanel
		});
	},
	newConversation(projectId) {
		const id = createId("c");
		const conv = {
			id,
			title: "New conversation",
			createdAt: Date.now(),
			updatedAt: Date.now(),
			projectId: projectId ?? null
		};
		set((s) => ({
			conversations: [conv, ...s.conversations],
			messagesByConversation: {
				...s.messagesByConversation,
				[id]: []
			}
		}));
		get().persist();
		return id;
	},
	renameConversation(id, title) {
		set((s) => ({ conversations: s.conversations.map((c) => c.id === id ? {
			...c,
			title
		} : c) }));
		get().persist();
	},
	togglePin(id) {
		set((s) => ({ conversations: s.conversations.map((c) => c.id === id ? {
			...c,
			pinned: !c.pinned
		} : c) }));
		get().persist();
	},
	toggleFavorite(id) {
		set((s) => ({ conversations: s.conversations.map((c) => c.id === id ? {
			...c,
			favorite: !c.favorite
		} : c) }));
		get().persist();
	},
	archiveConversation(id) {
		set((s) => ({ conversations: s.conversations.map((c) => c.id === id ? {
			...c,
			archived: !c.archived
		} : c) }));
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
				messagesByConversation: nextMsgs
			};
		});
		get().persist();
	},
	async sendMessage({ conversationId, text, attachments }) {
		const trimmed = text.trim();
		if (!trimmed && !attachments?.length) return conversationId ?? "";
		let cid = conversationId;
		if (!cid) cid = get().newConversation();
		const userMsg = {
			id: createId("m"),
			conversationId: cid,
			role: "user",
			content: trimmed,
			createdAt: Date.now(),
			status: "complete",
			attachments
		};
		const assistantId = createId("m");
		const assistant = {
			id: assistantId,
			conversationId: cid,
			role: "assistant",
			content: "",
			createdAt: Date.now(),
			status: "pending"
		};
		const intent = get().routing.mode === "manual" && get().routing.capabilityId ? void 0 : classifyIntent(trimmed, Boolean(attachments?.some((a) => a.kind === "image")));
		set((s) => {
			const prev = s.messagesByConversation[cid] ?? [];
			return {
				conversations: s.conversations.map((c) => c.id === cid ? {
					...c,
					updatedAt: Date.now(),
					title: c.title === "New conversation" ? truncate(trimmed || "New conversation", 42) : c.title,
					preview: truncate(trimmed, 80)
				} : c).sort((a, b) => b.updatedAt - a.updatedAt),
				messagesByConversation: {
					...s.messagesByConversation,
					[cid]: [
						...prev,
						userMsg,
						assistant
					]
				},
				streamingByConversation: {
					...s.streamingByConversation,
					[cid]: true
				},
				presence: "thinking",
				composerDraft: "",
				errorBanner: null
			};
		});
		const history = (get().messagesByConversation[cid] ?? []).filter((m) => m.id !== assistantId && m.status === "complete").map((m) => ({
			role: m.role,
			content: m.content
		}));
		const handle = adapter.streamConversation({
			conversationId: cid,
			messageId: assistantId,
			text: trimmed,
			attachments,
			routing: get().routing,
			history,
			intent: intent ?? "chat"
		}, { onEvent(type, payload) {
			emitSoviEvent(type, payload, {
				conversationId: cid,
				messageId: assistantId
			});
		} });
		streams.set(cid, handle);
		handle.done.finally(() => {
			streams.delete(cid);
			set((s) => ({
				streamingByConversation: {
					...s.streamingByConversation,
					[cid]: false
				},
				presence: s.voiceMode ? "waiting" : "idle"
			}));
			const last = (get().messagesByConversation[cid] ?? []).find((m) => m.id === assistantId);
			if (last && last.status === "pending") set((s) => ({ messagesByConversation: {
				...s.messagesByConversation,
				[cid]: mergeMessage(s.messagesByConversation[cid] ?? [], assistantId, {
					status: last.content ? "complete" : "error",
					error: last.content ? void 0 : "No response"
				})
			} }));
			get().persist();
		});
		return cid;
	},
	cancelStream(conversationId) {
		streams.get(conversationId)?.cancel();
		set((s) => ({
			streamingByConversation: {
				...s.streamingByConversation,
				[conversationId]: false
			},
			presence: "idle",
			messagesByConversation: {
				...s.messagesByConversation,
				[conversationId]: (s.messagesByConversation[conversationId] ?? []).map((m) => m.status === "streaming" || m.status === "pending" ? {
					...m,
					status: "cancelled"
				} : m)
			}
		}));
	},
	async editAndResend(conversationId, messageId, text) {
		set((s) => {
			const list = s.messagesByConversation[conversationId] ?? [];
			const idx = list.findIndex((m) => m.id === messageId);
			if (idx < 0) return s;
			return { messagesByConversation: {
				...s.messagesByConversation,
				[conversationId]: list.slice(0, idx)
			} };
		});
		await get().sendMessage({
			conversationId,
			text
		});
	},
	async regenerate(conversationId) {
		const list = get().messagesByConversation[conversationId] ?? [];
		const lastUser = [...list].reverse().find((m) => m.role === "user");
		if (!lastUser) return;
		const lastUserIdx = list.findIndex((m) => m.id === lastUser.id);
		set((s) => ({ messagesByConversation: {
			...s.messagesByConversation,
			[conversationId]: list.slice(0, lastUserIdx)
		} }));
		await get().sendMessage({
			conversationId,
			text: lastUser.content,
			attachments: lastUser.attachments
		});
	},
	applyEvent(event) {
		set((s) => {
			const recentEvents = [event, ...s.recentEvents].slice(0, 80);
			const cid = event.conversationId;
			const mid = event.messageId;
			if (!cid || !mid) {
				if (event.type === "artifact.created" && event.payload.artifact) {
					const artifact = event.payload.artifact;
					return {
						recentEvents,
						artifacts: [artifact, ...s.artifacts.filter((a) => a.id !== artifact.id)],
						activeArtifactId: artifact.id,
						rightPanel: s.rightPanel === "closed" ? "artifact" : s.rightPanel
					};
				}
				if (event.type === "generation.started" || event.type === "generation.progress" || event.type === "generation.completed") {
					const job = event.payload.job;
					if (!job) return { recentEvents };
					return {
						recentEvents,
						jobs: [job, ...s.jobs.filter((j) => j.id !== job.id)]
					};
				}
				return { recentEvents };
			}
			const list = s.messagesByConversation[cid] ?? [];
			const patchActivity = (activity) => {
				const activities = [...list.find((m) => m.id === mid)?.activities ?? []];
				const i = activities.findIndex((a) => a.id === activity.id);
				if (i >= 0) activities[i] = {
					...activities[i],
					...activity
				};
				else activities.push(activity);
				return mergeMessage(list, mid, {
					activities,
					status: "streaming"
				});
			};
			let nextList = list;
			let presence = s.presence;
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
					nextList = mergeMessage(list, mid, {
						content: (list.find((m) => m.id === mid)?.content ?? "") + text,
						status: "streaming"
					});
					presence = "acting";
					break;
				}
				case "message.completed": {
					const msg = list.find((m) => m.id === mid);
					nextList = mergeMessage(list, mid, {
						status: event.payload.cancelled ? "cancelled" : "complete",
						content: event.payload.text ? String(event.payload.text) : msg?.content
					});
					presence = s.voiceMode ? "waiting" : "idle";
					break;
				}
				case "error":
					nextList = mergeMessage(list, mid, {
						status: "error",
						error: String(event.payload.error ?? "Something went wrong")
					});
					presence = "idle";
					break;
				case "tool.started":
				case "agent.started":
				case "workflow.started":
					if (event.payload.activity) nextList = patchActivity(event.payload.activity);
					presence = "acting";
					break;
				case "tool.progress":
				case "agent.progress":
				case "workflow.progress": {
					const id = String(event.payload.activityId ?? "");
					nextList = mergeMessage(list, mid, {
						activities: (list.find((m) => m.id === mid)?.activities ?? []).map((a) => a.id === id ? {
							...a,
							progress: Number(event.payload.progress ?? a.progress ?? 0),
							detail: String(event.payload.detail ?? a.detail ?? ""),
							state: event.payload.state ?? a.state
						} : a),
						status: "streaming"
					});
					presence = "acting";
					break;
				}
				case "tool.completed":
				case "agent.completed":
				case "workflow.completed": {
					const id = String(event.payload.activityId ?? "");
					nextList = mergeMessage(list, mid, { activities: (list.find((m) => m.id === mid)?.activities ?? []).map((a) => a.id === id ? {
						...a,
						state: "completed",
						progress: 100,
						completedAt: Date.now()
					} : a) });
					break;
				}
				case "citation.added": {
					const citation = event.payload.citation;
					nextList = mergeMessage(list, mid, { citations: [...list.find((m) => m.id === mid)?.citations ?? [], citation] });
					break;
				}
				case "artifact.created": {
					const artifact = event.payload.artifact;
					artifacts = [artifact, ...s.artifacts.filter((a) => a.id !== artifact.id)];
					nextList = mergeMessage(list, mid, { artifacts: [...list.find((m) => m.id === mid)?.artifacts ?? [], artifact] });
					activeArtifactId = artifact.id;
					if (typeof window !== "undefined" && window.innerWidth >= 1024) rightPanel = "artifact";
					break;
				}
				case "generation.started":
				case "generation.progress":
				case "generation.completed": {
					const job = event.payload.job;
					jobs = [job, ...s.jobs.filter((j) => j.id !== job.id)];
					const existing = list.find((m) => m.id === mid)?.jobs ?? [];
					nextList = mergeMessage(list, mid, {
						jobs: existing.findIndex((j) => j.id === job.id) >= 0 ? existing.map((j) => j.id === job.id ? job : j) : [...existing, job],
						status: "streaming"
					});
					presence = "acting";
					break;
				}
			}
			return {
				recentEvents,
				presence,
				artifacts,
				jobs,
				activeArtifactId,
				rightPanel,
				messagesByConversation: {
					...s.messagesByConversation,
					[cid]: nextList
				},
				errorBanner: event.type === "error" ? String(event.payload.error ?? "Error") : s.errorBanner
			};
		});
	},
	toggleCapability(id, enabled) {
		set((s) => {
			const capabilities = s.capabilities.map((c) => {
				if (c.id !== id) return c;
				const status = enabled ? c.available ? "available" : c.status : "disabled";
				return {
					...c,
					enabled,
					status
				};
			});
			return {
				capabilities,
				flags: flagsFromCapabilities(capabilities)
			};
		});
		emitSoviEvent("capability.updated", {
			id,
			enabled
		});
	},
	hideCapability(id, hidden) {
		set((s) => {
			const hiddenCapabilityIds = hidden ? [.../* @__PURE__ */ new Set([...s.hiddenCapabilityIds, id])] : s.hiddenCapabilityIds.filter((x) => x !== id);
			const capabilities = s.capabilities.map((c) => {
				if (c.id !== id) return c;
				const status = hidden ? "unavailable" : c.enabled ? "available" : "disabled";
				return {
					...c,
					available: !hidden && c.enabled,
					status
				};
			});
			return {
				hiddenCapabilityIds,
				capabilities,
				flags: flagsFromCapabilities(capabilities)
			};
		});
		get().persist();
		emitSoviEvent(hidden ? "capability.removed" : "capability.registered", { id });
	},
	registerCapability(cap) {
		set((s) => {
			const capabilities = [...s.capabilities.filter((c) => c.id !== cap.id), cap];
			return {
				capabilities,
				flags: flagsFromCapabilities(capabilities)
			};
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
		const snap = await adapter.discover();
		set({
			forceMock: force,
			adapterId: adapter.id,
			snapshot: snap,
			capabilities: snap.capabilities,
			flags: snap.flags,
			status: snap.status
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
		await audio.play().catch(() => void 0);
		audio.onended = () => set({ presence: get().voiceMode ? "waiting" : "idle" });
	},
	async uploadFiles(files) {
		const out = [];
		for (const f of files) out.push(await adapter.uploadFile(f));
		return out;
	}
}));
/** Horizon + rising point. Sovi's mark — not an orb, not a vendor logo. */
function HorizonGlyph({ className, size = 28, variant = "dawn" }) {
	const point = variant === "dawn" ? "var(--solar)" : "currentColor";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32",
		fill: "none",
		"aria-hidden": "true",
		className: cn("text-horizon", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3 22 C11 16.2, 21 16.2, 29 22",
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round",
			className: "sovi-presence-horizon origin-center"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 9.6 L18.15 14.2 L16 16.15 L13.85 14.2 Z",
			fill: point,
			className: "sovi-presence-core"
		})]
	});
}
function SoviMark({ className, size = 28, markId, customUrl }) {
	const identity = useSovi((s) => s.identity);
	const id = markId ?? identity.markId;
	const custom = customUrl ?? identity.customUrl;
	if ((id === "crest" || id === "custom" && custom) && size >= 36) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: id === "custom" && custom ? custom : CREST_SRC,
		alt: "",
		width: size,
		height: size,
		className: cn("rounded-xl object-cover", className)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizonGlyph, {
		className,
		size,
		variant: id === "horizon" ? "horizon" : "dawn"
	});
}
function SoviWordmark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMark, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[15px] font-semibold tracking-tight",
			children: "Sovi"
		})]
	});
}
//#endregion
export { useSovi as a, isUsable as i, SoviWordmark as n, eventLabel as r, SoviMark as t };

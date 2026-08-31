import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as formatRelativeTime, i as MARK_OPTIONS, n as CREST_SRC, o as cn, t as Button } from "./identity-CICsh5Ac.mjs";
import { a as useSovi, i as isUsable, r as eventLabel, t as SoviMark } from "./mark-BCKiqoxL.mjs";
import { a as useTalkToSovi, n as Badge, t as ArtifactCard } from "./use-talk-zdfXDLPZ.mjs";
import { t as Label } from "./label-5934PpVG.mjs";
import { t as Input } from "./input-BoH9r0aw.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages-BhZDGwuS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 rounded-full bg-background shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" })
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-20 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:opacity-50", className),
	...props
}));
Textarea.displayName = "Textarea";
function GenericCapability({ capability }) {
	const schema = capability.inputSchema;
	const fields = (0, import_react.useMemo)(() => Object.entries(schema?.properties ?? { input: {
		type: "string",
		title: "Input"
	} }), [schema]);
	const [values, setValues] = (0, import_react.useState)(() => {
		const init = {};
		for (const [k, v] of fields) init[k] = v.default != null ? String(v.default) : "";
		return init;
	});
	const [running, setRunning] = (0, import_react.useState)(false);
	const [output, setOutput] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const run = useSovi((s) => s.runCapability);
	const disabled = capability.status !== "available" || !capability.enabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-5 px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-semibold tracking-tight",
							children: capability.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: capability.status === "available" ? "success" : "warning",
							children: capability.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: capability.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Generic renderer · ",
							capability.category,
							" · ",
							capability.id
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: async (e) => {
					e.preventDefault();
					setRunning(true);
					setError(null);
					try {
						const parsed = {};
						for (const [k, spec] of fields) {
							const raw = values[k];
							parsed[k] = spec.type === "number" ? Number(raw) : raw;
						}
						const result = await run(capability.id, parsed);
						setOutput(result);
					} catch (err) {
						setError(err instanceof Error ? err.message : "Failed");
					} finally {
						setRunning(false);
					}
				},
				children: [
					fields.map(([key, spec]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchemaField, {
						name: key,
						spec,
						value: values[key] ?? "",
						onChange: (v) => setValues((s) => ({
							...s,
							[key]: v
						}))
					}, key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: disabled || running,
						children: running ? "Running…" : "Execute"
					}),
					disabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "This capability is not available on the current Sovi surface."
					}) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: error
			}) : null,
			output != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "overflow-x-auto rounded-xl p-3 text-xs shadow-[var(--shadow-border)]",
				children: JSON.stringify(output, null, 2)
			}) : null
		]
	});
}
function SchemaField({ name, spec, value, onChange }) {
	const label = spec.title || name;
	if (spec.enum?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			className: "h-10 w-full rounded-lg border border-input bg-background px-2 text-sm",
			value,
			onChange: (e) => onChange(e.target.value),
			children: spec.enum.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: String(opt),
				children: String(opt)
			}, String(opt)))
		})]
	});
	if (spec.type === "number") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
	if (spec.type === "string" && !spec.enum && (name.includes("prompt") || name.includes("query") || name === "text" || name === "note" || name === "task" || name === "scenario" || name === "payload")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			value,
			onChange: (e) => onChange(e.target.value),
			rows: 4
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function IdentityPanel() {
	const identity = useSovi((s) => s.identity);
	const setIdentity = useSovi((s) => s.setIdentity);
	const [uploadError, setUploadError] = (0, import_react.useState)(null);
	const current = MARK_OPTIONS.find((o) => o.id === identity.markId) ?? MARK_OPTIONS[0];
	const onUpload = (file) => {
		setUploadError(null);
		if (!file) return;
		if (file.size > 15e5) {
			setUploadError("Keep the file under 1.5 MB.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const url = String(reader.result ?? "");
			if (url) setIdentity({
				markId: "custom",
				customUrl: url
			});
		};
		reader.readAsDataURL(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "identity",
		className: "mt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Identity"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Sovi’s mark is a horizon and a rising point. Change it here — including your own file."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-4 rounded-2xl px-4 py-4 shadow-[var(--shadow-border)]",
				children: [identity.markId === "crest" || identity.markId === "custom" && identity.customUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: identity.markId === "custom" && identity.customUrl ? identity.customUrl : CREST_SRC,
					alt: "",
					className: "size-16 rounded-2xl object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-16 place-items-center rounded-2xl bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMark, {
						size: 48,
						markId: identity.markId
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: current.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: current.detail
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: MARK_OPTIONS.map((opt) => {
					const active = identity.markId === opt.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (opt.id === "custom" && !identity.customUrl) return;
							setIdentity({ markId: opt.id });
						},
						className: cn("flex w-full flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center shadow-[var(--shadow-border)] transition-colors hover:bg-muted/40", active && "ring-1 ring-horizon/70"),
						children: [opt.id === "crest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: CREST_SRC,
							alt: "",
							className: "size-14 rounded-xl object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMark, {
							size: opt.id === "custom" ? 56 : 40,
							markId: opt.id,
							customUrl: identity.customUrl
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium",
							children: opt.name
						})]
					}) }, opt.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex min-h-11 cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload a custom mark" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/png,image/svg+xml,image/jpeg,image/webp",
						className: "hidden",
						onChange: (e) => onUpload(e.target.files?.[0])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-horizon",
						children: "Choose file"
					})
				]
			}),
			uploadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-destructive",
				children: uploadError
			}) : null
		]
	});
}
function ProjectsPage() {
	const projects = useSovi((s) => s.projects);
	const conversations = useSovi((s) => s.conversations);
	const newConv = useSovi((s) => s.newConversation);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sovi-scroll h-full overflow-y-auto px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Projects"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-muted-foreground",
				children: "Persistent working environments. Conversations do not have to belong to a project."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: projects.map((p) => {
					const count = conversations.filter((c) => c.projectId === p.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl p-4 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-medium",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: p.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: [count, " conversations"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-3",
								size: "sm",
								variant: "secondary",
								onClick: () => {
									const id = newConv(p.id);
									navigate({
										to: "/c/$conversationId",
										params: { conversationId: id }
									});
								},
								children: "New conversation"
							})
						]
					}, p.id);
				})
			})
		]
	});
}
function AgentsPage() {
	const agents = useSovi((s) => s.snapshot)?.agents ?? [];
	const flags = useSovi((s) => s.flags);
	const run = useSovi((s) => s.runAgent);
	const send = useTalkToSovi();
	const [busy, setBusy] = (0, import_react.useState)(null);
	if (!flags.agents) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, { name: "Agents" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sovi-scroll h-full overflow-y-auto px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Agents"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-muted-foreground",
				children: "Delegated work. Agents are capabilities acting on your behalf — not characters."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3",
				children: agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-start justify-between gap-3 rounded-2xl p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-medium",
							children: a.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: a.status === "available" ? "success" : "warning",
							children: a.status
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: a.description
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						disabled: a.status !== "available" || busy === a.id,
						onClick: async () => {
							setBusy(a.id);
							await run(a.id, { task: "status" });
							await send({ text: `Run the ${a.name} agent on my current Sovi work.` });
							setBusy(null);
						},
						children: busy === a.id ? "Running…" : "Run"
					})]
				}, a.id))
			})
		]
	});
}
function ArtifactsPage() {
	const artifacts = useSovi((s) => s.artifacts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sovi-scroll h-full overflow-y-auto px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Artifacts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Things Sovi has made. They also live inside conversations."
			}),
			artifacts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted-foreground",
				children: "Nothing yet. Ask Sovi to write, build, or generate."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: artifacts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactCard, { artifact: a }) }, a.id))
			})
		]
	});
}
function MemoryPage() {
	const memories = useSovi((s) => s.memories);
	if (!useSovi((s) => s.flags).memory) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, { name: "Memory" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sovi-scroll h-full overflow-y-auto px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Memory"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-muted-foreground",
				children: "This view is a hook into Sovi’s existing memory. It is not a second source of truth."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3",
				children: memories.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-medium",
								children: m.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: m.kind })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: m.content
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: formatRelativeTime(m.createdAt)
						})
					]
				}, m.id))
			})
		]
	});
}
function MediaPage() {
	const flags = useSovi((s) => s.flags);
	const send = useTalkToSovi();
	const [prompt, setPrompt] = (0, import_react.useState)("A quiet workshop at sunrise, wood dust in the light");
	if (!flags.images && !flags.video && !flags.audio) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, { name: "Media" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sovi-scroll h-full overflow-y-auto px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Media"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Generation is native to conversation. This studio is a shortcut."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 max-w-xl space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: prompt,
					onChange: (e) => setPrompt(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						flags.images ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void send({ text: `Create an image of ${prompt}` }),
							children: "Generate image"
						}) : null,
						flags.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => void send({ text: `Create a video of ${prompt}` }),
							children: "Generate video"
						}) : null,
						flags.audio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => void send({ text: `Create audio of ${prompt}` }),
							children: "Generate audio"
						}) : null
					]
				})]
			})
		]
	});
}
function AutomationsPage() {
	const workflows = useSovi((s) => s.snapshot)?.workflows ?? [];
	const flags = useSovi((s) => s.flags);
	const run = useSovi((s) => s.runWorkflow);
	const send = useTalkToSovi();
	if (!flags.workflows && !flags.automations) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, { name: "Automations" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sovi-scroll h-full overflow-y-auto px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold tracking-tight",
			children: "Automations"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: workflows.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-2xl p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: w.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: w.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-2 list-decimal pl-4 text-xs text-muted-foreground",
						children: w.steps?.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s.name }, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						size: "sm",
						onClick: async () => {
							await run(w.id, {});
							await send({ text: `Run the workflow “${w.name}”.` });
						},
						children: "Run"
					})
				]
			}, w.id))
		})]
	});
}
function CapabilitiesPage() {
	const capabilities = useSovi((s) => s.capabilities);
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = capabilities.filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.id.includes(q.toLowerCase()) || String(c.category).includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sovi-scroll h-full overflow-y-auto px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Capabilities"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-muted-foreground",
				children: "Sovi’s current surface. New capabilities appear here as soon as they are discovered — generic UI first."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "mt-4 max-w-md",
				placeholder: "Search capabilities",
				value: q,
				onChange: (e) => setQ(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/capabilities/$capabilityId",
					params: { capabilityId: c.id },
					className: "block rounded-2xl p-4 shadow-[var(--shadow-border)] hover:bg-muted/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-medium",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: c.status === "available" ? "success" : "warning",
								children: c.status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: c.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: [
								c.ui?.renderer ?? "generic",
								" · ",
								c.category
							]
						})
					]
				}) }, c.id))
			})
		]
	});
}
function CapabilityDetail({ capabilityId }) {
	const cap = useSovi((s) => s.capabilities.find((c) => c.id === capabilityId));
	if (!cap) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, { name: "Capability" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericCapability, { capability: cap });
}
function SystemPage() {
	const status = useSovi((s) => s.status);
	const events = useSovi((s) => s.recentEvents).slice(0, 40);
	const capabilities = useSovi((s) => s.capabilities);
	const toggle = useSovi((s) => s.toggleCapability);
	const hide = useSovi((s) => s.hideCapability);
	const forceMock = useSovi((s) => s.forceMock);
	const setForce = useSovi((s) => s.setForceMock);
	const register = useSovi((s) => s.registerCapability);
	const hidden = useSovi((s) => s.hiddenCapabilityIds);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sovi-scroll h-full overflow-y-auto px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "System"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Engine room. The conversation is the bridge."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Adapter",
						value: status?.adapter ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "xAI gateway",
						value: status?.xaiAvailable ? "live" : "off"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Schema",
						value: status?.schemaVersion ?? "1.0.0"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1",
					children: status?.services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: s.status === "available" ? "success" : "warning",
							children: s.status
						})]
					}, s.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Sandbox — capability discovery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Toggle availability to see the UI adapt. Integrators will drive this from the real registry."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between rounded-xl px-3 py-2 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Force mock adapter"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: forceMock,
							onCheckedChange: (v) => void setForce(Boolean(v))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: capabilities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapabilityRow, {
							cap: c,
							hidden: hidden.includes(c.id),
							onEnabled: (v) => toggle(c.id, v),
							onHidden: (v) => hide(c.id, v)
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						variant: "secondary",
						size: "sm",
						onClick: () => register({
							id: `custom.${Date.now().toString(36)}`,
							name: "New discovered tool",
							description: "Registered at runtime. Generic UI is available immediately.",
							category: "unknown",
							type: "generic.custom",
							enabled: true,
							available: true,
							status: "available",
							ui: {
								renderer: "generic",
								icon: "Sparkles"
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
						children: "Discover a new capability"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Recent events"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 space-y-1",
					children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: eventLabel(e.type) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatRelativeTime(e.ts)
						})]
					}, e.id))
				})]
			})
		]
	});
}
function CapabilityRow({ cap, hidden, onEnabled, onHidden }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate font-medium",
				children: cap.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "truncate text-[11px] text-muted-foreground",
				children: [
					cap.status,
					" ",
					isUsable(cap) ? "· visible" : "· hidden from nav"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-1.5 text-[11px] text-muted-foreground",
				children: ["On", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: cap.enabled,
					onCheckedChange: onEnabled
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-1.5 text-[11px] text-muted-foreground",
				children: ["Installed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: !hidden && cap.available,
					onCheckedChange: (v) => onHidden(!v)
				})]
			})]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium tabular-nums",
			children: value
		})]
	});
}
function Missing({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center px-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-lg font-semibold",
			children: [name, " is not on this surface"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-sm text-sm text-muted-foreground",
			children: "Sovi only shows what it can currently do. When this capability is installed, this view will appear on its own."
		})]
	});
}
//#endregion
export { CapabilityDetail as a, ProjectsPage as c, CapabilitiesPage as i, SystemPage as l, ArtifactsPage as n, MediaPage as o, AutomationsPage as r, MemoryPage as s, AgentsPage as t };

import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { L as ArrowUp, M as ChevronDown, P as Camera, b as Mic, g as Paperclip, l as SlidersHorizontal, p as Plus, s as Square, t as X } from "../_libs/lucide-react.mjs";
import { o as cn, t as Button } from "./identity-CICsh5Ac.mjs";
import { a as useSovi, i as isUsable } from "./mark-BCKiqoxL.mjs";
import { a as useTalkToSovi, i as Progress, n as Badge } from "./use-talk-zdfXDLPZ.mjs";
import { t as Label } from "./label-5934PpVG.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/radix-ui__react-popover.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activity-DS9g0MYU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Popover = Root2;
var PopoverTrigger = Trigger;
function PopoverContent({ className, align = "center", sideOffset = 8, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		align,
		sideOffset,
		className: cn("z-50 w-72 rounded-xl bg-popover p-3 text-popover-foreground shadow-[var(--shadow-elevated)] outline-none", className),
		...props
	}) });
}
function RoutingControl() {
	const routing = useSovi((s) => s.routing);
	const setRouting = useSovi((s) => s.setRouting);
	const snapshot = useSovi((s) => s.snapshot);
	const allCapabilities = useSovi((s) => s.capabilities);
	const models = snapshot?.models ?? [];
	const capabilities = allCapabilities.filter(isUsable);
	const agents = snapshot?.agents.filter((a) => a.status === "available") ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "sm",
			className: "h-8 gap-1.5 px-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }), routing.mode === "auto" ? "Sovi decides" : "Manual"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "start",
		className: "w-72 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Routing"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Default is automatic. Override only if you want to."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 rounded-lg bg-muted p-1",
				children: ["auto", "manual"].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `flex-1 rounded-md py-1.5 text-xs font-medium ${routing.mode === mode ? "bg-card shadow-[var(--shadow-border)]" : "text-muted-foreground"}`,
					onClick: () => setRouting({
						...routing,
						mode
					}),
					children: mode === "auto" ? "Sovi decides" : "Manual"
				}, mode))
			}),
			routing.mode === "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Capability",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-9 w-full rounded-md border border-input bg-background px-2 text-sm",
							value: routing.capabilityId ?? "",
							onChange: (e) => setRouting({
								...routing,
								capabilityId: e.target.value || void 0
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Any"
							}), capabilities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Model",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-9 w-full rounded-md border border-input bg-background px-2 text-sm",
							value: routing.modelId ?? "",
							onChange: (e) => setRouting({
								...routing,
								modelId: e.target.value || void 0
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Sovi decides"
							}), models.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m.id,
								children: m.name
							}, m.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Agent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-9 w-full rounded-md border border-input bg-background px-2 text-sm",
							value: routing.agentId ?? "",
							onChange: (e) => setRouting({
								...routing,
								agentId: e.target.value || void 0
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "None"
							}), agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: a.id,
								children: a.name
							}, a.id))]
						})
					})
				]
			}) : null
		]
	})] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs text-muted-foreground",
			children: label
		}), children]
	});
}
function Composer({ conversationId, autoFocus, compact }) {
	const draft = useSovi((s) => s.composerDraft);
	const setDraft = useSovi((s) => s.setComposerDraft);
	const send = useTalkToSovi();
	const cancel = useSovi((s) => s.cancelStream);
	const streaming = useSovi((s) => conversationId ? Boolean(s.streamingByConversation[conversationId]) : false);
	const upload = useSovi((s) => s.uploadFiles);
	const setVoice = useSovi((s) => s.setVoiceMode);
	const flags = useSovi((s) => s.flags);
	const textareaRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const cameraRef = (0, import_react.useRef)(null);
	const [attachments, setAttachments] = (0, import_react.useState)([]);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = textareaRef.current;
		if (!el) return;
		el.style.height = "0px";
		el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
	}, [draft]);
	(0, import_react.useEffect)(() => {
		if (autoFocus) textareaRef.current?.focus();
	}, [autoFocus]);
	const submit = async () => {
		if (streaming) {
			if (conversationId) cancel(conversationId);
			return;
		}
		if (!draft.trim() && !attachments.length) return;
		await send({
			conversationId,
			text: draft,
			attachments
		});
		setAttachments([]);
	};
	const addFiles = async (files) => {
		const list = Array.from(files);
		if (!list.length) return;
		const uploaded = await upload(list);
		setAttachments((prev) => [...prev, ...uploaded]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative mx-auto w-full max-w-2xl px-3", compact ? "" : "pb-safe"),
		onDragOver: (e) => {
			e.preventDefault();
			setDragging(true);
		},
		onDragLeave: () => setDragging(false),
		onDrop: (e) => {
			e.preventDefault();
			setDragging(false);
			if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
		},
		children: [attachments.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-2 flex flex-wrap gap-2",
			children: attachments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-lg bg-card shadow-[var(--shadow-border)]",
				children: [a.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: a.url,
					alt: a.name,
					className: "h-16 w-16 object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-16 max-w-40 items-center px-2 text-xs",
					children: a.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute right-0.5 top-0.5 rounded-full bg-background/80 p-0.5",
					onClick: () => setAttachments((p) => p.filter((x) => x.id !== a.id)),
					"aria-label": "Remove attachment",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
				})]
			}, a.id))
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("rounded-2xl bg-card p-2 shadow-[var(--composer-shadow)] transition-[box-shadow] duration-200", dragging && "ring-2 ring-horizon/50"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				ref: textareaRef,
				value: draft,
				rows: 1,
				placeholder: "Talk to Sovi",
				className: "max-h-44 min-h-11 w-full resize-none bg-transparent px-3 py-2.5 text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground",
				onChange: (e) => setDraft(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						submit();
					}
				},
				onPaste: (e) => {
					const files = Array.from(e.clipboardData.items).filter((i) => i.kind === "file").map((i) => i.getAsFile()).filter(Boolean);
					if (files.length) {
						e.preventDefault();
						addFiles(files);
					}
				},
				"aria-label": "Message Sovi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 px-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "Add",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
						align: "start",
						className: "w-48 p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted",
							onClick: () => fileRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }), " Attach"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted",
							onClick: () => cameraRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), " Camera"]
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						hidden: true,
						multiple: true,
						onChange: (e) => {
							if (e.target.files) addFiles(e.target.files);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: cameraRef,
						type: "file",
						hidden: true,
						accept: "image/*",
						capture: "environment",
						onChange: (e) => {
							if (e.target.files) addFiles(e.target.files);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutingControl, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					flags.voice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Voice mode",
						onClick: () => setVoice(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						className: cn("rounded-full", streaming && "bg-foreground text-background"),
						onClick: () => void submit(),
						"aria-label": streaming ? "Stop" : "Send",
						disabled: !streaming && !draft.trim() && !attachments.length,
						children: streaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
					})
				]
			})]
		})]
	});
}
var STATE_LABEL = {
	planning: "Planning",
	searching: "Searching",
	reading: "Reading",
	researching: "Researching",
	"calling-tool": "Calling tool",
	"running-agent": "Running agent",
	generating: "Generating",
	coding: "Coding",
	testing: "Testing",
	waiting: "Waiting",
	completed: "Done",
	failed: "Failed",
	cancelled: "Cancelled"
};
function ActivityList({ activities }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	if (!activities.length) return null;
	const live = activities.some((a) => a.state !== "completed" && a.state !== "failed" && a.state !== "cancelled");
	const headline = live ? activities.find((a) => a.state !== "completed")?.title ?? "Working" : `${activities.length} step${activities.length === 1 ? "" : "s"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 overflow-hidden rounded-xl bg-muted/40 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-muted-foreground",
			onClick: () => setOpen((v) => !v),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", live ? "bg-horizon animate-pulse" : "bg-success") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 font-medium text-foreground/80",
					children: headline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3.5 transition-transform", open && "rotate-180") })
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2 border-t border-border px-3 py-2",
			children: activities.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: a.state === "failed" ? "destructive" : "default",
							children: STATE_LABEL[a.state]
						})]
					}),
					a.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: a.detail
					}) : null,
					typeof a.progress === "number" && a.state !== "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: a.progress }) : null
				]
			}, a.id))
		}) : null]
	});
}
//#endregion
export { Composer as n, ActivityList as t };

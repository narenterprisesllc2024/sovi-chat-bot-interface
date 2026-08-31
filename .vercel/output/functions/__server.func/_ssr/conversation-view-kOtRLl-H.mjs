import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as Copy, N as Check, R as ArrowUpRight, f as RefreshCw, h as Pencil } from "../_libs/lucide-react.mjs";
import { o as cn, t as Button, u as greetingForNow } from "./identity-CICsh5Ac.mjs";
import { a as useSovi, i as isUsable, t as SoviMark } from "./mark-BCKiqoxL.mjs";
import { t as SoviMarkdown } from "./markdown-BM2gpyHj.mjs";
import { a as useTalkToSovi, r as JobCard, t as ArtifactCard } from "./use-talk-zdfXDLPZ.mjs";
import { n as Composer, t as ActivityList } from "./activity-DS9g0MYU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/conversation-view-kOtRLl-H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmptyHome({ conversationId }) {
	const flags = useSovi((s) => s.flags);
	const send = useTalkToSovi();
	const allConversations = useSovi((s) => s.conversations);
	const allCapabilities = useSovi((s) => s.capabilities);
	const conversations = allConversations.filter((c) => !c.archived).slice(0, 4);
	const capabilities = allCapabilities.filter(isUsable);
	const [hello, setHello] = (0, import_react.useState)("Ready when you are");
	(0, import_react.useEffect)(() => {
		setHello(greetingForNow());
	}, []);
	const suggestions = [
		{
			label: "Research an idea",
			prompt: "Research whether this technology already exists, see if we could build it, and outline a prototype path.",
			show: capabilities.some((c) => c.category === "research")
		},
		{
			label: "Build something",
			prompt: "Build a prototype habit tracker I can keep iterating on.",
			show: flags.agents || capabilities.some((c) => c.category === "coding")
		},
		{
			label: "Create an image",
			prompt: "Create an image of a quiet workshop at sunrise, wood dust in the light, no people.",
			show: flags.images
		},
		{
			label: "Continue recent work",
			prompt: "Continue working on my Sovi project. What is the most useful next step?",
			show: conversations.length > 0
		}
	].filter((s) => s.show);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col items-center justify-center px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sovi-presence-idle mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMark, { size: 44 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight text-foreground",
				children: hello
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-center text-sm text-muted-foreground",
				children: "Talk to Sovi. It will decide how to handle the request."
			}),
			suggestions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 flex w-full max-w-2xl flex-wrap items-center justify-center gap-2",
				children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted-foreground shadow-[var(--shadow-border)] transition-colors hover:bg-muted/60 hover:text-foreground",
					onClick: () => void send({
						conversationId,
						text: s.prompt
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
				}) }, s.label))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
					conversationId,
					autoFocus: true
				})
			})
		]
	});
}
function CitationList({ citations }) {
	if (!citations.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
			children: "Sources"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-1.5",
			children: citations.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-2 text-xs leading-snug",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums text-muted-foreground",
					children: [i + 1, "."]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					c.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: c.url,
						target: "_blank",
						rel: "noreferrer",
						className: "font-medium text-research hover:underline",
						children: c.title
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: c.title
					}),
					c.source ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [" · ", c.source]
					}) : null,
					c.snippet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-muted-foreground",
						children: c.snippet
					}) : null
				] })]
			}, c.id))
		})]
	});
}
function MessageThread({ conversationId }) {
	const messages = useSovi((s) => s.messagesByConversation[conversationId]);
	const bottomRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		bottomRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "end"
		});
	}, [
		messages,
		messages?.at(-1)?.content,
		messages?.at(-1)?.status
	]);
	if (!messages?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6",
		children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBlock, { message: m }, m.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottomRef })]
	});
}
function MessageBlock({ message }) {
	if (message.role === "user") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserBubble, { message });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantBlock, { message });
}
function UserBubble({ message }) {
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [text, setText] = (0, import_react.useState)(message.content);
	const editAndResend = useSovi((s) => s.editAndResend);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "group flex justify-end",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[min(100%,36rem)]",
			children: [
				message.attachments?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex justify-end gap-2",
					children: message.attachments.map((a) => a.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: a.url,
						alt: a.name,
						className: "h-24 rounded-xl object-cover"
					}, a.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-lg bg-muted px-2 py-1 text-xs",
						children: a.name
					}, a.id))
				}) : null,
				editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl rounded-br-md bg-secondary p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "w-full resize-none bg-transparent text-[15px] outline-none",
						rows: 3,
						value: text,
						onChange: (e) => setText(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setEditing(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => {
								setEditing(false);
								editAndResend(message.conversationId, message.id, text);
							},
							children: "Resend"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl rounded-br-md bg-secondary px-4 py-2.5 text-[15px] leading-relaxed",
					children: message.content
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex justify-end opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Edit",
						onClick: () => setEditing(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
					})
				})
			]
		})
	});
}
function AssistantBlock({ message }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const regenerate = useSovi((s) => s.regenerate);
	const streaming = message.status === "streaming" || message.status === "pending";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center gap-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMark, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground/80",
						children: "Sovi"
					}),
					message.routing?.capabilityId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: message.routing.capabilityId
					}) : null
				]
			}),
			message.activities?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityList, { activities: message.activities }) : null,
			message.jobs?.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 max-w-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, { job: j })
			}, j.id)),
			message.status === "pending" && !message.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sovi-shimmer bg-clip-text text-sm text-muted-foreground",
				children: "Thinking"
			}) : null,
			message.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMarkdown, { content: message.content }) : null,
			streaming && message.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-horizon animate-pulse" }) : null,
			message.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-destructive",
				children: message.error
			}) : null,
			message.artifacts?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: message.artifacts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactCard, { artifact: a }, a.id))
			}) : null,
			message.citations?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitationList, { citations: message.citations }) : null,
			!streaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Copy",
					onClick: async () => {
						await navigator.clipboard.writeText(message.content);
						setCopied(true);
						setTimeout(() => setCopied(false), 1200);
					},
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Regenerate",
					onClick: () => void regenerate(message.conversationId),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" })
				})]
			}) : null
		]
	});
}
function ConversationView({ conversationId }) {
	const byId = useSovi((s) => s.messagesByConversation);
	const messages = conversationId ? byId[conversationId] : void 0;
	if (!conversationId || !messages?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyHome, { conversationId })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sovi-scroll min-h-0 flex-1 overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageThread, { conversationId })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border/60 bg-background/80 py-3 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, { conversationId })
		})]
	});
}
//#endregion
export { ConversationView as t };

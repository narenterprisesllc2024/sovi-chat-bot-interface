import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, d as useRouterState, m as Outlet, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { C as Menu, E as FolderKanban, F as Brain, I as Box, S as MessageSquare, T as Image, _ as PanelRight, a as Sun, b as Mic, c as Sparkles, d as Search, i as Trash2, k as Ellipsis, m as Pin, n as Workflow, o as Star, p as Plus, t as X, u as Settings2, w as LayoutGrid, x as MicOff, y as Moon, z as Archive } from "./_libs/lucide-react.mjs";
import { c as formatRelativeTime, f as signOut, o as cn, t as Button } from "./_ssr/identity-CICsh5Ac.mjs";
import { a as useSovi, n as SoviWordmark, r as eventLabel, t as SoviMark } from "./_ssr/mark-BCKiqoxL.mjs";
import { t as SoviMarkdown } from "./_ssr/markdown-BM2gpyHj.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, r as DialogContent, t as Dialog } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Trigger, i as Root2, n as Item2, r as Portal2, t as Content2 } from "./_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as useCurrentUser } from "./_ssr/use-current-user-ChjRQma5.mjs";
import { t as Input } from "./_ssr/input-BoH9r0aw.mjs";
import { n as PresenceChip, r as RequireAuth, t as HorizonWave } from "./_ssr/require-auth-BH3RcwE5.mjs";
import { t as Provider } from "./_libs/radix-ui__react-tooltip.mjs";
import { t as Toaster } from "./_libs/sonner.mjs";
import { i as Trigger$1, n as List, r as Root2$1, t as Content } from "./_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-D27GgR73.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-background/60 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col bg-card text-card-foreground shadow-[var(--shadow-elevated)] transition ease-out data-[state=open]:animate-in data-[state=closed]:animate-out", side === "left" && "inset-y-0 left-0 h-full w-[min(20rem,88vw)] border-r border-border data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left", side === "right" && "inset-y-0 right-0 h-full w-[min(22rem,88vw)] border-l border-border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "bottom" && "inset-x-0 bottom-0 max-h-[86vh] rounded-t-2xl border-t border-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 rounded-md p-2 text-muted-foreground hover:bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
var TooltipProvider = Provider;
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-40 overflow-hidden rounded-xl bg-popover p-1 text-popover-foreground shadow-[var(--shadow-elevated)]", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className),
		...props
	});
}
var NAV_ITEMS = [
	{
		to: "/",
		label: "Chat",
		icon: MessageSquare,
		show: () => true
	},
	{
		to: "/projects",
		label: "Projects",
		icon: FolderKanban,
		show: () => true
	},
	{
		to: "/agents",
		label: "Agents",
		icon: Sparkles,
		show: (f) => f.agents
	},
	{
		to: "/artifacts",
		label: "Artifacts",
		icon: Box,
		show: () => true
	},
	{
		to: "/memory",
		label: "Memory",
		icon: Brain,
		show: (f) => f.memory
	},
	{
		to: "/media",
		label: "Media",
		icon: Image,
		show: (f) => f.images || f.video || f.audio
	},
	{
		to: "/automations",
		label: "Automations",
		icon: Workflow,
		show: (f) => f.workflows || f.automations
	},
	{
		to: "/capabilities",
		label: "Capabilities",
		icon: LayoutGrid,
		show: () => true
	},
	{
		to: "/system",
		label: "System",
		icon: Settings2,
		show: () => true
	}
];
function Sidebar({ onNavigate }) {
	const flags = useSovi((s) => s.flags);
	const conversations = useSovi((s) => s.conversations);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const newConversation = useSovi((s) => s.newConversation);
	const [q, setQ] = (0, import_react.useState)("");
	const visibleNav = NAV_ITEMS.filter((n) => n.show(flags));
	const filtered = conversations.filter((c) => !c.archived).filter((c) => !q || c.title.toLowerCase().includes(q.toLowerCase())).sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-card/60",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-3 pt-safe py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: onNavigate,
					className: "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviWordmark, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "New conversation",
					onClick: () => {
						const id = newConversation();
						onNavigate?.();
						navigate({
							to: "/c/$conversationId",
							params: { conversationId: id }
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-col gap-0.5 px-2 pb-2",
				children: visibleNav.map((item) => {
					const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: onNavigate,
						className: cn("flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground", active && "bg-muted text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-3.5 shrink-0" }), item.label]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search conversations",
						className: "h-9 pl-8"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sovi-scroll min-h-0 flex-1 overflow-y-auto px-2 pb-4",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 py-6 text-center text-xs text-muted-foreground",
					children: "No conversations yet"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-0.5",
					children: filtered.map((c) => {
						const active = pathname === `/c/${c.id}`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("group flex items-center rounded-lg hover:bg-muted", active && "bg-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/c/$conversationId",
								params: { conversationId: c.id },
								onClick: onNavigate,
								className: "min-w-0 flex-1 px-2.5 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-1.5",
									children: [
										c.pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3 shrink-0 text-horizon" }) : null,
										c.favorite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 shrink-0 text-solar" }) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 truncate text-sm",
											children: c.title
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate text-[11px] text-muted-foreground",
									children: [formatRelativeTime(c.updatedAt), c.preview ? ` · ${c.preview}` : ""]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConvMenu, { id: c.id })]
						}) }, c.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 border-t border-border px-2 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountChip, {})
			})
		]
	});
}
function AccountChip() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 items-center gap-2 px-1 py-0.5",
		children: [user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: user.profileImageUrl,
			alt: "",
			className: "size-8 shrink-0 rounded-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-8 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium",
			children: label.charAt(0).toUpperCase()
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium leading-tight",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "text-xs text-muted-foreground hover:text-foreground disabled:opacity-60",
				children: signingOut ? "Signing out…" : "Sign out"
			})]
		})]
	});
}
function ConvMenu({ id }) {
	const togglePin = useSovi((s) => s.togglePin);
	const toggleFavorite = useSovi((s) => s.toggleFavorite);
	const archive = useSovi((s) => s.archiveConversation);
	const del = useSovi((s) => s.deleteConversation);
	const rename = useSovi((s) => s.renameConversation);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon-sm",
			className: "opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100",
			"aria-label": "Conversation menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => togglePin(id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3.5" }), " Pin"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => toggleFavorite(id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5" }), " Favorite"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				onClick: () => {
					const next = window.prompt("Rename conversation");
					if (next) rename(id, next);
				},
				children: "Rename"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => archive(id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-3.5" }), " Archive"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => del(id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Delete"]
			})
		]
	})] });
}
var Tabs = Root2$1;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex items-center gap-1 rounded-xl bg-muted/70 p-1", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, {
		className: cn("inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-[var(--shadow-border)]", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-3 focus-visible:outline-none", className),
		...props
	});
}
function RightPanel() {
	const panel = useSovi((s) => s.rightPanel);
	const setPanel = useSovi((s) => s.setRightPanel);
	const artifactId = useSovi((s) => s.activeArtifactId);
	const artifacts = useSovi((s) => s.artifacts);
	const recentEvents = useSovi((s) => s.recentEvents);
	const allJobs = useSovi((s) => s.jobs);
	const artifact = artifacts.find((a) => a.id === artifactId) ?? artifacts[0];
	const events = recentEvents.slice(0, 24);
	const jobs = allJobs.slice(0, 8);
	if (panel === "closed") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full w-[min(24rem,100%)] flex-col border-l border-border bg-card/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Workspace"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": "Close panel",
				onClick: () => setPanel("closed"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: panel === "activity" ? "activity" : panel === "system" ? "system" : "artifact",
			className: "flex min-h-0 flex-1 flex-col px-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "artifact",
							className: "flex-1",
							onClick: () => setPanel("artifact"),
							children: "Artifact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "activity",
							className: "flex-1",
							onClick: () => setPanel("activity"),
							children: "Activity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "system",
							className: "flex-1",
							onClick: () => setPanel("system"),
							children: "System"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "artifact",
					className: "sovi-scroll min-h-0 flex-1 overflow-y-auto pb-6",
					children: !artifact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "Artifacts from this conversation appear here." }) : artifact.kind === "image" && artifact.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: artifact.url,
						alt: artifact.title,
						className: "w-full rounded-xl"
					}) : artifact.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: artifact.title
					}), artifact.language ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto rounded-xl p-3 text-xs shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: artifact.content })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMarkdown, { content: artifact.content })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: artifact.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "activity",
					className: "sovi-scroll min-h-0 flex-1 overflow-y-auto pb-6",
					children: events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "Tool and agent activity will show up as Sovi works." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-2",
						children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-lg px-2 py-1.5 text-xs shadow-[var(--shadow-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: eventLabel(e.type)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-muted-foreground",
									children: formatRelativeTime(e.ts)
								})]
							})
						}, e.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "system",
					className: "sovi-scroll min-h-0 flex-1 overflow-y-auto pb-6",
					children: jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "Generation jobs and service health live in System." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									j.kind,
									" · ",
									j.status
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: j.prompt.slice(0, 80)
							})]
						}, j.id))
					})
				})
			]
		})]
	});
}
function Empty({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-1 py-8 text-center text-sm text-muted-foreground",
		children: text
	});
}
function getRecognition() {
	if (typeof window === "undefined") return null;
	const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
	if (!Ctor) return null;
	return new Ctor();
}
function VoiceMode() {
	const open = useSovi((s) => s.voiceMode);
	const setOpen = useSovi((s) => s.setVoiceMode);
	const presence = useSovi((s) => s.presence);
	const send = useSovi((s) => s.sendMessage);
	const speak = useSovi((s) => s.speak);
	const flags = useSovi((s) => s.flags);
	const [transcript, setTranscript] = (0, import_react.useState)("");
	const [listening, setListening] = (0, import_react.useState)(false);
	const recRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) {
			recRef.current?.stop();
			setListening(false);
			return;
		}
		const rec = getRecognition();
		recRef.current = rec;
		if (!rec) return;
		rec.onresult = (ev) => {
			const last = ev.results[ev.results.length - 1];
			if (!last) return;
			const text = last[0].transcript;
			setTranscript(text);
			if (last.isFinal) {
				setListening(false);
				rec.stop();
				(async () => {
					const cid = await send({ text });
					const lastA = [...useSovi.getState().messagesByConversation[cid] ?? []].reverse().find((m) => m.role === "assistant" && m.status === "complete");
					if (lastA?.content) await speak(lastA.content.replace(/[#*`]/g, "").slice(0, 600));
				})();
			}
		};
		return () => rec.stop();
	}, [
		open,
		send,
		speak
	]);
	if (!open || !flags.voice) return null;
	const start = () => {
		setTranscript("");
		setListening(true);
		recRef.current?.start();
	};
	const stop = () => {
		recRef.current?.stop();
		setListening(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-background pt-safe",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				"aria-label": "Close voice",
				onClick: () => setOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `sovi-presence-${listening ? "listening" : presence}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMark, { size: 64 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizonWave, {
					active: listening || presence === "speaking",
					className: "w-full max-w-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-h-12 max-w-md text-center text-lg text-foreground",
					children: transcript || (listening ? "Listening…" : presence === "speaking" ? "Speaking…" : "Tap the microphone")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "size-16 rounded-full",
					variant: listening ? "secondary" : "default",
					"aria-label": listening ? "Stop listening" : "Start listening",
					onClick: () => listening ? stop() : start(),
					children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-6" })
				})
			]
		})]
	});
}
function Cockpit() {
	const init = useSovi((s) => s.init);
	const setOwner = useSovi((s) => s.setOwner);
	const ready = useSovi((s) => s.ready);
	const user = useCurrentUser();
	(0, import_react.useEffect)(() => {
		if (user?.id) setOwner(user.id);
		init();
	}, [
		init,
		setOwner,
		user?.id
	]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviWordmark, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
		delayDuration: 250,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CockpitShell, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceMode, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-right",
				theme: "system"
			})
		]
	});
}
function CockpitShell() {
	const sidebarOpen = useSovi((s) => s.sidebarOpen);
	const setSidebar = useSovi((s) => s.setSidebarOpen);
	const mobileNav = useSovi((s) => s.mobileNavOpen);
	const setMobileNav = useSovi((s) => s.setMobileNavOpen);
	const rightPanel = useSovi((s) => s.rightPanel);
	const setRight = useSovi((s) => s.setRightPanel);
	const theme = useSovi((s) => s.theme);
	const setTheme = useSovi((s) => s.setTheme);
	const presence = useSovi((s) => s.presence);
	const power = useSovi((s) => s.powerMode);
	const setPower = useSovi((s) => s.setPowerMode);
	const flags = useSovi((s) => s.flags);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const conversations = useSovi((s) => s.conversations);
	const title = pathname === "/" ? "Sovi" : pathname.startsWith("/c/") ? conversations.find((c) => pathname.endsWith(c.id))?.title ?? "Sovi" : NAV_ITEMS.find((n) => n.to !== "/" && pathname.startsWith(n.to))?.label ?? "Sovi";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: cn("hidden h-full shrink-0 border-r border-border transition-[width] duration-200 md:block", sidebarOpen ? "w-64" : "w-0 overflow-hidden border-0"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobileNav,
				onOpenChange: setMobileNav,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "left",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { onNavigate: () => setMobileNav(false) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center gap-2 border-b border-border px-2 py-1.5 pt-safe md:px-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								className: "md:hidden",
								"aria-label": "Open menu",
								onClick: () => setMobileNav(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								className: "hidden md:inline-flex",
								"aria-label": "Toggle sidebar",
								onClick: () => setSidebar(!sidebarOpen),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "min-w-0 flex-1 truncate text-sm font-medium",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceChip, { presence }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: power ? "secondary" : "ghost",
								size: "sm",
								className: "hidden h-8 sm:inline-flex",
								onClick: () => setPower(!power),
								children: power ? "Power" : "Simple"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Toggle theme",
								onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
								children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								className: "hidden lg:inline-flex",
								"aria-label": "Toggle workspace",
								onClick: () => setRight(rightPanel === "closed" ? "artifact" : "closed"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRight, { className: "size-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "relative min-h-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileTabBar, {
						pathname,
						flags,
						navigate
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("hidden h-full lg:block", rightPanel === "closed" && "lg:hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightPanel, {})
			})
		]
	});
}
function MobileTabBar({ pathname, flags, navigate }) {
	const items = NAV_ITEMS.filter((n) => n.show(flags)).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex border-t border-border pb-safe md:hidden",
		children: items.map((item) => {
			const active = item.to === "/" ? pathname === "/" || pathname.startsWith("/c/") : pathname.startsWith(item.to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				className: cn("flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] text-muted-foreground", active && "text-foreground"),
				onClick: () => void navigate({ to: item.to }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
			}, item.to);
		})
	});
}
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cockpit, {}) });
}
//#endregion
export { AppLayout as component };

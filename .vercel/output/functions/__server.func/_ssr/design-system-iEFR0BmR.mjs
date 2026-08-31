import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn, t as Button } from "./identity-CICsh5Ac.mjs";
import { n as SoviWordmark, t as SoviMark } from "./mark-BCKiqoxL.mjs";
import { i as Progress, n as Badge, r as JobCard, t as ArtifactCard } from "./use-talk-zdfXDLPZ.mjs";
import { n as Composer, t as ActivityList } from "./activity-DS9g0MYU.mjs";
import { t as Input } from "./input-BoH9r0aw.mjs";
import { n as PresenceChip, r as RequireAuth, t as HorizonWave } from "./require-auth-BH3RcwE5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/design-system-iEFR0BmR.js
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-muted", className),
		...props
	});
}
function DesignSystemLab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-background px-6 py-10 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl space-y-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Internal · not in product nav"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviWordmark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold tracking-tight",
							children: "Design lab"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Component states for future Sovi coding/design agents.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "text-horizon underline",
									children: "Back to cockpit"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Mark & presence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMark, { size: 40 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceChip, { presence: "idle" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceChip, { presence: "listening" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceChip, { presence: "thinking" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceChip, { presence: "acting" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizonWave, {
							active: true,
							className: "max-w-xs"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Buttons"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								children: "Secondary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								children: "Outline"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								children: "Ghost"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								children: "Destructive"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Inputs & status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "Talk to Sovi" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Default" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "horizon",
									children: "Horizon"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "success",
									children: "Available"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "warning",
									children: "Degraded"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "destructive",
									children: "Error"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: 62 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Activity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityList, { activities: [{
						id: "1",
						kind: "tool",
						title: "Searching the web",
						detail: "personal AI OS",
						state: "completed",
						startedAt: Date.now() - 8e3,
						completedAt: Date.now()
					}, {
						id: "2",
						kind: "agent",
						title: "Builder agent",
						detail: "Writing prototype.ts",
						state: "coding",
						progress: 55,
						startedAt: Date.now()
					}] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Artifacts & jobs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, { job: {
							id: "j1",
							kind: "image",
							prompt: "Quiet workshop at sunrise",
							status: "processing",
							progress: 48,
							createdAt: Date.now(),
							updatedAt: Date.now()
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactCard, { artifact: {
							id: "a1",
							kind: "report",
							title: "Landscape note",
							description: "Research artifact",
							createdAt: Date.now()
						} })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Composer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, { compact: true })]
				})
			]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesignSystemLab, {}) });
//#endregion
export { SplitComponent as component };

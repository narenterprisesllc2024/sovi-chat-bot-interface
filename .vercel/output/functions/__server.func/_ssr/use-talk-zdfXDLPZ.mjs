import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { D as Film, I as Box, O as FileText, T as Image, j as CodeXml, v as Music } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { o as cn } from "./identity-CICsh5Ac.mjs";
import { a as useSovi } from "./mark-BCKiqoxL.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-talk-zdfXDLPZ.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-muted text-muted-foreground",
		horizon: "border-transparent bg-horizon-soft text-horizon",
		success: "border-transparent bg-success/15 text-success",
		warning: "border-transparent bg-warning/15 text-warning",
		destructive: "border-transparent bg-destructive/15 text-destructive",
		outline: "border-border text-muted-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-muted", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "h-full bg-horizon transition-transform duration-300 ease-out",
			style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
		})
	});
}
var ICONS = {
	image: Image,
	video: Film,
	audio: Music,
	code: CodeXml,
	document: FileText,
	report: FileText,
	cad: Box
};
function ArtifactCard({ artifact, compact }) {
	const setActive = useSovi((s) => s.setActiveArtifact);
	const Icon = ICONS[artifact.kind] ?? FileText;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setActive(artifact.id),
		className: cn("group overflow-hidden rounded-xl bg-card text-left shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover,var(--shadow-elevated))]", compact ? "w-full" : "w-full max-w-sm"),
		children: [artifact.kind === "image" && artifact.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: artifact.url,
			alt: artifact.title,
			className: "aspect-[4/3] w-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-9 items-center justify-center rounded-lg bg-muted text-horizon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-sm font-medium",
					children: artifact.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-xs text-muted-foreground",
					children: artifact.description || artifact.kind
				})]
			})]
		}), artifact.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-3 py-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium",
				children: artifact.title
			})
		}) : null]
	});
}
function JobCard({ job }) {
	const done = job.status === "completed";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
		children: [job.resultUrl && job.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: job.resultUrl,
			alt: job.prompt,
			className: "aspect-[4/3] w-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex aspect-[16/7] items-center justify-center bg-muted/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: done ? job.kind : `${job.status} · ${job.progress}%`
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2 px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-xs text-muted-foreground",
					children: job.prompt
				}),
				job.status !== "completed" && job.status !== "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: job.progress }) : null,
				job.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-destructive",
					children: job.error
				}) : null
			]
		})]
	});
}
function useTalkToSovi() {
	const send = useSovi((s) => s.sendMessage);
	const navigate = useNavigate();
	return async (opts) => {
		const id = await send(opts);
		if (id) navigate({
			to: "/c/$conversationId",
			params: { conversationId: id }
		});
		return id;
	};
}
//#endregion
export { useTalkToSovi as a, Progress as i, Badge as n, JobCard as r, ArtifactCard as t };

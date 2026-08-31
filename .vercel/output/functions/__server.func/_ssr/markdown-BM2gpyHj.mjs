import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as Copy, N as Check } from "../_libs/lucide-react.mjs";
import { o as cn } from "./identity-CICsh5Ac.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
import { t as remarkGfm } from "../_libs/remark-gfm.mjs";
import { t as rehypeHighlight } from "../_libs/rehype-highlight.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markdown-BM2gpyHj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CodeBlock({ className, children, ...props }) {
	const text = String(children ?? "").replace(/\n$/, "");
	const isBlock = Boolean(className) || text.includes("\n");
	const [copied, setCopied] = (0, import_react.useState)(false);
	if (!isBlock) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
		className,
		...props,
		children
	});
	const lang = /language-([\w-]+)/.exec(className ?? "")?.[1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-2 top-2 z-10 flex items-center gap-2",
			children: [lang ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] uppercase tracking-wide text-muted-foreground",
				children: lang
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100",
				onClick: async () => {
					await navigator.clipboard.writeText(text);
					setCopied(true);
					setTimeout(() => setCopied(false), 1200);
				},
				"aria-label": "Copy code",
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className,
			...props,
			children
		}) })]
	});
}
function SoviMarkdown({ content, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("sovi-md", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeHighlight],
			components: {
				code: CodeBlock,
				a: ({ href, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href,
					target: "_blank",
					rel: "noreferrer",
					children
				})
			},
			children: content
		})
	});
}
//#endregion
export { SoviMarkdown as t };

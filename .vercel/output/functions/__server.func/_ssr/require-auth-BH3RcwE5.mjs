import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn } from "./identity-CICsh5Ac.mjs";
import { n as SoviWordmark, t as SoviMark } from "./mark-BCKiqoxL.mjs";
import { n as useCurrentUserState } from "./use-current-user-ChjRQma5.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	idle: "Ready",
	listening: "Listening",
	thinking: "Thinking",
	acting: "Working",
	speaking: "Speaking",
	waiting: "Waiting"
};
function PresenceChip({ presence }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-1 text-[11px] text-muted-foreground", `sovi-presence-${presence}`),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviMark, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: LABELS[presence]
		})]
	});
}
function HorizonWave({ active, bars = 18, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-16 items-end justify-center gap-1", className),
		"aria-hidden": true,
		children: Array.from({ length: bars }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-1 origin-bottom rounded-full bg-horizon",
			style: {
				height: "100%",
				transform: `scaleY(${active ? .35 + i * 3 % 7 / 10 : .18})`,
				animation: active ? `sovi-wave ${.7 + i % 5 * .12}s ease-in-out ${i * .04}s infinite` : "none",
				opacity: active ? .85 : .35
			}
		}, i))
	});
}
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
function RequireAuth({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoviWordmark, {})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { PresenceChip as n, RequireAuth as r, HorizonWave as t };

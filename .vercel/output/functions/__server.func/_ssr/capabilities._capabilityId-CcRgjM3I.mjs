import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as Route$5 } from "./router-whRR0vXu.mjs";
import { a as CapabilityDetail } from "./pages-BhZDGwuS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/capabilities._capabilityId-CcRgjM3I.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { capabilityId } = Route$5.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapabilityDetail, { capabilityId });
}
//#endregion
export { Page as component };

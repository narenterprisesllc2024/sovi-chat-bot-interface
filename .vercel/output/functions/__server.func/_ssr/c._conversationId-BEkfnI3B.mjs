import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as Route$7 } from "./router-whRR0vXu.mjs";
import { t as ConversationView } from "./conversation-view-kOtRLl-H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/c._conversationId-BEkfnI3B.js
var import_jsx_runtime = require_jsx_runtime();
function ConversationPage() {
	const { conversationId } = Route$7.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationView, { conversationId });
}
//#endregion
export { ConversationPage as component };

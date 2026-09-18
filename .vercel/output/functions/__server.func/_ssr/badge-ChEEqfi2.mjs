import { t as cn } from "./utils-Bo3g1IAu.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-ChEEqfi2.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", tone === "muted" && "bg-raised text-muted", tone === "sage" && "bg-sage/15 text-sage", tone === "warn" && "bg-warn/15 text-warn", tone === "paper" && "bg-primary/10 text-primary", className),
		children
	});
}
//#endregion
export { Badge as t };

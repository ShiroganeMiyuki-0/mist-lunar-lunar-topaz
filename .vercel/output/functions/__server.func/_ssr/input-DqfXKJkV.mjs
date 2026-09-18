import "../_runtime.mjs";
import { t as cn } from "./utils-Bo3g1IAu.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("focus-ring flex h-11 w-full rounded-lg bg-raised px-3 text-base text-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle disabled:opacity-40", className),
		...props
	});
}
//#endregion
export { Input as t };

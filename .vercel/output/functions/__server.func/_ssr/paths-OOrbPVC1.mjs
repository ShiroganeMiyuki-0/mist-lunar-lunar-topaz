import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-Bo3g1IAu.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAppStore } from "./store-DSxzbGOy.mjs";
import { n as PATHS } from "./paths-DrohK9HS.mjs";
import { n as rankPaths } from "./matching-IF_YsjHk.mjs";
import { t as Badge } from "./badge-ChEEqfi2.mjs";
import { t as PathDetail } from "./path-detail-ffYBAN8t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paths-OOrbPVC1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "today",
		label: "Today"
	},
	{
		id: "this-week",
		label: "This week"
	},
	{
		id: "steady",
		label: "Steady"
	},
	{
		id: "owed",
		label: "Owed"
	}
];
function PathsPage() {
	const profile = useAppStore((s) => s.profile);
	const ranked = (0, import_react.useMemo)(() => rankPaths(profile), [profile]);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [pathId, setPathId] = (0, import_react.useState)(null);
	const visible = ranked.filter((r) => filter === "all" || r.path.category === filter);
	const path = PATHS.find((p) => p.id === pathId) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.2em] text-subtle uppercase",
			children: "Paths"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-4xl tracking-tight",
			children: "Honest ways to get paid."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-md text-muted",
			children: "Ranked for your skills and constraints. Not a live job board. A playbook with first actions, scripts, and real platforms."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex gap-2 overflow-x-auto pb-1",
			children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(f.id),
				className: cn("h-10 shrink-0 rounded-full px-4 text-sm", filter === f.id ? "bg-primary text-primary-fg" : "hairline text-muted"),
				children: f.label
			}, f.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-2",
			children: visible.map(({ path: p, score }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setPathId(p.id),
				className: "flex w-full items-start justify-between gap-4 rounded-2xl bg-surface p-4 text-left hairline hairline-hover",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs tracking-widest text-subtle uppercase",
							children: p.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block font-medium",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted",
							children: p.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "paper",
								children: p.speed
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "sage",
								children: p.pay
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "shrink-0",
					children: score
				})]
			}) }, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathDetail, {
			path,
			score: path ? ranked.find((r) => r.path.id === path.id)?.score : void 0,
			open: !!path,
			onOpenChange: (v) => {
				if (!v) setPathId(null);
			}
		})
	] });
}
//#endregion
export { PathsPage as component };

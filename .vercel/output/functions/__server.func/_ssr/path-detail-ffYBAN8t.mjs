import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAppStore, t as Button } from "./store-DSxzbGOy.mjs";
import { c as Copy, d as Check, s as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-ChEEqfi2.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-alJhITqc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path-detail-ffYBAN8t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CopyButton({ text, label = "Copy" }) {
	const [ok, setOk] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick: async () => {
			try {
				await navigator.clipboard.writeText(text);
				setOk(true);
				window.setTimeout(() => setOk(false), 1400);
			} catch {}
		},
		children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), ok ? "Copied" : label]
	});
}
function PathDetail({ path, score, open, onOpenChange }) {
	const addPipeline = useAppStore((s) => s.addPipeline);
	if (!path) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-y-auto pr-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-subtle uppercase",
					children: path.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "mt-2",
					children: path.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-2 text-base text-muted",
					children: path.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "paper",
							children: path.speed
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "sage",
							children: path.pay
						}),
						typeof score === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Match ", score] }) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs tracking-widest text-subtle uppercase",
						children: "You need"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm text-muted",
						children: path.requirements.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-subtle" }), r]
						}, r))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs tracking-widest text-subtle uppercase",
						children: "How to start"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 space-y-5",
						children: path.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[auto_1fr] gap-x-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg text-sage tabular-nums",
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: step.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: step.body
							})] })]
						}, step.title))
					})]
				}),
				path.script ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8 rounded-2xl bg-raised p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: path.script.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { text: path.script.body })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-3 font-sans text-sm leading-relaxed whitespace-pre-wrap text-muted",
						children: path.script.body
					})]
				}) : null,
				path.warning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-warn",
					children: path.warning
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-col gap-2",
					children: path.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: l.href,
						target: "_blank",
						rel: "noreferrer",
						className: "flex h-11 items-center justify-between rounded-lg bg-raised px-3 text-sm hairline",
						children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 text-subtle" })]
					}, l.href))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex gap-2 border-t border-line pt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "flex-1",
				onClick: () => {
					addPipeline({
						title: path.firstAction,
						pathId: path.id,
						kind: path.category === "owed" ? "benefit" : path.id === "sell-stuff" ? "sale" : path.category === "steady" ? "job" : "gig",
						status: "started"
					});
					onOpenChange(false);
				},
				children: "Start this — add to pipeline"
			})
		})] })
	});
}
//#endregion
export { PathDetail as t };

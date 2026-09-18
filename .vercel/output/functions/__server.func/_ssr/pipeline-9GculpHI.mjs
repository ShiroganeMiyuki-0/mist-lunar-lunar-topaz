import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-Bo3g1IAu.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAppStore, t as Button } from "./store-DSxzbGOy.mjs";
import { t as Input } from "./input-DqfXKJkV.mjs";
import { n as money, r as shortDate } from "./format-D5HUu2i0.mjs";
import { t as Badge } from "./badge-ChEEqfi2.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-alJhITqc.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pipeline-9GculpHI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "queued",
		label: "Queued"
	},
	{
		id: "started",
		label: "Started"
	},
	{
		id: "waiting",
		label: "Waiting"
	},
	{
		id: "paid",
		label: "Paid"
	},
	{
		id: "dead",
		label: "Dead"
	}
];
var KINDS = [
	"gig",
	"job",
	"sale",
	"benefit",
	"other"
];
function PipelinePage() {
	const pipeline = useAppStore((s) => s.pipeline);
	const addPipeline = useAppStore((s) => s.addPipeline);
	const setStatus = useAppStore((s) => s.setPipelineStatus);
	const remove = useAppStore((s) => s.removePipeline);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("gig");
	const [expected, setExpected] = (0, import_react.useState)("");
	const [payId, setPayId] = (0, import_react.useState)(null);
	const [earned, setEarned] = (0, import_react.useState)("");
	const visible = pipeline.filter((p) => filter === "all" || p.status === filter);
	function add() {
		if (!title.trim()) return;
		addPipeline({
			title: title.trim(),
			kind,
			expected: expected ? Number(expected) : void 0,
			status: "queued"
		});
		setTitle("");
		setExpected("");
		setOpen(false);
		toast("Added to the pipeline");
	}
	function markPaid() {
		if (!payId) return;
		const n = Number(earned) || 0;
		setStatus(payId, "paid", n);
		setPayId(null);
		setEarned("");
		toast(n ? `Logged ${money(n)}` : "Marked paid");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-subtle uppercase",
				children: "Pipeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl tracking-tight",
				children: "Things in motion."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setOpen(true),
				children: "Add"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-md text-muted",
			children: "Applications, listings, walk-ins, claims. If it is not here, it is a wish."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex gap-2 overflow-x-auto pb-1",
			children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(s.id),
				className: cn("h-10 shrink-0 rounded-full px-4 text-sm", filter === s.id ? "bg-primary text-primary-fg" : "hairline text-muted"),
				children: s.label
			}, s.id))
		}),
		visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 rounded-3xl bg-surface p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl tracking-tight",
				children: "Nothing moving yet."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Add a listing, an application, or a walk-in. Tomorrow’s follow-up needs a today."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-2",
			children: visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-2xl bg-surface p-4 hairline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							item.kind,
							" · ",
							shortDate(item.updatedAt),
							item.expected ? ` · expect ${money(item.expected)}` : "",
							item.earned ? ` · got ${money(item.earned)}` : ""
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: item.status === "paid" ? "sage" : item.status === "dead" ? "warn" : "muted",
						children: item.status
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						item.status !== "started" && item.status !== "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setStatus(item.id, "started"),
							children: "Started"
						}) : null,
						item.status !== "waiting" && item.status !== "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setStatus(item.id, "waiting"),
							children: "Waiting"
						}) : null,
						item.status !== "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								setPayId(item.id);
								setEarned(item.expected ? String(item.expected) : "");
							},
							children: "Paid"
						}) : null,
						item.status !== "dead" && item.status !== "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setStatus(item.id, "dead"),
							children: "Dead"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							className: "text-subtle",
							onClick: () => remove(item.id),
							children: "Remove"
						})
					]
				})]
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add to pipeline" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1",
					children: "A listing, application, walk-in, or claim."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-6 block text-xs tracking-widest text-subtle uppercase",
					children: "Title"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-2",
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "DoorDash application"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-xs tracking-widest text-subtle uppercase",
					children: "Kind"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setKind(k),
						className: cn("h-10 rounded-full px-3 text-sm capitalize", kind === k ? "bg-primary text-primary-fg" : "hairline"),
						children: k
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-xs tracking-widest text-subtle uppercase",
					children: "Expected (optional)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-2",
					inputMode: "decimal",
					value: expected,
					onChange: (e) => setExpected(e.target.value),
					placeholder: "80"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full",
					onClick: add,
					children: "Add"
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!payId,
			onOpenChange: (v) => !v && setPayId(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Mark paid" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1",
					children: "This adds the amount to cash and this week’s income."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-6",
					inputMode: "decimal",
					value: earned,
					onChange: (e) => setEarned(e.target.value),
					placeholder: "0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full",
					onClick: markPaid,
					children: "Log it"
				})
			] })
		})
	] });
}
//#endregion
export { PipelinePage as component };

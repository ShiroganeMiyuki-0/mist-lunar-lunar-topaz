import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-Bo3g1IAu.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAppStore, t as Button } from "./store-DSxzbGOy.mjs";
import { t as Input } from "./input-DqfXKJkV.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as weekIncome, o as weekSpend, r as runwayDays, t as dailyBurn } from "./matching-IF_YsjHk.mjs";
import { n as money, r as shortDate, t as daysLabel } from "./format-D5HUu2i0.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-alJhITqc.mjs";
import { a as Tooltip, i as ResponsiveContainer, n as XAxis, r as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/runway-DA78CvYg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RunwayPage() {
	const profile = useAppStore((s) => s.profile);
	const ledger = useAppStore((s) => s.ledger);
	const patch = useAppStore((s) => s.patchProfile);
	const addLedger = useAppStore((s) => s.addLedger);
	const reset = useAppStore((s) => s.reset);
	const navigate = useNavigate();
	const [kind, setKind] = (0, import_react.useState)("income");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [source, setSource] = (0, import_react.useState)("");
	const [cash, setCash] = (0, import_react.useState)(String(profile.cash || ""));
	const [spend, setSpend] = (0, import_react.useState)(String(profile.weeklySpend || ""));
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const [chartReady, setChartReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setChartReady(true), []);
	const days = runwayDays(profile);
	const burn = dailyBurn(profile);
	const inWeek = weekIncome(ledger);
	const outWeek = weekSpend(ledger);
	const chart = (0, import_react.useMemo)(() => {
		const daysBack = 14;
		const now = /* @__PURE__ */ new Date();
		now.setHours(0, 0, 0, 0);
		return Array.from({ length: daysBack }, (_, i) => {
			const d = new Date(now);
			d.setDate(d.getDate() - (13 - i));
			const key = d.toISOString().slice(0, 10);
			const income = ledger.filter((e) => e.kind === "income" && e.at.slice(0, 10) === key).reduce((s, e) => s + e.amount, 0);
			return {
				day: d.toLocaleDateString("en-US", { weekday: "narrow" }),
				income
			};
		});
	}, [ledger]);
	function saveNumbers() {
		patch({
			cash: Number(cash) || 0,
			weeklySpend: Number(spend) || 0
		});
	}
	function log() {
		const n = Number(amount);
		if (!n || n <= 0) return;
		addLedger({
			amount: n,
			source: source.trim() || (kind === "income" ? "Income" : "Spend"),
			kind
		});
		setAmount("");
		setSource("");
		setCash(String((kind === "income" ? profile.cash + n : Math.max(0, profile.cash - n)).toFixed(0)));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.2em] text-subtle uppercase",
			children: "Runway"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-4xl tracking-tight",
			children: "How long the quiet lasts."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-md text-muted",
			children: "Cash divided by a typical week. Log money in and out so the number is not a story you tell yourself."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 rounded-3xl bg-surface p-5 md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-5xl leading-none tracking-tight tabular-nums",
					children: daysLabel(days)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: burn > 0 ? `${money(burn)} a day at current spend` : "Set a weekly spend to see days left"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "This week in",
						value: money(inWeek),
						sage: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Extra out logged",
						value: money(outWeek)
					})]
				}),
				chart.some((d) => d.income > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 h-36",
					children: chartReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chart,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "day",
									tick: {
										fill: "var(--color-subtle)",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									cursor: { fill: "color-mix(in oklab, var(--color-fg) 4%, transparent)" },
									contentStyle: {
										background: "var(--color-raised)",
										border: "1px solid var(--color-line)",
										borderRadius: 12,
										color: "var(--color-fg)"
									},
									formatter: (v) => [money(Number(v ?? 0)), "In"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "income",
									fill: "var(--color-sage)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					}) : null
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Log money"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setKind("income"),
						className: cn("h-11 rounded-xl", kind === "income" ? "bg-sage text-primary-fg" : "hairline text-muted"),
						children: "Came in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setKind("expense"),
						className: cn("h-11 rounded-xl", kind === "expense" ? "bg-danger/20 text-danger" : "hairline text-muted"),
						children: "Went out"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "decimal",
							placeholder: "Amount",
							value: amount,
							onChange: (e) => setAmount(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: kind === "income" ? "DoorDash, Marketplace…" : "Groceries, transit…",
							value: source,
							onChange: (e) => setSource(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: log,
							children: "Log"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "The two numbers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tracking-widest text-subtle uppercase",
						children: "Cash on hand"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-2",
						inputMode: "decimal",
						value: cash,
						onChange: (e) => setCash(e.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tracking-widest text-subtle uppercase",
						children: "Weekly spend"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-2",
						inputMode: "decimal",
						value: spend,
						onChange: (e) => setSpend(e.target.value)
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: "outline",
					onClick: saveNumbers,
					children: "Save numbers"
				})
			]
		}),
		ledger.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-tight",
				children: "Ledger"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line",
				children: ledger.slice(0, 12).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block",
						children: e.source
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-subtle",
						children: shortDate(e.at)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("tabular-nums", e.kind === "income" ? "text-sage" : "text-danger"),
						children: [e.kind === "income" ? "+" : "−", money(e.amount)]
					})]
				}, e.id))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-12 text-xs text-subtle hover:text-muted",
			onClick: () => setConfirmReset(true),
			children: "Reset this device’s data"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: confirmReset,
			onOpenChange: setConfirmReset,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Start over?" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-2",
					children: "This only lives on this device. Resetting returns you to the first questions."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full",
					variant: "danger",
					onClick: () => {
						reset();
						navigate({ to: "/start" });
					},
					children: "Reset"
				})
			] })
		})
	] });
}
function Stat({ label, value, sage }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-raised p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-1 font-display text-2xl tabular-nums", sage && "text-sage"),
			children: value
		})]
	});
}
//#endregion
export { RunwayPage as component };

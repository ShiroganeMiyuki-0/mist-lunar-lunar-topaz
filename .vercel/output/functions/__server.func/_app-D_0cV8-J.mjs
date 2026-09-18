import { i as __toESM } from "./_runtime.mjs";
import { n as todayKey, t as cn } from "./_ssr/utils-Bo3g1IAu.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as useAppStore } from "./_ssr/store-DSxzbGOy.mjs";
import { n as PATHS } from "./_ssr/paths-DrohK9HS.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { d as Check, u as ChevronRight } from "./_libs/lucide-react.mjs";
import { a as weekIncome, i as todaysMoves, n as rankPaths, r as runwayDays } from "./_ssr/matching-IF_YsjHk.mjs";
import { n as money, t as daysLabel } from "./_ssr/format-D5HUu2i0.mjs";
import { t as Badge } from "./_ssr/badge-ChEEqfi2.mjs";
import { t as PathDetail } from "./_ssr/path-detail-ffYBAN8t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-D_0cV8-J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Progress({ value, className }) {
	const v = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-raised", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-sage transition-[width] duration-300 ease-out",
			style: { width: `${v}%` }
		})
	});
}
function TodayPage() {
	const profile = useAppStore((s) => s.profile);
	const pipeline = useAppStore((s) => s.pipeline);
	const ledger = useAppStore((s) => s.ledger);
	const done = useAppStore((s) => s.done);
	const markMove = useAppStore((s) => s.markMove);
	const [pathId, setPathId] = (0, import_react.useState)(null);
	const days = runwayDays(profile);
	const moves = (0, import_react.useMemo)(() => todaysMoves(profile, pipeline), [profile, pipeline]);
	const day = todayKey();
	const completedToday = moves.filter((m) => done.some((d) => d.moveId === m.id && d.day === day)).length;
	const earned = weekIncome(ledger);
	const ranked = rankPaths(profile).slice(0, 3);
	const path = PATHS.find((p) => p.id === pathId) ?? null;
	const greeting = profile.name ? `${profile.name}.` : "You.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "reveal text-xs tracking-[0.2em] text-subtle uppercase",
			children: "Today"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "reveal reveal-2 mt-3 font-display text-4xl leading-tight tracking-tight md:text-5xl",
			children: [greeting, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block italic text-muted",
				children: (!Number.isFinite(days) ? false : days < 10) ? "First dollar before theory." : "A short list. Then rest."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "reveal reveal-3 mt-10 rounded-3xl bg-surface p-5 md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-subtle uppercase",
							children: "Runway"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-5xl leading-none tracking-tight tabular-nums",
							children: daysLabel(days)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted",
							children: [
								money(profile.cash),
								" on hand · ",
								money(profile.weeklySpend),
								" a week"
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/runway",
						className: "flex size-11 items-center justify-center rounded-lg text-muted hover:bg-raised hover:text-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-raised p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "In this week"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl text-sage tabular-nums",
							children: money(earned)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-raised p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "Today’s moves"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-2xl tabular-nums",
							children: [
								completedToday,
								"/",
								moves.length
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					className: "mt-5",
					value: moves.length ? completedToday / moves.length * 100 : 0
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "reveal reveal-4 mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Three moves"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: "Not five. Not twenty."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 space-y-3",
				children: moves.map((move, i) => {
					const isDone = done.some((d) => d.moveId === move.id && d.day === day);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("flex items-start gap-4 rounded-2xl bg-surface p-4 hairline", isDone && "opacity-60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => markMove(move.id, day),
							className: cn("mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full", isDone ? "bg-sage text-primary-fg" : "bg-raised text-muted"),
							"aria-label": isDone ? "Completed" : "Mark done",
							children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display tabular-nums",
								children: i + 1
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-subtle uppercase",
									children: move.kicker
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("mt-1 font-medium", isDone && "line-through"),
									children: move.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: move.detail
								}),
								move.pathId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "mt-2 min-h-11 text-sm text-sage",
									onClick: () => setPathId(move.pathId ?? null),
									children: "Open path"
								}) : null
							]
						})]
					}, move.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Best fits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/paths",
					className: "inline-flex h-11 items-center text-sm text-muted hover:text-fg",
					children: "All paths"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-2",
				children: ranked.map(({ path: p, score }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setPathId(p.id),
					className: "flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-4 text-left hairline hairline-hover",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 block text-sm text-muted",
						children: [
							p.speed,
							" · ",
							p.pay
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "sage",
						children: score
					})]
				}) }, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathDetail, {
			path,
			score: path ? rankPaths(profile).find((r) => r.path.id === path.id)?.score : void 0,
			open: !!path,
			onOpenChange: (v) => {
				if (!v) setPathId(null);
			}
		})
	] });
}
//#endregion
export { TodayPage as component };

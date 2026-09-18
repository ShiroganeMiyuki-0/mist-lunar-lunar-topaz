import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-Bo3g1IAu.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAppStore, t as Button } from "./store-DSxzbGOy.mjs";
import { i as SKILL_OPTIONS, r as SITUATIONS, t as CONSTRAINT_OPTIONS } from "./paths-DrohK9HS.mjs";
import { t as Input } from "./input-DqfXKJkV.mjs";
import { b as useNavigate, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ArrowRight, p as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-lleZzS3c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initial = {
	name: "",
	situation: "",
	cash: "",
	weeklySpend: "",
	hoursPerWeek: 15,
	energy: "medium",
	skills: ["phone"],
	constraints: [],
	goal: "both"
};
function Onboarding() {
	const onboarded = useAppStore((s) => s.profile.onboarded);
	const complete = useAppStore((s) => s.completeOnboarding);
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [draft, setDraft] = (0, import_react.useState)(initial);
	if (onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	const total = 6;
	const next = () => setStep((s) => Math.min(5, s + 1));
	const back = () => setStep((s) => Math.max(0, s - 1));
	function finish() {
		complete({
			name: draft.name.trim(),
			situation: draft.situation || "between",
			cash: Number(draft.cash) || 0,
			weeklySpend: Number(draft.weeklySpend) || 0,
			hoursPerWeek: draft.hoursPerWeek,
			energy: draft.energy,
			skills: draft.skills,
			constraints: draft.constraints,
			goal: draft.goal
		});
		navigate({ to: "/" });
	}
	function sample() {
		complete({
			name: "Sam",
			situation: "long-out",
			cash: 180,
			weeklySpend: 90,
			hoursPerWeek: 18,
			energy: "low",
			skills: [
				"phone",
				"computer",
				"stuff",
				"write",
				"clean"
			],
			constraints: [
				"no-car",
				"anxiety",
				"low-energy"
			],
			goal: "cash-now"
		});
		navigate({ to: "/" });
	}
	function toggleSkill(id) {
		setDraft((d) => ({
			...d,
			skills: d.skills.includes(id) ? d.skills.filter((s) => s !== id) : [...d.skills, id]
		}));
	}
	function toggleConstraint(id) {
		setDraft((d) => ({
			...d,
			constraints: d.constraints.includes(id) ? d.constraints.filter((s) => s !== id) : [...d.constraints, id]
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid min-h-dvh max-w-5xl md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-10 pb-8 md:max-w-none md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.2em] text-subtle uppercase",
						children: "Easy Street"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 h-px bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-px bg-primary transition-[width] duration-300 ease-out",
							style: { width: `${(step + 1) / total * 100}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col pt-10",
						children: [
							step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "font-display text-4xl leading-tight tracking-tight",
										children: ["No job. No training.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block italic text-muted",
											children: "Still need money."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-5 max-w-md text-muted",
										children: "Easy is not a lottery ticket. It is cash in the account, a short list, and enough runway to sleep. This builds that system around your actual life."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs tracking-widest text-subtle uppercase",
											children: "What should we call you"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "mt-2",
											placeholder: "First name, nickname, nothing",
											value: draft.name,
											onChange: (e) => setDraft({
												...draft,
												name: e.target.value
											})
										})]
									})
								]
							}),
							step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl tracking-tight",
										children: "Where are you, really?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted",
										children: "This changes the first three moves. Not a diagnosis."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-6 space-y-2",
										children: SITUATIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setDraft({
												...draft,
												situation: s.id
											}),
											className: cn("flex min-h-16 w-full flex-col items-start rounded-2xl px-4 py-3 text-left transition-[box-shadow,background-color] duration-150", draft.situation === s.id ? "bg-raised selected-ring" : "hairline hover:bg-raised"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: s.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-muted",
												children: s.blurb
											})]
										}, s.id))
									})
								]
							}),
							step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl tracking-tight",
										children: "How long does the money last?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted",
										children: "Cash on hand, and what a typical week of living costs. Guess if you have to. You can edit this later."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 grid gap-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs tracking-widest text-subtle uppercase",
												children: "Cash on hand"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "mt-2",
												inputMode: "decimal",
												placeholder: "180",
												value: draft.cash,
												onChange: (e) => setDraft({
													...draft,
													cash: e.target.value
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs tracking-widest text-subtle uppercase",
												children: "Typical week of spend"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "mt-2",
												inputMode: "decimal",
												placeholder: "90",
												value: draft.weeklySpend,
												onChange: (e) => setDraft({
													...draft,
													weeklySpend: e.target.value
												})
											})]
										})]
									})
								]
							}),
							step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl tracking-tight",
										children: "Hours and energy."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted",
										children: "We will not pretend you have forty heroic hours if you do not."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs tracking-widest text-subtle uppercase",
												children: "Hours this week"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-2xl tabular-nums",
												children: draft.hoursPerWeek
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: 4,
											max: 40,
											step: 1,
											value: draft.hoursPerWeek,
											onChange: (e) => setDraft({
												...draft,
												hoursPerWeek: Number(e.target.value)
											}),
											className: "mt-4 w-full accent-sage"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-8 grid grid-cols-3 gap-2",
										children: [
											"low",
											"medium",
											"high"
										].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setDraft({
												...draft,
												energy: e
											}),
											className: cn("h-12 rounded-xl capitalize", draft.energy === e ? "bg-primary text-primary-fg" : "hairline text-muted"),
											children: e
										}, e))
									})
								]
							}),
							step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl tracking-tight",
										children: "What you can actually do."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted",
										children: "Tap everything that is true enough. This is how paths get ranked."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-6 flex flex-wrap gap-2",
										children: SKILL_OPTIONS.map((s) => {
											const on = draft.skills.includes(s.id);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => toggleSkill(s.id),
												className: cn("h-11 rounded-full px-3.5 text-sm", on ? "bg-primary text-primary-fg" : "hairline text-muted"),
												children: s.label
											}, s.id);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-8 text-xs tracking-widest text-subtle uppercase",
										children: "In the way"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: CONSTRAINT_OPTIONS.map((s) => {
											const on = draft.constraints.includes(s.id);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => toggleConstraint(s.id),
												className: cn("h-11 rounded-full px-3.5 text-sm", on ? "bg-raised text-fg selected-ring" : "hairline text-muted"),
												children: s.label
											}, s.id);
										})
									})
								]
							}),
							step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reveal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl tracking-tight",
										children: "What does easy look like first?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted",
										children: "You can want both. We will still pick an order."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-6 space-y-2",
										children: [
											{
												id: "cash-now",
												label: "Cash this week",
												blurb: "Rent, food, stop the drop."
											},
											{
												id: "steady-job",
												label: "A real paycheck",
												blurb: "Slower. Cleaner. A schedule."
											},
											{
												id: "both",
												label: "Bridge, then a job",
												blurb: "Money now without dropping the longer path."
											}
										].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setDraft({
												...draft,
												goal: g.id
											}),
											className: cn("flex min-h-16 w-full flex-col items-start rounded-2xl px-4 py-3 text-left", draft.goal === g.id ? "bg-raised selected-ring" : "hairline"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: g.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-muted",
												children: g.blurb
											})]
										}, g.id))
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center gap-2",
						children: [step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: back,
							"aria-label": "Back",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "text-muted",
							onClick: sample,
							children: "Load a sample life"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "ml-auto min-w-36",
							onClick: step === 5 ? finish : next,
							children: [step === 5 ? "Open the street" : "Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden flex-col justify-end border-l border-line p-12 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl leading-tight tracking-tight italic text-muted",
					children: "The easy life is not luck. It is runway, then a paycheck, then quiet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-sm text-sm text-subtle",
					children: "No courses. No hustle sermons. A short list you can finish before dinner."
				})]
			})]
		})
	});
}
//#endregion
export { Onboarding as t };

import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-Bo3g1IAu.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAppStore, t as Button } from "./store-DSxzbGOy.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as localCoach } from "./local-coach-B2ITiEt1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-iSl9LDkO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("focus-ring flex min-h-28 w-full rounded-xl bg-raised px-3 py-3 text-base text-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle", className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askCoach = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("09631c84ea3924c35ab971089523b2ea04f44978367c3c7d162a69c939ec4a04"));
var STARTERS = [
	"What should I do in the next four hours?",
	"I have a laptop, no car, and low energy. What pays?",
	"Be honest. How do I get to an easy life from here?"
];
function CoachPage() {
	const profile = useAppStore((s) => s.profile);
	const pipeline = useAppStore((s) => s.pipeline);
	const coach = useAppStore((s) => s.coach);
	const addCoach = useAppStore((s) => s.addCoach);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function send(question) {
		const q = question.trim();
		if (!q || busy) return;
		setBusy(true);
		setText("");
		addCoach({
			role: "user",
			text: q
		});
		try {
			const res = await askCoach({ data: {
				profile,
				pipeline,
				question: q
			} });
			addCoach({
				role: "assistant",
				text: res.text
			});
		} catch {
			addCoach({
				role: "assistant",
				text: localCoach(profile, pipeline)
			});
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[70dvh] flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-subtle uppercase",
				children: "Coach"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl tracking-tight",
				children: "No pep talk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-muted",
				children: "Ask for the next four hours, not a five-year plan. If the live coach is out, you still get a local one built from your paths."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-1 flex-col gap-4",
				children: coach.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl tracking-tight",
						children: "Start here"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-2",
						children: STARTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => send(s),
							className: "block w-full rounded-2xl px-4 py-3 text-left text-sm hairline hairline-hover",
							children: s
						}, s))
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-4",
					children: [coach.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: t.role === "user" ? "ml-8 rounded-2xl bg-raised px-4 py-3 text-sm" : "mr-4 whitespace-pre-wrap rounded-2xl bg-surface px-4 py-3 text-sm leading-relaxed",
						children: t.text
					}, t.id)), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-subtle",
						children: "Thinking in specifics…"
					}) : null]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "sticky bottom-20 mt-6 space-y-2 bg-bg pt-2 md:bottom-0",
				onSubmit: (e) => {
					e.preventDefault();
					send(text);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "I have four hours and a closet full of junk…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					type: "submit",
					disabled: busy || !text.trim(),
					children: "Ask"
				})]
			})
		]
	});
}
//#endregion
export { CoachPage as component };

import "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as uid, t as cn } from "./utils-Bo3g1IAu.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-raised",
			outline: "bg-transparent text-fg hairline hairline-hover hover:bg-raised",
			sage: "bg-sage text-primary-fg hover:opacity-90",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var emptyProfile = {
	name: "",
	situation: "",
	cash: 0,
	weeklySpend: 0,
	hoursPerWeek: 15,
	energy: "medium",
	skills: ["phone"],
	constraints: [],
	goal: "both",
	onboarded: false,
	createdAt: ""
};
var useAppStore = create()(persist((set, get) => ({
	profile: emptyProfile,
	pipeline: [],
	ledger: [],
	done: [],
	coach: [],
	completeOnboarding: (profile) => set({ profile: {
		...profile,
		onboarded: true,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	} }),
	patchProfile: (patch) => set({ profile: {
		...get().profile,
		...patch
	} }),
	addPipeline: (item) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		set({ pipeline: [{
			...item,
			status: item.status ?? "queued",
			id: uid(),
			createdAt: now,
			updatedAt: now
		}, ...get().pipeline] });
	},
	setPipelineStatus: (id, status, earned) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const current = get().pipeline.find((p) => p.id === id);
		set({ pipeline: get().pipeline.map((p) => p.id === id ? {
			...p,
			status,
			earned: earned ?? p.earned,
			updatedAt: now
		} : p) });
		if (status === "paid" && earned && earned > 0) {
			if (!get().ledger.some((l) => l.source === `pipeline:${id}` && l.kind === "income")) get().addLedger({
				amount: earned,
				source: current?.title ? `Paid: ${current.title}` : "Pipeline payout",
				kind: "income"
			});
		}
	},
	removePipeline: (id) => set({ pipeline: get().pipeline.filter((p) => p.id !== id) }),
	addLedger: ({ amount, source, kind, at }) => {
		const entry = {
			id: uid(),
			amount,
			source,
			kind,
			at: at ?? (/* @__PURE__ */ new Date()).toISOString()
		};
		const cashDelta = kind === "income" ? amount : -amount;
		set({
			ledger: [entry, ...get().ledger],
			profile: {
				...get().profile,
				cash: Math.max(0, Math.round((get().profile.cash + cashDelta) * 100) / 100)
			}
		});
	},
	markMove: (moveId, day) => {
		if (get().done.some((d) => d.moveId === moveId && d.day === day)) return;
		set({ done: [...get().done, {
			moveId,
			day
		}] });
	},
	addCoach: (turn) => set({ coach: [...get().coach, {
		...turn,
		id: uid(),
		at: (/* @__PURE__ */ new Date()).toISOString()
	}].slice(-40) }),
	reset: () => set({
		profile: emptyProfile,
		pipeline: [],
		ledger: [],
		done: [],
		coach: []
	})
}), { name: "easy-street-v1" }));
//#endregion
export { useAppStore as n, Button as t };

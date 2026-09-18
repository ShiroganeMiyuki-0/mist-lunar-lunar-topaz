import { n as todayKey } from "./utils-Bo3g1IAu.mjs";
import { n as PATHS } from "./paths-DrohK9HS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matching-IF_YsjHk.js
function clamp(n, min = 0, max = 100) {
	return Math.max(min, Math.min(max, n));
}
function dailyBurn(profile) {
	if (profile.weeklySpend <= 0) return 0;
	return profile.weeklySpend / 7;
}
function runwayDays(profile) {
	const burn = dailyBurn(profile);
	if (burn <= 0) return profile.cash > 0 ? Infinity : 0;
	return profile.cash / burn;
}
function scorePath(path, profile) {
	let score = path.base;
	if (path.needsAll.some((s) => !profile.skills.includes(s))) score -= 28;
	if (path.needsAny.length && !path.needsAny.some((s) => profile.skills.includes(s))) score -= 18;
	else if (path.needsAny.some((s) => profile.skills.includes(s))) score += 8;
	for (const b of path.blockedBy) if (profile.constraints.includes(b)) score -= 32;
	for (const b of path.boostedBy) if (profile.constraints.includes(b)) score += 8;
	if (profile.goal === "cash-now") {
		if (path.category === "today") score += 16;
		if (path.category === "this-week") score += 10;
		if (path.category === "steady") score -= 6;
	}
	if (profile.goal === "steady-job") {
		if (path.category === "steady") score += 14;
		if (path.category === "today") score -= 4;
	}
	if (profile.situation === "crisis" && (path.category === "today" || path.category === "this-week")) score += 12;
	if (profile.situation === "laid-off" && path.id === "benefits") score += 20;
	if (profile.energy === "low" && path.effort === "high") score -= 12;
	if (profile.energy === "low" && path.effort === "low") score += 8;
	if (profile.hoursPerWeek < 10 && path.effort === "high") score -= 10;
	if (profile.constraints.includes("no-car") && path.id === "delivery" && profile.skills.includes("bike")) score += 18;
	return clamp(Math.round(score));
}
function rankPaths(profile) {
	return PATHS.map((path) => ({
		path,
		score: scorePath(path, profile)
	})).sort((a, b) => b.score - a.score);
}
function todaysMoves(profile, pipeline) {
	const ranked = rankPaths(profile);
	const fast = ranked.find((r) => r.path.category === "today" || r.path.category === "this-week");
	const steady = ranked.find((r) => r.path.category === "steady" || r.path.id === "walk-in");
	const open = pipeline.filter((p) => p.status === "started" || p.status === "waiting");
	const day = todayKey();
	const moves = [];
	if (fast) moves.push({
		id: `${day}-fast-${fast.path.id}`,
		kicker: "Money this week",
		title: fast.path.firstAction,
		detail: fast.path.kicker + " · " + fast.path.name,
		pathId: fast.path.id
	});
	if (open.length) {
		const item = open[0];
		moves.push({
			id: `${day}-follow-${item.id}`,
			kicker: "Do not let it die",
			title: `Follow up on “${item.title}”`,
			detail: "A waiting thing with no ping becomes a dead thing. One message, today.",
			pathId: item.pathId
		});
	} else if (steady) moves.push({
		id: `${day}-apply-${steady.path.id}`,
		kicker: "Pipeline",
		title: `Start one application: ${steady.path.name.toLowerCase()}`,
		detail: steady.path.firstAction,
		pathId: steady.path.id
	});
	if (profile.situation === "laid-off" || profile.situation === "crisis") moves.push({
		id: `${day}-owed`,
		kicker: "Owed, not earned twice",
		title: "File or check benefits — unemployment, food, local emergency help.",
		detail: "Forms before vibes. If you already filed, log it in Pipeline as waiting.",
		pathId: "benefits"
	});
	else if ((profile.skills.includes("stuff") || profile.cash < profile.weeklySpend) && fast?.path.id !== "sell-stuff") moves.push({
		id: `${day}-list`,
		kicker: "Closet is a float",
		title: "List one unused item for pickup today.",
		detail: "Photograph, post, price at 70% of sold comps. Cash, pickup today.",
		pathId: "sell-stuff"
	});
	else moves.push({
		id: `${day}-hours`,
		kicker: "Ninety minutes",
		title: "Block 90 minutes for money moves. Phone in another room after.",
		detail: "Applications, listings, or a walk-in. Not research. Not a new productivity app."
	});
	const seen = /* @__PURE__ */ new Set();
	return moves.filter((m) => {
		if (seen.has(m.title)) return false;
		seen.add(m.title);
		return true;
	}).slice(0, 3);
}
function weekIncome(ledger, now = /* @__PURE__ */ new Date()) {
	const start = new Date(now);
	const diff = (start.getDay() + 6) % 7;
	start.setDate(start.getDate() - diff);
	start.setHours(0, 0, 0, 0);
	return ledger.filter((e) => e.kind === "income" && new Date(e.at) >= start).reduce((s, e) => s + e.amount, 0);
}
function weekSpend(ledger, now = /* @__PURE__ */ new Date()) {
	const start = new Date(now);
	const diff = (start.getDay() + 6) % 7;
	start.setDate(start.getDate() - diff);
	start.setHours(0, 0, 0, 0);
	return ledger.filter((e) => e.kind === "expense" && new Date(e.at) >= start).reduce((s, e) => s + e.amount, 0);
}
//#endregion
export { weekIncome as a, todaysMoves as i, rankPaths as n, weekSpend as o, runwayDays as r, dailyBurn as t };

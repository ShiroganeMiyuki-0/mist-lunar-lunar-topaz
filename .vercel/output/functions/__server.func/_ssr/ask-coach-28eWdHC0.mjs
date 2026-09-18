import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { t as localCoach } from "./local-coach-B2ITiEt1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-coach-28eWdHC0.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askCoach_createServerFn_handler = createServerRpc({
	id: "09631c84ea3924c35ab971089523b2ea04f44978367c3c7d162a69c939ec4a04",
	name: "askCoach",
	filename: "src/lib/ask-coach.ts"
}, (opts) => askCoach.__executeServer(opts));
var askCoach = createServerFn({ method: "POST" }).validator((input) => input).handler(askCoach_createServerFn_handler, async ({ data }) => {
	const fallback = localCoach(data.profile, data.pipeline);
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: true,
		text: fallback,
		source: "local"
	};
	const skills = data.profile.skills.join(", ") || "none listed";
	const constraints = data.profile.constraints.join(", ") || "none listed";
	const open = data.pipeline.filter((p) => p.status !== "dead" && p.status !== "paid").slice(0, 8).map((p) => `${p.title} [${p.status}]`).join("; ");
	const system = `You are the Easy Street coach. The user is unemployed or NEET and wants money without a lecture.
Be direct, calm, specific. No hustle-bro voice, no pep, no emoji.
Never recommend crypto, dropshipping, survey mills, gurus, or "passive income" courses.
Prefer work that pays this week, then a paycheck. Work around constraints instead of ignoring them.
Give at most 3 concrete actions for the next 4 hours, with a script they can say or post when useful.
If they ask for the easy life: tell the truth — easy is runway plus a short list, not a lottery.`;
	const user = `Name: ${data.profile.name || "unknown"}
Situation: ${data.profile.situation}
Cash on hand: $${data.profile.cash}
Weekly spend: $${data.profile.weeklySpend}
Hours/week: ${data.profile.hoursPerWeek}
Energy: ${data.profile.energy}
Goal: ${data.profile.goal}
Skills: ${skills}
Constraints: ${constraints}
Open pipeline: ${open || "empty"}

Question: ${data.question}`;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 700,
				messages: [{
					role: "system",
					content: system
				}, {
					role: "user",
					content: user
				}]
			})
		});
		if (!res.ok) return {
			ok: true,
			text: fallback,
			source: "local"
		};
		return {
			ok: true,
			text: (await res.json()).choices[0]?.message.content?.trim() || fallback,
			source: "grok"
		};
	} catch {
		return {
			ok: true,
			text: fallback,
			source: "local"
		};
	}
});
//#endregion
export { askCoach_createServerFn_handler };

import { createServerFn } from "@tanstack/react-start";
import { localCoach } from "./local-coach";
import type { PipelineItem, Profile } from "./types";

type CoachInput = {
  profile: Profile;
  pipeline: PipelineItem[];
  question: string;
};

export const askCoach = createServerFn({ method: "POST" })
  .validator((input: CoachInput) => input)
  .handler(async ({ data }) => {
    const fallback = localCoach(data.profile, data.pipeline);
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: true as const, text: fallback, source: "local" as const };
    }

    const skills = data.profile.skills.join(", ") || "none listed";
    const constraints = data.profile.constraints.join(", ") || "none listed";
    const open = data.pipeline
      .filter((p) => p.status !== "dead" && p.status !== "paid")
      .slice(0, 8)
      .map((p) => `${p.title} [${p.status}]`)
      .join("; ");

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
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 700,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      if (!res.ok) {
        return { ok: true as const, text: fallback, source: "local" as const };
      }
      const body = (await res.json()) as {
        choices: { message: { content: string } }[];
      };
      const text = body.choices[0]?.message.content?.trim() || fallback;
      return { ok: true as const, text, source: "grok" as const };
    } catch {
      return { ok: true as const, text: fallback, source: "local" as const };
    }
  });

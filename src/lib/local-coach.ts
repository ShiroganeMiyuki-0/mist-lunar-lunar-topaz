import { rankPaths, runwayDays } from "./matching";
import type { PipelineItem, Profile } from "./types";
import { daysLabel } from "./format";

export function localCoach(profile: Profile, pipeline: PipelineItem[]) {
  const days = runwayDays(profile);
  const top = rankPaths(profile).slice(0, 4);
  const open = pipeline.filter((p) => p.status === "queued" || p.status === "started" || p.status === "waiting");
  const name = profile.name.trim() || "you";
  const parts: string[] = [];

  if (!Number.isFinite(days) || days > 45) {
    parts.push(
      `${name}, cash is not the fire. The fire is drift. Keep a short list moving so a quiet month does not become a zero month.`,
    );
  } else if (days < 7) {
    parts.push(
      `${name}, you have about ${daysLabel(days)} of runway. Ignore five-year plans. The only job this week is converting hours and stuff you already own into cash.`,
    );
  } else {
    parts.push(
      `About ${daysLabel(days)} of Easy Street left at your current spend. That is enough to be deliberate, not enough to wait for motivation.`,
    );
  }

  parts.push("Do these three in the next four hours:");
  const actions = top.slice(0, 3).map((t, i) => `${i + 1}. ${t.path.firstAction} (${t.path.name} — typical ${t.path.pay}).`);
  parts.push(actions.join("\n"));

  if (open.length) {
    parts.push(
      `You already started: ${open
        .slice(0, 3)
        .map((p) => p.title)
        .join(", ")}. Follow up today. Waiting with no ping is how pipelines die.`,
    );
  } else {
    parts.push("Your pipeline is empty. Add at least one thing you started — a listing, an application, a walk-in — so tomorrow has something to push.");
  }

  if (profile.constraints.includes("anxiety") || profile.energy === "low") {
    parts.push(
      "You marked limited energy or social dread. Prefer written, local, and one-at-a-time: listings, overnight shifts, remote applications, a single walk-in instead of a full day of strangers.",
    );
  }

  if (profile.situation === "laid-off") {
    parts.push("If you have not filed unemployment, that is today’s form. It is slower than a gig and often larger.");
  }

  parts.push(
    "Skip: survey mills, crypto, dropshipping courses, and anything that wants a fee to “show you the method.” If it pays, it has a shift, a listing, or a form.",
  );

  return parts.join("\n\n");
}

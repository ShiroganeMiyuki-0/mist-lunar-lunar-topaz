import { Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONSTRAINT_OPTIONS, SITUATIONS, SKILL_OPTIONS } from "@/lib/paths";
import { useAppStore } from "@/lib/store";
import type { ConstraintId, Energy, Goal, SkillId, Situation } from "@/lib/types";
import { cn } from "@/lib/utils";

type Draft = {
  name: string;
  situation: Situation | "";
  cash: string;
  weeklySpend: string;
  hoursPerWeek: number;
  energy: Energy;
  skills: SkillId[];
  constraints: ConstraintId[];
  goal: Goal;
};

const initial: Draft = {
  name: "",
  situation: "",
  cash: "",
  weeklySpend: "",
  hoursPerWeek: 15,
  energy: "medium",
  skills: ["phone"],
  constraints: [],
  goal: "both",
};

export function Onboarding() {
  const onboarded = useAppStore((s) => s.profile.onboarded);
  const complete = useAppStore((s) => s.completeOnboarding);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(initial);

  if (onboarded) return <Navigate to="/" />;

  const total = 6;
  const next = () => setStep((s) => Math.min(total - 1, s + 1));
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
      goal: draft.goal,
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
      skills: ["phone", "computer", "stuff", "write", "clean"],
      constraints: ["no-car", "anxiety", "low-energy"],
      goal: "cash-now",
    });
    navigate({ to: "/" });
  }

  function toggleSkill(id: SkillId) {
    setDraft((d) => ({
      ...d,
      skills: d.skills.includes(id) ? d.skills.filter((s) => s !== id) : [...d.skills, id],
    }));
  }
  function toggleConstraint(id: ConstraintId) {
    setDraft((d) => ({
      ...d,
      constraints: d.constraints.includes(id)
        ? d.constraints.filter((s) => s !== id)
        : [...d.constraints, id],
    }));
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto grid min-h-dvh max-w-5xl md:grid-cols-2">
        <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-10 pb-8 md:max-w-none md:px-10">
        <p className="text-xs tracking-[0.2em] text-subtle uppercase">Easy Street</p>
        <div className="mt-6 h-px bg-line">
          <div
            className="h-px bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>

        <div className="flex flex-1 flex-col pt-10">
          {step === 0 && (
            <div className="reveal">
              <h1 className="font-display text-4xl leading-tight tracking-tight">
                No job. No training.
                <span className="mt-1 block italic text-muted">Still need money.</span>
              </h1>
              <p className="mt-5 max-w-md text-muted">
                Easy is not a lottery ticket. It is cash in the account, a short list, and enough runway to sleep. This builds that system around your actual life.
              </p>
              <div className="mt-8">
                <label className="text-xs tracking-widest text-subtle uppercase">What should we call you</label>
                <Input
                  className="mt-2"
                  placeholder="First name, nickname, nothing"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="reveal">
              <h1 className="font-display text-3xl tracking-tight">Where are you, really?</h1>
              <p className="mt-3 text-sm text-muted">This changes the first three moves. Not a diagnosis.</p>
              <div className="mt-6 space-y-2">
                {SITUATIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setDraft({ ...draft, situation: s.id })}
                    className={cn(
                      "flex min-h-16 w-full flex-col items-start rounded-2xl px-4 py-3 text-left transition-[box-shadow,background-color] duration-150",
                      draft.situation === s.id ? "bg-raised selected-ring" : "hairline hover:bg-raised",
                    )}
                  >
                    <span className="font-medium">{s.label}</span>
                    <span className="text-sm text-muted">{s.blurb}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="reveal">
              <h1 className="font-display text-3xl tracking-tight">How long does the money last?</h1>
              <p className="mt-3 text-sm text-muted">
                Cash on hand, and what a typical week of living costs. Guess if you have to. You can edit this later.
              </p>
              <div className="mt-8 grid gap-5">
                <label className="block">
                  <span className="text-xs tracking-widest text-subtle uppercase">Cash on hand</span>
                  <Input
                    className="mt-2"
                    inputMode="decimal"
                    placeholder="180"
                    value={draft.cash}
                    onChange={(e) => setDraft({ ...draft, cash: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="text-xs tracking-widest text-subtle uppercase">Typical week of spend</span>
                  <Input
                    className="mt-2"
                    inputMode="decimal"
                    placeholder="90"
                    value={draft.weeklySpend}
                    onChange={(e) => setDraft({ ...draft, weeklySpend: e.target.value })}
                  />
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="reveal">
              <h1 className="font-display text-3xl tracking-tight">Hours and energy.</h1>
              <p className="mt-3 text-sm text-muted">We will not pretend you have forty heroic hours if you do not.</p>
              <div className="mt-8">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs tracking-widest text-subtle uppercase">Hours this week</span>
                  <span className="font-display text-2xl tabular-nums">{draft.hoursPerWeek}</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={40}
                  step={1}
                  value={draft.hoursPerWeek}
                  onChange={(e) => setDraft({ ...draft, hoursPerWeek: Number(e.target.value) })}
                  className="mt-4 w-full accent-sage"
                />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2">
                {(["low", "medium", "high"] as Energy[]).map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setDraft({ ...draft, energy: e })}
                    className={cn(
                      "h-12 rounded-xl capitalize",
                      draft.energy === e ? "bg-primary text-primary-fg" : "hairline text-muted",
                    )}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="reveal">
              <h1 className="font-display text-3xl tracking-tight">What you can actually do.</h1>
              <p className="mt-3 text-sm text-muted">Tap everything that is true enough. This is how paths get ranked.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((s) => {
                  const on = draft.skills.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSkill(s.id)}
                      className={cn(
                        "h-11 rounded-full px-3.5 text-sm",
                        on ? "bg-primary text-primary-fg" : "hairline text-muted",
                      )}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-8 text-xs tracking-widest text-subtle uppercase">In the way</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CONSTRAINT_OPTIONS.map((s) => {
                  const on = draft.constraints.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleConstraint(s.id)}
                      className={cn(
                        "h-11 rounded-full px-3.5 text-sm",
                        on ? "bg-raised text-fg selected-ring" : "hairline text-muted",
                      )}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="reveal">
              <h1 className="font-display text-3xl tracking-tight">What does easy look like first?</h1>
              <p className="mt-3 text-sm text-muted">You can want both. We will still pick an order.</p>
              <div className="mt-6 space-y-2">
                {(
                  [
                    { id: "cash-now" as Goal, label: "Cash this week", blurb: "Rent, food, stop the drop." },
                    { id: "steady-job" as Goal, label: "A real paycheck", blurb: "Slower. Cleaner. A schedule." },
                    { id: "both" as Goal, label: "Bridge, then a job", blurb: "Money now without dropping the longer path." },
                  ] as const
                ).map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setDraft({ ...draft, goal: g.id })}
                    className={cn(
                      "flex min-h-16 w-full flex-col items-start rounded-2xl px-4 py-3 text-left",
                      draft.goal === g.id ? "bg-raised selected-ring" : "hairline",
                    )}
                  >
                    <span className="font-medium">{g.label}</span>
                    <span className="text-sm text-muted">{g.blurb}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center gap-2">
          {step > 0 ? (
            <Button variant="outline" size="icon" onClick={back} aria-label="Back">
              <ArrowLeft />
            </Button>
          ) : (
            <Button variant="ghost" className="text-muted" onClick={sample}>
              Load a sample life
            </Button>
          )}
          <Button className="ml-auto min-w-36" onClick={step === total - 1 ? finish : next}>
            {step === total - 1 ? "Open the street" : "Continue"}
            <ArrowRight />
          </Button>
        </div>
        </div>
        <aside className="hidden flex-col justify-end border-l border-line p-12 md:flex">
          <p className="font-display text-4xl leading-tight tracking-tight italic text-muted">
            The easy life is not luck. It is runway, then a paycheck, then quiet.
          </p>
          <p className="mt-6 max-w-sm text-sm text-subtle">
            No courses. No hustle sermons. A short list you can finish before dinner.
          </p>
        </aside>
      </div>
    </div>
  );
}

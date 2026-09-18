import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { PathDetail } from "@/components/path-detail";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { daysLabel, money } from "@/lib/format";
import { rankPaths, runwayDays, todaysMoves, weekIncome } from "@/lib/matching";
import { PATHS } from "@/lib/paths";
import { useAppStore } from "@/lib/store";
import { cn, todayKey } from "@/lib/utils";

export const Route = createFileRoute("/_app/")({
  component: TodayPage,
});

function TodayPage() {
  const profile = useAppStore((s) => s.profile);
  const pipeline = useAppStore((s) => s.pipeline);
  const ledger = useAppStore((s) => s.ledger);
  const done = useAppStore((s) => s.done);
  const markMove = useAppStore((s) => s.markMove);
  const [pathId, setPathId] = useState<string | null>(null);

  const days = runwayDays(profile);
  const moves = useMemo(() => todaysMoves(profile, pipeline), [profile, pipeline]);
  const day = todayKey();
  const completedToday = moves.filter((m) => done.some((d) => d.moveId === m.id && d.day === day)).length;
  const earned = weekIncome(ledger);
  const ranked = rankPaths(profile).slice(0, 3);
  const path = PATHS.find((p) => p.id === pathId) ?? null;
  const greeting = profile.name ? `${profile.name}.` : "You.";
  const crisis = !Number.isFinite(days) ? false : days < 10;

  return (
    <div>
      <p className="reveal text-xs tracking-[0.2em] text-subtle uppercase">Today</p>
      <h1 className="reveal reveal-2 mt-3 font-display text-4xl leading-tight tracking-tight md:text-5xl">
        {greeting}
        <span className="mt-1 block italic text-muted">
          {crisis ? "First dollar before theory." : "A short list. Then rest."}
        </span>
      </h1>

      <section className="reveal reveal-3 mt-10 rounded-3xl bg-surface p-5 md:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest text-subtle uppercase">Runway</p>
            <p className="mt-2 font-display text-5xl leading-none tracking-tight tabular-nums">
              {daysLabel(days)}
            </p>
            <p className="mt-3 text-sm text-muted">
              {money(profile.cash)} on hand · {money(profile.weeklySpend)} a week
            </p>
          </div>
          <Link to="/runway" className="flex size-11 items-center justify-center rounded-lg text-muted hover:bg-raised hover:text-fg">
            <ChevronRight className="size-5" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-raised p-4">
            <p className="text-xs text-subtle">In this week</p>
            <p className="mt-1 font-display text-2xl text-sage tabular-nums">{money(earned)}</p>
          </div>
          <div className="rounded-2xl bg-raised p-4">
            <p className="text-xs text-subtle">Today’s moves</p>
            <p className="mt-1 font-display text-2xl tabular-nums">
              {completedToday}/{moves.length}
            </p>
          </div>
        </div>
        <Progress className="mt-5" value={moves.length ? (completedToday / moves.length) * 100 : 0} />
      </section>

      <section className="reveal reveal-4 mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl tracking-tight">Three moves</h2>
          <p className="text-xs text-subtle">Not five. Not twenty.</p>
        </div>
        <ol className="mt-5 space-y-3">
          {moves.map((move, i) => {
            const isDone = done.some((d) => d.moveId === move.id && d.day === day);
            return (
              <li
                key={move.id}
                className={cn(
                  "flex items-start gap-4 rounded-2xl bg-surface p-4 hairline",
                  isDone && "opacity-60",
                )}
              >
                <button
                  type="button"
                  onClick={() => markMove(move.id, day)}
                  className={cn(
                    "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full",
                    isDone ? "bg-sage text-primary-fg" : "bg-raised text-muted",
                  )}
                  aria-label={isDone ? "Completed" : "Mark done"}
                >
                  {isDone ? <Check className="size-4" /> : <span className="font-display tabular-nums">{i + 1}</span>}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-xs tracking-widest text-subtle uppercase">{move.kicker}</p>
                  <p className={cn("mt-1 font-medium", isDone && "line-through")}>{move.title}</p>
                  <p className="mt-1 text-sm text-muted">{move.detail}</p>
                  {move.pathId ? (
                    <button
                      type="button"
                      className="mt-2 min-h-11 text-sm text-sage"
                      onClick={() => setPathId(move.pathId ?? null)}
                    >
                      Open path
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl tracking-tight">Best fits</h2>
          <Link to="/paths" className="inline-flex h-11 items-center text-sm text-muted hover:text-fg">
            All paths
          </Link>
        </div>
        <ul className="mt-5 space-y-2">
          {ranked.map(({ path: p, score }) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setPathId(p.id)}
                className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-4 text-left hairline hairline-hover"
              >
                <span>
                  <span className="block font-medium">{p.name}</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {p.speed} · {p.pay}
                  </span>
                </span>
                <Badge tone="sage">{score}</Badge>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <PathDetail
        path={path}
        score={path ? rankPaths(profile).find((r) => r.path.id === path.id)?.score : undefined}
        open={!!path}
        onOpenChange={(v) => {
          if (!v) setPathId(null);
        }}
      />
    </div>
  );
}

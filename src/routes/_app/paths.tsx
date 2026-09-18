import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PathDetail } from "@/components/path-detail";
import { Badge } from "@/components/ui/badge";
import { rankPaths } from "@/lib/matching";
import { PATHS } from "@/lib/paths";
import { useAppStore } from "@/lib/store";
import type { PathCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/paths")({
  component: PathsPage,
});

const FILTERS: { id: PathCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "this-week", label: "This week" },
  { id: "steady", label: "Steady" },
  { id: "owed", label: "Owed" },
];

function PathsPage() {
  const profile = useAppStore((s) => s.profile);
  const ranked = useMemo(() => rankPaths(profile), [profile]);
  const [filter, setFilter] = useState<PathCategory | "all">("all");
  const [pathId, setPathId] = useState<string | null>(null);
  const visible = ranked.filter((r) => filter === "all" || r.path.category === filter);
  const path = PATHS.find((p) => p.id === pathId) ?? null;

  return (
    <div>
      <p className="text-xs tracking-[0.2em] text-subtle uppercase">Paths</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Honest ways to get paid.</h1>
      <p className="mt-3 max-w-md text-muted">
        Ranked for your skills and constraints. Not a live job board. A playbook with first actions, scripts, and real platforms.
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "h-10 shrink-0 rounded-full px-4 text-sm",
              filter === f.id ? "bg-primary text-primary-fg" : "hairline text-muted",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-2">
        {visible.map(({ path: p, score }) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setPathId(p.id)}
              className="flex w-full items-start justify-between gap-4 rounded-2xl bg-surface p-4 text-left hairline hairline-hover"
            >
              <span className="min-w-0">
                <span className="text-xs tracking-widest text-subtle uppercase">{p.kicker}</span>
                <span className="mt-1 block font-medium">{p.name}</span>
                <span className="mt-1 block text-sm text-muted">{p.summary}</span>
                <span className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="paper">{p.speed}</Badge>
                  <Badge tone="sage">{p.pay}</Badge>
                </span>
              </span>
              <Badge className="shrink-0">{score}</Badge>
            </button>
          </li>
        ))}
      </ul>

      <PathDetail
        path={path}
        score={path ? ranked.find((r) => r.path.id === path.id)?.score : undefined}
        open={!!path}
        onOpenChange={(v) => {
          if (!v) setPathId(null);
        }}
      />
    </div>
  );
}

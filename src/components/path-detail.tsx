import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CopyButton } from "@/components/copy-button";
import type { MoneyPath } from "@/lib/types";
import { useAppStore } from "@/lib/store";

export function PathDetail({
  path,
  score,
  open,
  onOpenChange,
}: {
  path: MoneyPath | null;
  score?: number;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const addPipeline = useAppStore((s) => s.addPipeline);
  if (!path) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="min-h-0 flex-1 overflow-y-auto pr-6">
          <p className="text-xs tracking-widest text-subtle uppercase">{path.kicker}</p>
          <DialogTitle className="mt-2">{path.name}</DialogTitle>
          <DialogDescription className="mt-2 text-base text-muted">{path.summary}</DialogDescription>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="paper">{path.speed}</Badge>
            <Badge tone="sage">{path.pay}</Badge>
            {typeof score === "number" ? <Badge>Match {score}</Badge> : null}
          </div>

          <section className="mt-8">
            <h3 className="text-xs tracking-widest text-subtle uppercase">You need</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {path.requirements.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-subtle" />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="text-xs tracking-widest text-subtle uppercase">How to start</h3>
            <ol className="mt-4 space-y-5">
              {path.steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-x-3">
                  <span className="font-display text-lg text-sage tabular-nums">{i + 1}</span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="mt-1 text-sm text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {path.script ? (
            <section className="mt-8 rounded-2xl bg-raised p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-medium">{path.script.title}</h3>
                <CopyButton text={path.script.body} />
              </div>
              <pre className="mt-3 font-sans text-sm leading-relaxed whitespace-pre-wrap text-muted">
                {path.script.body}
              </pre>
            </section>
          ) : null}

          {path.warning ? (
            <p className="mt-6 text-sm text-warn">{path.warning}</p>
          ) : null}

          <div className="mt-8 flex flex-col gap-2">
            {path.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 items-center justify-between rounded-lg bg-raised px-3 text-sm hairline"
              >
                {l.label}
                <ExternalLink className="size-3.5 text-subtle" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2 border-t border-line pt-4">
          <Button
            className="flex-1"
            onClick={() => {
              addPipeline({
                title: path.firstAction,
                pathId: path.id,
                kind:
                  path.category === "owed"
                    ? "benefit"
                    : path.id === "sell-stuff"
                      ? "sale"
                      : path.category === "steady"
                        ? "job"
                        : "gig",
                status: "started",
              });
              onOpenChange(false);
            }}
          >
            Start this — add to pipeline
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

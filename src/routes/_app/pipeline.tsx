import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { money, shortDate } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import type { PipelineKind, PipelineStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/pipeline")({
  component: PipelinePage,
});

const STATUSES: { id: PipelineStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "queued", label: "Queued" },
  { id: "started", label: "Started" },
  { id: "waiting", label: "Waiting" },
  { id: "paid", label: "Paid" },
  { id: "dead", label: "Dead" },
];

const KINDS: PipelineKind[] = ["gig", "job", "sale", "benefit", "other"];

function PipelinePage() {
  const pipeline = useAppStore((s) => s.pipeline);
  const addPipeline = useAppStore((s) => s.addPipeline);
  const setStatus = useAppStore((s) => s.setPipelineStatus);
  const remove = useAppStore((s) => s.removePipeline);
  const [filter, setFilter] = useState<PipelineStatus | "all">("all");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<PipelineKind>("gig");
  const [expected, setExpected] = useState("");
  const [payId, setPayId] = useState<string | null>(null);
  const [earned, setEarned] = useState("");

  const visible = pipeline.filter((p) => filter === "all" || p.status === filter);

  function add() {
    if (!title.trim()) return;
    addPipeline({
      title: title.trim(),
      kind,
      expected: expected ? Number(expected) : undefined,
      status: "queued",
    });
    setTitle("");
    setExpected("");
    setOpen(false);
    toast("Added to the pipeline");
  }

  function markPaid() {
    if (!payId) return;
    const n = Number(earned) || 0;
    setStatus(payId, "paid", n);
    setPayId(null);
    setEarned("");
    toast(n ? `Logged ${money(n)}` : "Marked paid");
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.2em] text-subtle uppercase">Pipeline</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight">Things in motion.</h1>
        </div>
        <Button onClick={() => setOpen(true)}>Add</Button>
      </div>
      <p className="mt-3 max-w-md text-muted">
        Applications, listings, walk-ins, claims. If it is not here, it is a wish.
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {STATUSES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setFilter(s.id)}
            className={cn(
              "h-10 shrink-0 rounded-full px-4 text-sm",
              filter === s.id ? "bg-primary text-primary-fg" : "hairline text-muted",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-surface p-6">
          <p className="font-display text-2xl tracking-tight">Nothing moving yet.</p>
          <p className="mt-2 text-sm text-muted">
            Add a listing, an application, or a walk-in. Tomorrow’s follow-up needs a today.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {visible.map((item) => (
            <li key={item.id} className="rounded-2xl bg-surface p-4 hairline">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.kind} · {shortDate(item.updatedAt)}
                    {item.expected ? ` · expect ${money(item.expected)}` : ""}
                    {item.earned ? ` · got ${money(item.earned)}` : ""}
                  </p>
                </div>
                <Badge tone={item.status === "paid" ? "sage" : item.status === "dead" ? "warn" : "muted"}>
                  {item.status}
                </Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.status !== "started" && item.status !== "paid" ? (
                  <Button size="sm" variant="outline" onClick={() => setStatus(item.id, "started")}>
                    Started
                  </Button>
                ) : null}
                {item.status !== "waiting" && item.status !== "paid" ? (
                  <Button size="sm" variant="outline" onClick={() => setStatus(item.id, "waiting")}>
                    Waiting
                  </Button>
                ) : null}
                {item.status !== "paid" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setPayId(item.id);
                      setEarned(item.expected ? String(item.expected) : "");
                    }}
                  >
                    Paid
                  </Button>
                ) : null}
                {item.status !== "dead" && item.status !== "paid" ? (
                  <Button size="sm" variant="ghost" onClick={() => setStatus(item.id, "dead")}>
                    Dead
                  </Button>
                ) : null}
                <Button size="sm" variant="ghost" className="text-subtle" onClick={() => remove(item.id)}>
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Add to pipeline</DialogTitle>
          <DialogDescription className="mt-1">A listing, application, walk-in, or claim.</DialogDescription>
          <label className="mt-6 block text-xs tracking-widest text-subtle uppercase">Title</label>
          <Input className="mt-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="DoorDash application" />
          <label className="mt-4 block text-xs tracking-widest text-subtle uppercase">Kind</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={cn("h-10 rounded-full px-3 text-sm capitalize", kind === k ? "bg-primary text-primary-fg" : "hairline")}
              >
                {k}
              </button>
            ))}
          </div>
          <label className="mt-4 block text-xs tracking-widest text-subtle uppercase">Expected (optional)</label>
          <Input className="mt-2" inputMode="decimal" value={expected} onChange={(e) => setExpected(e.target.value)} placeholder="80" />
          <Button className="mt-6 w-full" onClick={add}>
            Add
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={!!payId} onOpenChange={(v) => !v && setPayId(null)}>
        <DialogContent>
          <DialogTitle>Mark paid</DialogTitle>
          <DialogDescription className="mt-1">This adds the amount to cash and this week’s income.</DialogDescription>
          <Input className="mt-6" inputMode="decimal" value={earned} onChange={(e) => setEarned(e.target.value)} placeholder="0" />
          <Button className="mt-6 w-full" onClick={markPaid}>
            Log it
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

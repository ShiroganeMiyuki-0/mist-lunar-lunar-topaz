import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { daysLabel, money, shortDate } from "@/lib/format";
import { dailyBurn, runwayDays, weekIncome, weekSpend } from "@/lib/matching";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/runway")({
  component: RunwayPage,
});

function RunwayPage() {
  const profile = useAppStore((s) => s.profile);
  const ledger = useAppStore((s) => s.ledger);
  const patch = useAppStore((s) => s.patchProfile);
  const addLedger = useAppStore((s) => s.addLedger);
  const reset = useAppStore((s) => s.reset);
  const navigate = useNavigate();
  const [kind, setKind] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [cash, setCash] = useState(String(profile.cash || ""));
  const [spend, setSpend] = useState(String(profile.weeklySpend || ""));
  const [confirmReset, setConfirmReset] = useState(false);
  const [chartReady, setChartReady] = useState(false);
  useEffect(() => setChartReady(true), []);

  const days = runwayDays(profile);
  const burn = dailyBurn(profile);
  const inWeek = weekIncome(ledger);
  const outWeek = weekSpend(ledger);

  const chart = useMemo(() => {
    const daysBack = 14;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Array.from({ length: daysBack }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (daysBack - 1 - i));
      const key = d.toISOString().slice(0, 10);
      const income = ledger
        .filter((e) => e.kind === "income" && e.at.slice(0, 10) === key)
        .reduce((s, e) => s + e.amount, 0);
      return { day: d.toLocaleDateString("en-US", { weekday: "narrow" }), income };
    });
  }, [ledger]);

  function saveNumbers() {
    patch({ cash: Number(cash) || 0, weeklySpend: Number(spend) || 0 });
  }

  function log() {
    const n = Number(amount);
    if (!n || n <= 0) return;
    addLedger({
      amount: n,
      source: source.trim() || (kind === "income" ? "Income" : "Spend"),
      kind,
    });
    setAmount("");
    setSource("");
    setCash(String((kind === "income" ? profile.cash + n : Math.max(0, profile.cash - n)).toFixed(0)));
  }

  return (
    <div>
      <p className="text-xs tracking-[0.2em] text-subtle uppercase">Runway</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">How long the quiet lasts.</h1>
      <p className="mt-3 max-w-md text-muted">
        Cash divided by a typical week. Log money in and out so the number is not a story you tell yourself.
      </p>

      <section className="mt-8 rounded-3xl bg-surface p-5 md:p-6">
        <p className="font-display text-5xl leading-none tracking-tight tabular-nums">{daysLabel(days)}</p>
        <p className="mt-3 text-sm text-muted">
          {burn > 0 ? `${money(burn)} a day at current spend` : "Set a weekly spend to see days left"}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Stat label="This week in" value={money(inWeek)} sage />
          <Stat label="Extra out logged" value={money(outWeek)} />
        </div>
        {chart.some((d) => d.income > 0) ? (
        <div className="mt-6 h-36">
          {chartReady ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart}>
                <XAxis dataKey="day" tick={{ fill: "var(--color-subtle)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "color-mix(in oklab, var(--color-fg) 4%, transparent)" }}
                  contentStyle={{
                    background: "var(--color-raised)",
                    border: "1px solid var(--color-line)",
                    borderRadius: 12,
                    color: "var(--color-fg)",
                  }}
                  formatter={(v) => [money(Number(v ?? 0)), "In"]}
                />
                <Bar dataKey="income" fill="var(--color-sage)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </div>
        ) : null}
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl tracking-tight">Log money</h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setKind("income")}
            className={cn("h-11 rounded-xl", kind === "income" ? "bg-sage text-primary-fg" : "hairline text-muted")}
          >
            Came in
          </button>
          <button
            type="button"
            onClick={() => setKind("expense")}
            className={cn("h-11 rounded-xl", kind === "expense" ? "bg-danger/20 text-danger" : "hairline text-muted")}
          >
            Went out
          </button>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
          <Input inputMode="decimal" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Input placeholder={kind === "income" ? "DoorDash, Marketplace…" : "Groceries, transit…"} value={source} onChange={(e) => setSource(e.target.value)} />
          <Button onClick={log}>Log</Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl tracking-tight">The two numbers</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label>
            <span className="text-xs tracking-widest text-subtle uppercase">Cash on hand</span>
            <Input className="mt-2" inputMode="decimal" value={cash} onChange={(e) => setCash(e.target.value)} />
          </label>
          <label>
            <span className="text-xs tracking-widest text-subtle uppercase">Weekly spend</span>
            <Input className="mt-2" inputMode="decimal" value={spend} onChange={(e) => setSpend(e.target.value)} />
          </label>
        </div>
        <Button className="mt-4" variant="outline" onClick={saveNumbers}>
          Save numbers
        </Button>
      </section>

      {ledger.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-display text-2xl tracking-tight">Ledger</h2>
          <ul className="mt-4 divide-y divide-line">
            {ledger.slice(0, 12).map((e) => (
              <li key={e.id} className="flex items-center justify-between py-3 text-sm">
                <span>
                  <span className="block">{e.source}</span>
                  <span className="text-xs text-subtle">{shortDate(e.at)}</span>
                </span>
                <span className={cn("tabular-nums", e.kind === "income" ? "text-sage" : "text-danger")}>
                  {e.kind === "income" ? "+" : "−"}
                  {money(e.amount)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <button type="button" className="mt-12 text-xs text-subtle hover:text-muted" onClick={() => setConfirmReset(true)}>
        Reset this device’s data
      </button>

      <Dialog open={confirmReset} onOpenChange={setConfirmReset}>
        <DialogContent>
          <DialogTitle>Start over?</DialogTitle>
          <DialogDescription className="mt-2">
            This only lives on this device. Resetting returns you to the first questions.
          </DialogDescription>
          <Button
            className="mt-6 w-full"
            variant="danger"
            onClick={() => {
              reset();
              navigate({ to: "/start" });
            }}
          >
            Reset
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Stat({ label, value, sage }: { label: string; value: string; sage?: boolean }) {
  return (
    <div className="rounded-2xl bg-raised p-4">
      <p className="text-xs text-subtle">{label}</p>
      <p className={cn("mt-1 font-display text-2xl tabular-nums", sage && "text-sage")}>{value}</p>
    </div>
  );
}

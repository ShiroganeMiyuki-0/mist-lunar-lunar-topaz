export function money(n: number, opts?: { cents?: boolean }) {
  const abs = Math.abs(n);
  const fraction =
    opts?.cents || abs % 1 !== 0 ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 0 };
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...fraction,
  }).format(n);
}

export function daysLabel(n: number) {
  if (!Number.isFinite(n)) return "open";
  if (n <= 0) return "0 days";
  if (n < 1) return "under a day";
  const rounded = Math.floor(n);
  return `${rounded} day${rounded === 1 ? "" : "s"}`;
}

export function shortDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, ListChecks, MessageCircle, Timer, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Today", icon: Sun },
  { to: "/paths", label: "Paths", icon: Compass },
  { to: "/pipeline", label: "Pipeline", icon: ListChecks },
  { to: "/runway", label: "Runway", icon: Timer },
  { to: "/coach", label: "Coach", icon: MessageCircle },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <aside className="fixed top-0 left-0 hidden h-dvh w-56 flex-col border-r border-line px-4 py-6 md:flex">
        <Link to="/" className="px-2">
          <p className="font-display text-xl tracking-tight">Easy Street</p>
          <p className="mt-1 text-xs text-subtle">Money, then quiet</p>
        </Link>
        <nav className="mt-10 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-150",
                  active ? "bg-raised text-fg" : "text-muted hover:bg-raised/60 hover:text-fg",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <p className="mt-auto px-2 text-xs leading-relaxed text-subtle">
          Easy is not a lottery. It is runway and a short list.
        </p>
      </aside>

      <div className="md:pl-56">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-bg/90 px-4 backdrop-blur-sm md:hidden">
          <p className="font-display text-lg tracking-tight">Easy Street</p>
        </header>
        <main className="mx-auto w-full max-w-3xl px-4 pt-6 pb-28 md:px-8 md:pt-10 md:pb-16">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-5">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 text-xs",
                  active ? "text-fg" : "text-subtle",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

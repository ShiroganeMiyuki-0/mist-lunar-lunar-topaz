import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "sage" | "warn" | "paper";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        tone === "muted" && "bg-raised text-muted",
        tone === "sage" && "bg-sage/15 text-sage",
        tone === "warn" && "bg-warn/15 text-warn",
        tone === "paper" && "bg-primary/10 text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}

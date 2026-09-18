import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "focus-ring flex h-11 w-full rounded-lg bg-raised px-3 text-base text-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

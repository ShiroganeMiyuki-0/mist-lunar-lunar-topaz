import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "focus-ring flex min-h-28 w-full rounded-xl bg-raised px-3 py-3 text-base text-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle",
        className,
      )}
      {...props}
    />
  );
}

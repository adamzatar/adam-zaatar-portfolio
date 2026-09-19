import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Small purple-tinted chip used for technologies and research methods. */
export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-text",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({
  items,
  label,
  className,
}: {
  items: readonly string[];
  label: string;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

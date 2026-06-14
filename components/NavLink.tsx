"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import * as React from "react";

type NavLinkProps = {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
  className?: string;
  underlineClassName?: string;
};

function normalizePath(path: string | null | undefined): string {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function isPathActive(
  pathname: string | null | undefined,
  href: string,
  exact = false
): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (exact) {
    return current === target;
  }

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}

export function useNavActive(href: string, exact = false): boolean {
  const pathname = usePathname();
  return isPathActive(pathname, href, exact);
}

export function NavLink({
  href,
  children,
  exact = false,
  className,
  underlineClassName,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isPathActive(pathname, href, exact);

  return (
    <Link
      href={href}
      className={clsx(
        "nav-link-float link-plain inline-flex items-center rounded-full border px-3 py-2 text-sm font-medium",
        active
          ? "nav-link-float-active border-primary/25 bg-primary/10 text-text"
          : "border-transparent text-muted hover:border-border hover:bg-surface hover:text-text focus-visible:text-text",
        className
      )}
      aria-current={active ? "page" : undefined}
    >
      <span>{children}</span>
      {underlineClassName ? <span aria-hidden className={underlineClassName} /> : null}
    </Link>
  );
}

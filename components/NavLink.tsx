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
        "group relative inline-flex items-center px-2 py-1 text-lg font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-foreground/70 hover:text-foreground focus-visible:text-foreground",
        className
      )}
      aria-current={active ? "page" : undefined}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className={clsx(
          "absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 transform rounded-full bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent) transition-all duration-500 ease-out",
          active
            ? "scale-x-100 shadow-[0_0_8px_var(--primary),0_0_16px_var(--secondary)]"
            : "group-hover:scale-x-100 focus-visible:scale-x-100",
          underlineClassName
        )}
      />
    </Link>
  );
}

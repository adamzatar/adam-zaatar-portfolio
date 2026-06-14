"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import { Container } from "@/components/ui/Container";
import { NavLink as ActiveNavLink, isPathActive } from "@/components/NavLink";

interface NavItem {
  href: Route | string;
  label: string;
  external?: boolean;
  download?: boolean;
  exact?: boolean;
}

const navLinks: NavItem[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full bg-bg py-3">
      <Container>
        <nav
          className="flex h-14 items-center justify-between rounded-2xl border border-border bg-surface px-5 shadow-sm"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            aria-label="Go to home"
            className="link-plain text-xl font-semibold tracking-normal text-text"
          >
            Adam Zaatar
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, label, external, download, exact }) => {
              const hrefString = href.toString();
              const active = isPathActive(pathname, hrefString, Boolean(exact));

              return (
                <li key={hrefString}>
                  {external ? (
                    <a
                      href={hrefString}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...(download ? { download: true } : {})}
                      className={clsx(
                        "nav-link-float link-plain rounded-full border px-3 py-2 text-sm font-medium",
                        active
                          ? "nav-link-float-active border-primary/25 bg-primary/10 text-text"
                          : "border-transparent text-muted hover:border-border hover:bg-surface hover:text-text focus-visible:text-text"
                      )}
                    >
                      {label}
                    </a>
                  ) : (
                    <ActiveNavLink href={hrefString} exact={Boolean(exact)}>
                      {label}
                    </ActiveNavLink>
                  )}
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="link-plain rounded-lg border border-border bg-surface p-2 text-text transition-colors duration-200 ease-out hover:border-primary/40 md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </nav>

        {isOpen && (
          <div
            id="mobile-menu"
            className="mt-2 rounded-2xl border border-border bg-surface px-3 py-3 md:hidden"
          >
            {navLinks.map(({ href, label, external, download, exact }) => {
              const hrefString = href.toString();
              const active = isPathActive(pathname, hrefString, Boolean(exact));

              return external ? (
                <a
                  key={hrefString}
                  href={hrefString}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...(download ? { download: true } : {})}
                  className={clsx(
                    "link-plain block rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-200 ease-out",
                    active
                      ? "border-primary/25 bg-primary/10 text-text"
                      : "border-transparent text-muted hover:border-border hover:bg-surface hover:text-text"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={hrefString}
                  href={href as Route}
                  className={clsx(
                    "link-plain block rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-200 ease-out",
                    active
                      ? "border-primary/25 bg-primary/10 text-text"
                      : "border-transparent text-muted hover:border-border hover:bg-surface hover:text-text"
                  )}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </header>
  );
}

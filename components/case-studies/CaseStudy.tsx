import Link from "next/link";
import type { ReactNode } from "react";

import { TagList } from "@/components/ui/Tag";

export const caseLinkClass =
  "link-plain text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary";
export const caseBodyClass =
  "mt-4 max-w-3xl text-base leading-relaxed text-muted";

/** Title block shared by the case studies. */
export function CaseHeader({
  eyebrow,
  title,
  lead,
  children,
  technologies,
  sourceHref,
  aside,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  children?: ReactNode;
  technologies: readonly string[];
  sourceHref: string;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-border/70 bg-gradient-to-b from-primary/10 to-transparent">
      <div
        className={`mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 sm:py-16 lg:px-12 ${
          aside ? "lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center" : ""
        }`}
      >
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-text sm:text-xl">
            {lead}
          </p>
          {children}
          <TagList
            items={technologies}
            label={`${title} technologies`}
            className="mt-6"
          />
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-plain rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            >
              Source
            </a>
            <Link href="/projects" className={caseLinkClass}>
              Back to projects
            </Link>
          </div>
        </div>
        {aside}
      </div>
    </section>
  );
}

export function CaseContents({
  label,
  items,
}: {
  label: string;
  items: readonly (readonly [string, string])[];
}) {
  return (
    <nav
      aria-label={label}
      className="mt-10 rounded-xl border border-border bg-surface px-5 py-3"
    >
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {items.map(([text, id]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="link-plain text-sm font-semibold text-text transition-colors duration-200 ease-out hover:text-primary"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="mt-14 border-t border-border pt-10"
      aria-labelledby={id}
    >
      <h2
        id={id}
        className="scroll-mt-8 text-2xl font-semibold text-text sm:text-3xl"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Big-number result callout. */
export function Stat({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <p className="text-3xl font-semibold tabular-nums text-text">{value}</p>
      <p className="mt-1 text-sm font-semibold text-primary">{label}</p>
      {children ? (
        <div className="mt-3 text-sm leading-relaxed text-muted">
          {children}
        </div>
      ) : null}
    </div>
  );
}

/** Bordered explanatory card with an accent heading. */
export function Panel({
  title,
  children,
  accent = false,
}: {
  title: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <section
      className={`rounded-xl border p-5 sm:p-6 ${
        accent ? "border-primary/30 bg-primary/5" : "border-border bg-surface"
      }`}
    >
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

/** For genuinely secondary detail. Don't hide the interesting parts here. */
export function Detail({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group mt-6 rounded-xl border border-border bg-surface open:border-primary/30">
      <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-text marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="mr-2 inline-block text-primary transition-transform duration-200 group-open:rotate-90">
          ▸
        </span>
        {title}
      </summary>
      <div className="max-w-3xl space-y-3 border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </details>
  );
}

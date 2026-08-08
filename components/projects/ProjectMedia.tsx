import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { ProjectMediaData } from "@/lib/content";

export function ProjectMedia({ media }: { media: ProjectMediaData }) {
  if (media.kind === "image") {
    return (
      <figure
        className="aspect-video overflow-hidden border-b border-border bg-bg"
        style={{ aspectRatio: "16 / 9" }}
      >
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          className="h-full w-full object-cover"
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 46vw, calc(100vw - 48px)"
        />
      </figure>
    );
  }

  return (
    <figure
      className="flex aspect-video flex-col justify-center gap-3 border-b border-border bg-bg p-4 lg:gap-4 lg:p-6"
      role="img"
      aria-label={media.alt}
      style={{ aspectRatio: "16 / 9" }}
    >
      <figcaption className="text-xs font-semibold uppercase tracking-wide text-muted">
        EventGuard request path
      </figcaption>
      <div className="grid grid-cols-[minmax(0,1fr)_18px_minmax(0,1.15fr)_18px_minmax(0,1fr)] items-center gap-1.5">
        <ArchitectureNode title="Entry points" detail="CLI and Spring MVC" />
        <ArrowRight size={16} className="text-primary" aria-hidden="true" />
        <ArchitectureNode title="Application" detail="Import workflow" emphasis />
        <ArrowRight size={16} className="text-primary" aria-hidden="true" />
        <ArchitectureNode title="Persistence" detail="JDBC and PostgreSQL" />
      </div>
      <p className="text-[11px] leading-relaxed text-muted">
        Ports and adapters keep framework and persistence code outside the core.
      </p>
    </figure>
  );
}

function ArchitectureNode({
  title,
  detail,
  emphasis = false,
}: {
  title: string;
  detail: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`min-w-0 rounded-lg border px-2 py-2.5 text-center lg:px-3 lg:py-3 ${
        emphasis
          ? "border-primary/35 bg-primary/10"
          : "border-border bg-surface"
      }`}
    >
      <p className="text-[11px] font-semibold leading-tight text-text">
        {title}
      </p>
      <p className="mt-1 text-[10px] leading-tight text-muted">
        {detail}
      </p>
    </div>
  );
}

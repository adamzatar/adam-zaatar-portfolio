import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { ProjectMediaData } from "@/lib/content";

const frameClass =
  "flex aspect-video flex-col justify-center bg-gradient-to-br from-primary/10 via-bg to-bg p-4 sm:p-6";

export function ProjectMedia({
  media,
  sizes = "(min-width: 1024px) 560px, (min-width: 768px) 46vw, calc(100vw - 48px)",
}: {
  media: ProjectMediaData;
  sizes?: string;
}) {
  if (media.kind === "image") {
    return (
      <figure className="aspect-video overflow-hidden bg-bg">
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          className="h-full w-full object-cover"
          style={
            media.position ? { objectPosition: media.position } : undefined
          }
          sizes={sizes}
        />
      </figure>
    );
  }

  if (media.kind === "operating-systems") {
    return (
      <figure className={frameClass} role="img" aria-label={media.alt}>
        <div className="grid grid-cols-2 gap-3">
          {[
            [
              "/images/projects/thread-library-visualizer.webp",
              "Thread Library",
            ],
            [
              "/images/projects/virtual-memory-pager-visualizer.webp",
              "Virtual Memory Pager",
            ],
          ].map(([src, label]) => (
            <div
              key={label}
              className="min-w-0 overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
            >
              <Image
                src={src}
                alt=""
                width={1280}
                height={720}
                className="aspect-video h-auto w-full object-cover"
                sizes="(min-width: 1024px) 260px, (min-width: 768px) 22vw, 45vw"
              />
              <p className="border-t border-border px-2.5 py-1.5 text-xs font-semibold text-text">
                {label}
              </p>
            </div>
          ))}
        </div>
      </figure>
    );
  }

  if (media.kind === "durable-runner") {
    const steps = [
      ["Worker A", "claims v1"],
      ["A freezes", "lease expires"],
      ["Worker B", "claims v2, completes"],
      ["A resumes", "v1 rejected"],
    ] as const;
    return (
      <figure className={frameClass} role="img" aria-label={media.alt}>
        <ol className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-1 sm:gap-2">
          {steps.map(([title, detail], index) => {
            const last = index === steps.length - 1;
            return (
              <li key={title} className="contents">
                <div
                  className={`min-w-0 rounded-lg border px-2 py-2.5 text-center sm:px-3 sm:py-3 ${
                    last
                      ? "border-primary bg-primary text-primary-contrast shadow-sm"
                      : "border-border bg-surface shadow-sm"
                  }`}
                >
                  <p className="text-[11px] font-semibold leading-tight sm:text-xs">
                    {title}
                  </p>
                  <p
                    className={`mt-1 text-[10px] leading-tight sm:text-[11px] ${
                      last ? "text-primary-contrast/85" : "text-muted"
                    }`}
                  >
                    {detail}
                  </p>
                </div>
                {last ? null : (
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </figure>
    );
  }

  return (
    <figure className={frameClass} role="img" aria-label={media.alt}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
        <div className="min-w-0 rounded-lg border border-border bg-surface px-3 py-3 text-center shadow-sm sm:py-4">
          <p className="text-[11px] font-medium text-muted sm:text-xs">
            Vendor
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-text sm:text-2xl">
            1,850 kW
          </p>
        </div>
        <span
          className="text-xl font-semibold text-primary sm:text-2xl"
          aria-hidden="true"
        >
          &lt;
        </span>
        <div className="min-w-0 rounded-lg border border-primary/35 bg-primary/10 px-3 py-3 text-center shadow-sm sm:py-4">
          <p className="text-[11px] font-medium text-muted sm:text-xs">
            Required
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-text sm:text-2xl">
            2,000 kW
          </p>
        </div>
      </div>
      <p className="mx-auto mt-4 w-fit rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-semibold text-primary-contrast sm:text-xs">
        NON_COMPLIANT
      </p>
    </figure>
  );
}

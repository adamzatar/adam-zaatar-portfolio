"use client";

import * as React from "react";
import { type Variants } from "framer-motion";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

export type ResearchCardProps = {
  title: string;
  description: string;
  /** Can be an absolute URL or a public path like `/research/My Paper.pdf`. */
  paperUrl: string;
  delay?: number;
};

/* --------------------------------
   Motion
--------------------------------- */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut", delay },
  },
});

/* --------------------------------
   URL normalizer — safe for spaces
   - Trims stray spaces
   - Leaves http(s), mailto, tel, data intact
   - Ensures leading slash for app assets
   - Collapses accidental double slashes
   - Uses encodeURI to avoid double-encoding
--------------------------------- */
function toSafeHref(raw: string): string {
  const src = (raw ?? "").trim(); // trim leading/trailing spaces (incl. the “leading space” filename gotcha)

  // Already an absolute/external URL (or special schemes) → pass through
  if (
    /^https?:\/\//i.test(src) ||
    /^mailto:/i.test(src) ||
    /^tel:/i.test(src) ||
    /^data:/i.test(src)
  ) {
    return src;
  }

  // Local/public asset path
  // Ensure it starts with a single leading slash (public files are served from /)
  const withLeadingSlash = src.startsWith("/") ? src : `/${src}`;

  // Collapse accidental duplicate slashes, but we don't have protocol here
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");

  // Safely encode spaces and other unsafe chars in the path while preserving slashes
  // encodeURI won't re-encode existing % escapes
  return encodeURI(collapsed);
}

/* --------------------------------
   Component
--------------------------------- */
export function ResearchCard({
  title,
  description,
  paperUrl,
  delay = 0,
}: ResearchCardProps) {
  const href = React.useMemo(() => toSafeHref(paperUrl), [paperUrl]);

  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Card
        variant="surface"
        padding="md"
        interactive
        className="group relative overflow-hidden"
      >
        {/* Subtle token-aware glow on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                     bg-linear-to-tr from-[color-mix(in_oklab,var(--primary) 8%,transparent)]
                     via-transparent to-[color-mix(in_oklab,var(--secondary) 8%,transparent)]"
        />

        <CardHeader className="relative z-10 px-0 pt-0 pb-2">
          <CardTitle
            className="text-xl sm:text-2xl bg-clip-text text-transparent
                       bg-linear-to-r from-(--primary) to-(--secondary)"
          >
            {title}
          </CardTitle>
          {/* Keep for structure; body text is in CardContent for spacing */}
          <CardDescription className="sr-only">{description}</CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 px-0">
          <p className="text-base leading-relaxed text-foreground/85">
            {description}
          </p>
        </CardContent>

        <CardFooter className="relative z-10 px-0 pt-4">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="gap-2 transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open paper: ${title}`}
            >
              <FileText className="w-4 h-4" />
              Read Paper
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
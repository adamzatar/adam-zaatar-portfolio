"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import AppImage from "@/components/AppImage";
import type { ImageKey } from "@/lib/images";

/* ----------------------------
   Motion
----------------------------- */
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.12 },
  },
});

/* ----------------------------
   Data (typed ImageKey)
   NOTE:
   - bowdoinMarketplace must exist in lib/images.ts (maps to /public/images/bowdoinmarketplace.png)
   - placeholder used for “Upcoming”
----------------------------- */
type AppItem = {
  title: string;
  description: string;
  technologies: string[];
  appStoreLink?: string;
  image: ImageKey;
  alt: string;
};

const APPS: AppItem[] = [
  {
    title: "Cutaway",
    description:
      "Creator tool for fast multi-perspective storytelling: pick a main video, capture reaction shots, and Cutaway auto-alternates into a punchy timeline with sensible defaults (cross-dissolves, lower-thirds, optional music/bleeps), live preview, and export.",
    technologies: ["Swift", "SwiftUI", "AVFoundation", "Xcode"],
    // appStoreLink: "https://apps.apple.com/...", // add when live
    image: "cutaway",
    alt: "Cutaway app preview screenshot",
  },
  {
    title: "Bowdoin Marketplace",
    description:
      "Campus marketplace enabling peer-to-peer listings and exchanges. Designed for speed, reliability, and a frictionless UX.",
    technologies: ["Swift", "SwiftUI", "CoreData", "REST APIs"],
    // appStoreLink: "https://apps.apple.com/...", // add when live
    image: "bowdoinMarketplace",
    alt: "Bowdoin Marketplace app screenshot",
  },
  {
    title: "Upcoming Releases",
    description:
      "Additional iOS apps in active development focused on finance, productivity, and education.",
    technologies: ["Swift", "SwiftUI", "AI APIs"],
    image: "placeholder",
    alt: "Placeholder for upcoming iOS apps",
  },
];

/* ----------------------------
   ShimmerImage (AppImage + loader)
----------------------------- */
function ShimmerImage({
  image,
  alt,
  sizes,
  className,
  objectFit = "cover",
}: {
  image: ImageKey;
  alt: string;
  sizes?: string;
  className?: string;
  objectFit?: "cover" | "contain";
}) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={`relative w-full h-64 rounded-t-2xl overflow-hidden ${className ?? ""}`}>
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse bg-gradient-to-r
                     from-[color-mix(in_oklab,var(--surface) 55%,transparent)]
                     via-[color-mix(in_oklab,var(--surface) 75%,transparent)]
                     to-[color-mix(in_oklab,var(--surface) 55%,transparent)]"
        />
      )}
      <AppImage
        image={image}
        alt={alt}
        fill
        priority={false}
        sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} object-${objectFit}`}
        onLoadingComplete={() => setLoaded(true)}
      />
      {/* readability wash on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      {/* shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
    </div>
  );
}

/* ----------------------------
   Chip
----------------------------- */
function TechChip({ label }: { label: string }) {
  return (
    <span
      className="px-3 py-1 text-xs font-medium rounded-full border
                 border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                 bg-[color-mix(in_oklab,var(--surface) 65%,transparent)]
                 text-foreground/85 shadow-[0_1px_6px_rgba(0,0,0,0.08)]"
    >
      {label}
    </span>
  );
}

/* ----------------------------
   Card
----------------------------- */
function IOSAppCard({ item }: { item: AppItem }) {
  const hasStoreLink = Boolean(item.appStoreLink);

  return (
    <Card
      variant="surface"
      padding="none"
      interactive
      className="group h-full flex flex-col overflow-hidden"
      aria-label={item.title}
    >
      {/* Media */}
      <ShimmerImage image={item.image} alt={item.alt} />

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--primary)] transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-foreground/80 leading-relaxed flex-1">{item.description}</p>

        {/* Tech */}
        {item.technologies?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.technologies.map((t) => (
              <li key={t}>
                <TechChip label={t} />
              </li>
            ))}
          </ul>
        )}

        {/* Action (only if real link) */}
        {hasStoreLink && (
          <a
            href={item.appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center font-semibold text-[var(--primary)]
                       hover:text-[var(--secondary)] transition-colors"
            aria-label={`View ${item.title} on the App Store`}
          >
            View on App Store →
          </a>
        )}
      </div>
    </Card>
  );
}

/* ----------------------------
   Section
----------------------------- */
export default function IOSApps() {
  return (
    <section
      id="ios-apps"
      aria-labelledby="ios-apps-heading"
      className="relative py-28 bg-gradient-to-b from-surface/80 to-bg overflow-hidden"
    >
      {/* Decorative background glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-[var(--primary)]/12 via-[var(--secondary)]/12 to-[var(--accent)]/12 blur-2xl opacity-50"
      />

      <Container className="text-center">
        {/* Heading */}
        <motion.h2
          id="ios-apps-heading"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="text-4xl sm:text-5xl font-extrabold
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                     bg-clip-text text-transparent drop-shadow-sm"
        >
          iOS Applications
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={fadeUp(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="mt-5 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          A showcase of iOS apps engineered with Swift and SwiftUI — blending performance,
          clean UI, and a seamless user experience. App Store launches coming soon.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mt-10 mb-14 h-[3px] w-44 mx-auto bg-gradient-to-r
                     from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                     rounded-full origin-center"
          aria-hidden
        />

        {/* Cards Grid */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {APPS.map((item, index) => (
            <motion.li key={item.title} variants={fadeUp(index + 1)} className="h-full">
              <IOSAppCard item={item} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
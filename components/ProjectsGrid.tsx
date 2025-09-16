"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import AppImage from "@/components/AppImage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { ImageKey } from "@/lib/images";

/* ----------------------------
   Motion
----------------------------- */
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
  },
});

/* ----------------------------
   Types
----------------------------- */
type Project = {
  title: string;
  description: string;
  image: ImageKey;
  alt: string;
  technologies: string[];
  codeLink?: string;
  demoLink?: string;
};

/* ----------------------------
   Data — Apps
----------------------------- */
const APPS: Project[] = [
  {
    title: "Cutaway",
    description:
      "Cross-platform video editor for synchronized multi-angle recording & playback. Built in SwiftUI with AVFoundation, currently in TestFlight.",
    image: "cutaway",
    alt: "Cutaway multi-angle editing app",
    technologies: ["Swift", "SwiftUI", "AVFoundation"],
    codeLink: "https://github.com/adamzatar/cutaway",
  },
  {
    title: "Vector",
    description:
      "Next-gen 2FA platform with a SwiftUI client and Vapor/Swift backend. Time-based tokens, AWS SES verification, session handling, and Postgres.",
    image: "vector",
    alt: "Vector 2FA security platform",
    technologies: ["Swift", "SwiftUI", "Vapor", "PostgreSQL", "AWS SES"],
    codeLink: "https://github.com/adamzatar/vector",
  },
  {
    title: "Investify",
    description:
      "Educational stock trading simulator with live S&P 500 data for classroom use at Bowdoin Economics. Charts, portfolios, and order flows.",
    image: "certificate", // placeholder graphic for now
    alt: "Investify stock trading simulator",
    technologies: ["Swift", "SwiftUI", "Firebase", "Yahoo Finance API"],
    codeLink: "https://github.com/adamzatar/investify",
  },
];

/* ----------------------------
   Data — Websites & Platforms
----------------------------- */
const SITES: Project[] = [
  {
    title: "Bowdoin Marketplace",
    description:
      "Production-grade campus marketplace: Okta auth, Prisma/Postgres, Redis rate limiting, AWS SES, and OpenTelemetry. Monorepo with pnpm.",
    image: "bowdoinMarketplace",
    alt: "Bowdoin Marketplace platform",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "AWS SES"],
    codeLink: "https://github.com/adamzatar/bowdoin-marketplace",
  },
  {
    title: "PalPrep",
    description:
      "Advocacy platform: donations, applications, and learning hub in one stack. Next.js 15, Prisma/Postgres, TailwindCSS, Stripe.",
    image: "palprep",
    alt: "PalPrep advocacy platform",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "TailwindCSS", "Stripe"],
    codeLink: "https://github.com/adamzatar/palprep",
  },
  {
    title: "Personal Portfolio",
    description:
      "High-performance Next.js + TypeScript site with animations, accessibility, and SEO. Deployed on Vercel.",
    image: "personalPortfolio",
    alt: "Personal portfolio website",
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "Vercel"],
    codeLink: "https://github.com/adamzatar/adam-zaatar-portfolio",
  },
];

/* ----------------------------
   Small UI bits
----------------------------- */
function TechBadges({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies used">
      {items.map((t) => (
        <li key={t}>
          <span className="inline-flex items-center rounded-full border border-border/70 bg-surface/70 px-2.5 py-1 text-[11px] leading-4 text-foreground/80 shadow-sm">
            {t}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------
   Cards
----------------------------- */
function AppCard({ title, description, image, alt, technologies, codeLink, demoLink }: Project) {
  return (
    <Card variant="elevated" padding="md" interactive className="flex h-full flex-col">
      {/* Media */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl">
        <AppImage
          image={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.06]"
          priority={false}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      {/* Body */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        <TechBadges items={technologies} />

        {(codeLink || demoLink) && (
          <div className="mt-5 flex gap-3">
            {demoLink && (
              <Button asChild size="sm" variant="primary">
                <a href={demoLink} target="_blank" rel="noopener noreferrer" aria-label={`Open live demo for ${title}`}>
                  Live Demo
                </a>
              </Button>
            )}
            {codeLink && (
              <Button asChild size="sm" variant="outline">
                <a href={codeLink} target="_blank" rel="noopener noreferrer" aria-label={`Open GitHub for ${title}`}>
                  View Code
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

function WebsiteCard({ title, description, image, alt, technologies, codeLink, demoLink }: Project) {
  return (
    <Card variant="surface" padding="md" interactive className="flex h-full flex-col">
      {/* Media */}
      <div className="relative h-40 w-full overflow-hidden rounded-xl">
        <AppImage
          image={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      {/* Body */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        <TechBadges items={technologies} />

        {(codeLink || demoLink) && (
          <div className="mt-5 flex gap-3">
            {demoLink && (
              <Button asChild size="sm" variant="primary">
                <a href={demoLink} target="_blank" rel="noopener noreferrer" aria-label={`Open live site for ${title}`}>
                  Visit Site
                </a>
              </Button>
            )}
            {codeLink && (
              <Button asChild size="sm" variant="outline">
                <a href={codeLink} target="_blank" rel="noopener noreferrer" aria-label={`Open GitHub for ${title}`}>
                  GitHub
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

/* ----------------------------
   Section
----------------------------- */
export default function ProjectsGrid() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative overflow-hidden py-28">
      {/* Subtle global glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_-10%,color-mix(in_oklab,var(--primary) 14%,transparent),transparent_70%)]"
      />

      <Container>
        {/* Header */}
        <motion.header
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center"
        >
          <h2
            id="projects-heading"
            className="text-pretty text-4xl sm:text-5xl font-extrabold tracking-tight
                       bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                       bg-clip-text text-transparent drop-shadow-sm"
          >
            Projects
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            A curated selection of apps and full-stack platforms—engineered for performance, security, and polish.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mx-auto mt-8 h-[3px] w-44 origin-center rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]"
            aria-hidden
          />
        </motion.header>

        {/* Apps */}
        <motion.section
          aria-labelledby="apps-heading"
          variants={fadeUp(0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14"
        >
          <h3 id="apps-heading" className="mb-8 text-center text-2xl font-bold text-foreground">
            Apps
          </h3>

          <motion.ul
            role="list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {APPS.map((p, i) => (
              <motion.li key={p.title} variants={fadeUp(i + 1)} className="h-full">
                <AppCard {...p} />
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Websites & Platforms */}
        <motion.section
          aria-labelledby="sites-heading"
          variants={fadeUp(0.8)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-20"
        >
          <h3 id="sites-heading" className="mb-8 text-center text-2xl font-bold text-foreground">
            Websites & Platforms
          </h3>

          <motion.ul
            role="list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SITES.map((p, i) => (
              <motion.li key={p.title} variants={fadeUp(i + 1)} className="h-full">
                <WebsiteCard {...p} />
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
      </Container>
    </section>
  );
}
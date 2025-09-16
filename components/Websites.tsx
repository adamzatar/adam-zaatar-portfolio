"use client";

import * as React from "react";
import ProjectCard from "./ProjectCard";
import { Container } from "@/components/ui/Container";
import { motion, type Variants } from "framer-motion";
import type { ImageKey } from "@/lib/images";

/* ----------------------------
   Motion
----------------------------- */
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.12 },
  },
});

/* ----------------------------
   Data (typed & safe via ImageKey)
----------------------------- */
type SiteItem = {
  title: string;
  description: string;
  technologies: string[];
  link: string; // live or repo
  image: ImageKey;
  alt: string;
};

const SITES = [
  {
    title: "Bowdoin Marketplace",
    description:
      "TypeScript monorepo marketplace (Next.js, Prisma/PostgreSQL, Redis, AWS SES) for authenticated campus/community buying & selling with peer messaging. Includes pnpm workspaces, Okta SSO + passwordless, Redis rate-limiting, transactional emails, audit logging, observability, and CI/CD with deterministic builds.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "AWS SES"],
    link: "https://github.com/adamzatar/bowdoin-marketplace", // replace with live link when ready
    image: "bowdoinMarketplace",
    alt: "Screenshot of Bowdoin Marketplace platform built with Next.js and Prisma",
  },
  {
    title: "PalPrep",
    description:
      "Advocacy platform built with Next.js 15, Prisma/PostgreSQL, TailwindCSS, and Stripe. Applications, donations, marketing, and a learning hub unified into one full-stack platform.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "TailwindCSS", "Stripe"],
    link: "https://github.com/adamzatar/palprep", // replace with live link when ready
    image: "palprep",
    alt: "PalPrep advocacy platform with donations, learning hub, and user dashboard",
  },
  {
    title: "Personal Portfolio",
    description:
      "Full-stack Next.js 15 + TailwindCSS portfolio showcasing iOS apps, research, and professional experience. Animated, painterly background with clouds and particles; deployed on Vercel.",
    technologies: ["Next.js", "React", "TailwindCSS", "TypeScript", "Vercel"],
    link: "https://adamzaatarportfolio.vercel.app",
    image: "personalPortfolio",
    alt: "Adam Zaatar personal portfolio website built with Next.js and TailwindCSS",
  },
] satisfies SiteItem[];

/* ----------------------------
   Component
----------------------------- */
export default function Websites() {
  return (
    <section
      id="websites"
      aria-labelledby="websites-heading"
      className="relative py-24 bg-gradient-to-b from-surface/80 to-bg overflow-hidden"
    >
      {/* Soft background glow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10
                   bg-[radial-gradient(60%_40%_at_50%_-10%,color-mix(in_oklab,var(--primary) 14%,transparent),transparent_70%)]"
      />

      <Container className="text-center">
        {/* Heading */}
        <motion.h2
          id="websites-heading"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                     bg-clip-text text-transparent drop-shadow-sm"
        >
          Web Platforms
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={fadeUp(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-5 text-lg text-muted max-w-3xl mx-auto leading-relaxed"
        >
          Full-stack platforms engineered for speed, reliability, and scalability — from
          campus marketplaces to advocacy hubs.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
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
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {SITES.map((site, index) => (
            <motion.li key={site.title} variants={fadeUp(index + 1)} className="h-full">
              <ProjectCard
                title={site.title}
                description={site.description}
                technologies={site.technologies}
                codeLink={site.link}
                image={site.image}
                alt={site.alt}
              />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
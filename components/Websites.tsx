"use client";

import ProjectCard from "./ProjectCard";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const sites = [
  {
    title: "Bowdoin Marketplace",
    description:
      "Building and scaling a TypeScript monorepo marketplace platform (Next.js, Prisma/PostgreSQL, Redis, AWS SES) for authenticated campus/community buying, selling, and peer messaging. Includes pnpm-based monorepo architecture, secure auth (Okta SSO + passwordless email), Redis rate limiting, transactional emails, audit logging, observability, and CI/CD with deterministic builds.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "AWS SES",
    ],
    link: "https://github.com/adamzatar/bowdoin-marketplace", // replace with live link
    image: "/images/projects/bowdoin-marketplace.png",
    alt: "Screenshot of Bowdoin Marketplace platform with Next.js and Prisma",
  },
  {
    title: "PalPrep",
    description:
      "Advocacy platform built with Next.js 15, Prisma/PostgreSQL, TailwindCSS, and Stripe. Integrates applications, donations, marketing, and a learning hub into one full-stack web platform.",
    technologies: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "TailwindCSS",
      "Stripe",
    ],
    link: "https://github.com/adamzatar/palprep", // replace with live link
    image: "/images/projects/palprep.jpg",
    alt: "PalPrep advocacy platform with donations, learning hub, and user dashboard",
  },
  {
    title: "Personal Portfolio",
    description:
      "A full-stack Next.js 15 + TailwindCSS portfolio website showcasing iOS apps, research, and professional experience. Deployed on Vercel.",
    technologies: ["Next.js", "React", "TailwindCSS", "TypeScript", "Vercel"],
    link: "https://adamzaatarportfolio.vercel.app", // Update if custom domain
    image: "",
    alt: "Personal portfolio website of Adam Zaatar built with Next.js and TailwindCSS",
  },
];

export default function Websites() {
  return (
    <section id="websites" className="py-20 bg-surface dark:bg-bg">
      <Container className="text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-text"
        >
          Web Platforms
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-lg text-muted max-w-2xl mx-auto"
        >
          Full-stack web platforms delivering speed, reliability, and scalability
          — from campus marketplaces to global advocacy hubs.
        </motion.p>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site, index) => (
            <motion.div
              key={site.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <ProjectCard {...site} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
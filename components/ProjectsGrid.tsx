"use client";

import { motion, Variants } from "framer-motion";
import ProjectCard, { type ProjectCardProps } from "./ProjectCard";
import { Container } from "@/components/ui/Container";
import AppImage from "@/components/AppImage";
import { type ImageKey } from "@/lib/images";

const fadeUp = (i: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.1, 0.25, 1],
      delay: i * 0.05, // ⚡ faster cascade
    },
  },
});

// ----------------------------
// Project Type
// ----------------------------
type Project = Omit<ProjectCardProps, "image" | "imageComponent"> & {
  image: ImageKey;
  alt: string;
};

// ----------------------------
// Apps
// ----------------------------
const apps: Project[] = [
  {
    title: "Cutaway",
    description:
      "Cross-platform video editing app enabling synchronized multi-angle recording and playback. Built with SwiftUI and AVFoundation, it introduces seamless workflows for creators and is currently in TestFlight beta.",
    image: "cutaway",
    alt: "Cutaway multi-angle editing app",
    technologies: ["Swift", "SwiftUI", "AVFoundation"],
    codeLink: "https://github.com/adamzatar/cutaway",
  },
  {
    title: "Vector",
    description:
      "Next-generation two-factor authentication platform with a SwiftUI client and a Vapor/Swift backend. Implements token-based security, PostgreSQL persistence, and AWS SES for automated verification emails — designed as a production-grade 2FA system.",
    image: "vector",
    alt: "Vector 2FA security platform",
    technologies: ["Swift", "SwiftUI", "Vapor", "PostgreSQL", "AWS SES"],
    codeLink: "https://github.com/adamzatar/vector",
  },
  {
    title: "Investify",
    description:
      "Educational stock trading simulator delivering live S&P 500 data via Yahoo Finance API. Built with SwiftUI and Firebase, it powers classroom use at Bowdoin Economics, combining finance education with real-time data visualization.",
    image: "certificate",
    alt: "Investify stock trading simulator",
    technologies: ["Swift", "SwiftUI", "Firebase", "Yahoo Finance API"],
    codeLink: "https://github.com/adamzatar/investify",
  },
  {
    title: "Instagram Clone",
    description:
      "A polished Instagram-inspired social media clone featuring real-time posts, likes, and comments. Built with Next.js and Firebase for full-stack functionality.",
    image: "instagramClone",
    alt: "Instagram clone project",
    technologies: ["Next.js", "Firebase", "TailwindCSS"],
    codeLink: "#",
  },
  {
    title: "Twitter Clone",
    description:
      "A modern Twitter-inspired platform with user authentication, posting, and interactive timelines. Designed with scalability and sleek UI in mind.",
    image: "twitterClone",
    alt: "Twitter clone project",
    technologies: ["Next.js", "TypeScript", "Prisma"],
    codeLink: "#",
  },
];

// ----------------------------
// Websites & Platforms
// ----------------------------
const websites: Project[] = [
  {
    title: "Bowdoin Marketplace",
    description:
      "Production-grade campus marketplace platform built as a TypeScript monorepo. Features secure authentication (Okta + email), Prisma/PostgreSQL persistence, Redis-backed rate limiting, transactional emails via AWS SES, and full observability through OpenTelemetry. Designed for scale, security, and seamless peer-to-peer commerce.",
    image: "bowdoinMarketplace",
    alt: "Bowdoin Marketplace platform",
    technologies: ["Next.js", "TypeScript", "Prisma", "Redis", "AWS SES"],
    codeLink: "https://github.com/adamzatar/bowdoin-marketplace",
  },
  {
    title: "PalPrep",
    description:
      "Full-stack advocacy platform integrating applications, donations, marketing, and a learning hub. Built with Next.js, Prisma/Postgres, TailwindCSS, and Stripe, it demonstrates robust backend logic paired with a polished frontend for mission-driven organizations.",
    image: "palprep",
    alt: "PalPrep advocacy platform",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "TailwindCSS", "Stripe"],
    codeLink: "https://github.com/adamzatar/palprep",
  },
  {
    title: "Personal Portfolio",
    description:
      "High-performance portfolio site showcasing apps, research, and professional experience. Built with Next.js, TypeScript, TailwindCSS, shadcn/ui, and deployed on Vercel with full CI/CD, SEO optimization, accessibility (WCAG 2.2 AA), and analytics integrations.",
    image: "personalPortfolio",
    alt: "Personal Portfolio website",
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "Vercel"],
    codeLink: "https://github.com/adamzatar/adam-zaatar-portfolio",
  },
];

// ----------------------------
// Component
// ----------------------------
export default function ProjectsGrid() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-surface/80 to-bg overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 will-change-[transform,opacity]"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent drop-shadow-sm">
            Projects
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            A curated selection of cross-platform apps, full-stack platforms,
            and fintech-inspired builds — blending strong infrastructure with
            user-focused design.
          </p>
        </motion.div>

        {/* Apps */}
        <motion.div
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 will-change-[transform,opacity]"
        >
          <h3 className="text-2xl font-bold text-text mb-8 text-center">
            Apps
          </h3>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((project, idx) => (
              <motion.div
                key={project.title}
                variants={fadeUp(idx)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, rotateX: 1.5, rotateY: -1.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="transform-gpu will-change-[transform,opacity]"
              >
                <ProjectCard
                  {...project}
                  imageComponent={
                    <AppImage
                      image={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover"
                    />
                  }
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Websites */}
        <motion.div
          variants={fadeUp(2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="will-change-[transform,opacity]"
        >
          <h3 className="text-2xl font-bold text-text mb-8 text-center">
            Websites & Platforms
          </h3>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {websites.map((project, idx) => (
              <motion.div
                key={project.title}
                variants={fadeUp(idx)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, rotateX: 1.5, rotateY: -1.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="transform-gpu will-change-[transform,opacity]"
              >
                <ProjectCard
                  {...project}
                  imageComponent={
                    <AppImage
                      image={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover"
                    />
                  }
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-2xl opacity-50" />
    </section>
  );
}
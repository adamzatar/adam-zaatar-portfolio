"use client";

import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import AppImage from "@/components/AppImage";
import { Card } from "@/components/ui/Card";
import { type ImageKey } from "@/lib/images";

// ----------------------------
// Motion Variants
// ----------------------------
const fadeUp = (i: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.1, 0.25, 1],
      delay: i * 0.1,
    },
  },
});

// ----------------------------
// Types
// ----------------------------
type Project = {
  title: string;
  description: string;
  image: ImageKey;
  alt: string;
  technologies: string[];
  codeLink?: string;
};

// ----------------------------
// Apps
// ----------------------------
const apps: Project[] = [
  {
    title: "Cutaway",
    description:
      "Cross-platform video editing app enabling synchronized multi-angle recording and playback. Built with SwiftUI and AVFoundation, currently in TestFlight beta.",
    image: "cutaway",
    alt: "Cutaway multi-angle editing app",
    technologies: ["Swift", "SwiftUI", "AVFoundation"],
    codeLink: "https://github.com/adamzatar/cutaway",
  },
  {
    title: "Vector",
    description:
      "Next-generation two-factor authentication platform with a SwiftUI client and a Vapor/Swift backend. Implements token-based security and AWS SES verification.",
    image: "vector",
    alt: "Vector 2FA security platform",
    technologies: ["Swift", "SwiftUI", "Vapor", "PostgreSQL", "AWS SES"],
    codeLink: "https://github.com/adamzatar/vector",
  },
  {
    title: "Investify",
    description:
      "Educational stock trading simulator with real-time S&P 500 data. Used in Bowdoin Economics classrooms to blend finance education with live markets.",
    image: "certificate",
    alt: "Investify stock trading simulator",
    technologies: ["Swift", "SwiftUI", "Firebase", "Yahoo Finance API"],
    codeLink: "https://github.com/adamzatar/investify",
  },
];

// ----------------------------
// Websites & Platforms
// ----------------------------
const websites: Project[] = [
  {
    title: "Bowdoin Marketplace",
    description:
      "Production-grade campus marketplace with Okta auth, Prisma/Postgres, Redis rate limiting, AWS SES emails, and OpenTelemetry monitoring.",
    image: "bowdoinMarketplace",
    alt: "Bowdoin Marketplace platform",
    technologies: ["Next.js", "TypeScript", "Prisma", "Redis", "AWS SES"],
    codeLink: "https://github.com/adamzatar/bowdoin-marketplace",
  },
  {
    title: "PalPrep",
    description:
      "Full-stack advocacy platform integrating donations, applications, and a learning hub. Built with Next.js, Prisma, Postgres, TailwindCSS, and Stripe.",
    image: "palprep",
    alt: "PalPrep advocacy platform",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "TailwindCSS", "Stripe"],
    codeLink: "https://github.com/adamzatar/palprep",
  },
  {
    title: "Personal Portfolio",
    description:
      "High-performance portfolio built with Next.js + TypeScript, deployed on Vercel with SEO, analytics, and full accessibility compliance.",
    image: "personalPortfolio",
    alt: "Personal Portfolio website",
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "Vercel"],
    codeLink: "https://github.com/adamzatar/adam-zaatar-portfolio",
  },
];

// ----------------------------
// Reusable Card Components
// ----------------------------
function AppCard({ title, description, image, alt, codeLink }: Project) {
  return (
    <Card
      variant="elevated"
      interactive
      padding="md"
      className="flex flex-col bg-white dark:bg-[#161b22] border border-border 
                 shadow-md hover:shadow-xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <AppImage image={image} alt={alt} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-text">{title}</h3>
        <p className="text-sm text-muted flex-1">{description}</p>
        {codeLink && (
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-semibold text-[var(--primary)] hover:underline"
          >
            View Code →
          </a>
        )}
      </div>
    </Card>
  );
}

function WebsiteCard({ title, description, image, alt, codeLink }: Project) {
  return (
    <Card
      variant="surface"
      interactive
      padding="md"
      className="flex flex-col bg-white dark:bg-[#161b22] border border-border 
                 shadow-sm hover:shadow-lg transition-all duration-500"
    >
      {/* Banner Image */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
        <AppImage image={image} alt={alt} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2 text-text">{title}</h3>
        <p className="text-sm text-muted flex-1">{description}</p>
        {codeLink && (
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-medium text-[var(--primary)] hover:underline"
          >
            GitHub →
          </a>
        )}
      </div>
    </Card>
  );
}

// ----------------------------
// Section
// ----------------------------
export default function ProjectsGrid() {
  return (
    <section className="relative py-28 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent drop-shadow-sm">
            Projects
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            A curated selection of apps, platforms, and full-stack builds — blending strong infrastructure with clean, user-focused design.
          </p>
        </motion.div>

        {/* Apps Section */}
        <motion.div
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-text mb-8 text-center">Apps</h3>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((project, idx) => (
              <motion.div
                key={project.title}
                variants={fadeUp(idx)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <AppCard {...project} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Websites Section */}
        <motion.div
          variants={fadeUp(2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
              >
                <WebsiteCard {...project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 
                      bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 
                      blur-2xl opacity-40" />
    </section>
  );
}
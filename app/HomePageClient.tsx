"use client";

import Link from "next/link";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useEffect } from "react";

import { Container } from "@/components/ui/Container";
import AppImage from "@/components/AppImage";
import {
  buttonBase,
  cardBase,
  chipBase,
  fadeUp,
  gradients,
  shadows,
  staggerContainer,
  textStyles,
} from "@/lib/ui";

/* ==============================
   💡 Data Definitions
============================== */
const focusChips = [
  "Cloud Architecture",
  "AI Platform",
  "Identity & Security",
  "Observability",
  "FinOps",
];

const capabilities = [
  "AWS Cognito, ECS, Lambda",
  "Infrastructure as Code & Policy Guardrails",
  "Telemetry-first Monitoring & Incident Response",
  "Passkey, Biometric, and Secure Session Flows",
  "Cost Modeling and FinOps Playbooks",
];

const projects = [
  {
    title: "Bowdoin Marketplace",
    summary:
      "Honors research in progress: building a student marketplace with faculty collaboration to explore how supply, demand, and pricing affect social efficiency and campus access.",
    stack: ["Next.js", "Node", "PostgreSQL", "AWS Cognito"],
    link: "https://github.com/adamzatar/bowdoin-marketplace",
    image: "bowdoinMarketplace",
  },
  {
    title: "Vector 2FA",
    summary:
      "SwiftUI + Vapor prototype delivering passkey onboarding, biometric fallback, and encrypted offline vaults.",
    stack: ["SwiftUI", "Vapor", "Security"],
    link: "https://github.com/adamzatar/vector",
    image: "vector",
  },
  {
    title: "Cutaway",
    summary:
      "Lightweight iOS creator tool for multi-perspective mini-episodes. On-device editing, instant preview, and export — built for speed and privacy.",
    stack: ["SwiftUI", "AVFoundation"],
    link: "https://github.com/adamzatar/cutaway",
    image: "cutaway",
  },
];

const certifications = [
  "AI A–Z (Udemy, 2025)",
  "Foundation Stock Trading (Udemy, 2025)",
  "AWS Solutions Architect (in progress)",
  "CompTIA Security+ (in progress)",
  "Azure Fundamentals (in progress)",
];


/* ==============================
   🎨 Style Tokens
============================== */
const resumeButtonClass = clsx(
  buttonBase,
  "px-6 py-3 text-base text-white bg-linear-to-r from-[#5269ff] via-[#6d6bff] to-[#43d7bd]",
  "shadow-[0_20px_48px_rgba(84,108,255,0.32)] hover:-translate-y-0.5",
  "hover:shadow-[0_26px_60px_rgba(84,108,255,0.34)]"
);

const outlineButtonClass = clsx(
  buttonBase,
  "px-6 py-3 text-base text-foreground bg-white/80 dark:bg-[color-mix(in_oklab,var(--surface) 75%,transparent)]",
  "border border-[color-mix(in_oklab,var(--border) 55%,transparent)] hover:border-[var(--primary)]",
  "hover:text-(--primary) hover:-translate-y-0.5"
);

const chipClass = clsx(
  chipBase,
  "text-foreground/80 hover:text-foreground hover:-translate-y-0.5",
  "hover:shadow-[0_16px_32px_rgba(25,32,64,0.18)]"
);

const projectCardClass = clsx(
  cardBase,
  shadows.card,
  "group h-full rounded-3xl bg-white/90 dark:bg-[color-mix(in_oklab,var(--surface) 80%,transparent)] p-8",
  "transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_34px_68px_rgba(18,24,56,0.28)]"
);

const certificationCardClass = clsx(
  cardBase,
  shadows.soft,
  "rounded-2xl bg-white/90 dark:bg-[color-mix(in_oklab,var(--surface) 78%,transparent)] p-6",
  "transition-transform duration-400 hover:-translate-y-1 hover:shadow-[0_28px_52px_rgba(18,24,56,0.22)]"
);

/* ==============================
   🌤️ Main Page Component
============================== */
export default function HomePageClient() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.debug("[HomePageClient] mounted");
      console.debug("[HomePageClient] focus chips:", focusChips.join(", "));
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-hidden text-foreground dark:text-foreground">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <FinalCTASection />
      </main>
    </MotionConfig>
  );
}

/* ==============================
   🪐 Hero Section (Cloud + Rain)
============================== */
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient overlays for atmospheric depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.3)_100%)]"
        style={{ zIndex: -25 }}
      />

      <Container className="relative z-10 grid items-center gap-16 py-28 lg:grid-cols-[1.35fr_1fr]">
        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--border) 45%,transparent)] bg-white/70 px-4 py-2 text-sm font-medium text-foreground/75 shadow-sm backdrop-blur dark:bg-[color-mix(in_oklab,var(--surface) 70%,transparent)]"
            variants={fadeUp(0)}
          >
            <span className="h-2 w-2 rounded-full bg-[#43d7bd]" />
            Systems-minded builder • Cloud • AI • Security
          </motion.span>

          <motion.h1
            className={clsx(
              "text-pretty text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl",
              gradients.heroText
            )}
            variants={fadeUp(1)}
          >
            Hey, I’m Adam Zaatar — I build scalable systems where cloud, AI, and security converge.
          </motion.h1>

          <motion.p
            className={clsx("max-w-2xl text-lg sm:text-xl", textStyles.muted)}
            variants={fadeUp(2)}
          >
            Computer Science &amp; Economics @ Bowdoin. Focused on reliability and secure digital ecosystems that scale sustainably. Seeking 2025 roles in Cloud, SRE, or AI Security — ideally with teams engineering resilient, measurable systems.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={fadeUp(3)}
          >
            {focusChips.map((chip) => (
              <span key={chip} className={chipClass}>
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-4 pt-2"
            variants={fadeUp(4)}
          >
            <Link
              href="/resume/AdamZaatar_CV_2025.pdf"
              className={resumeButtonClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 View Resume
            </Link>
            <Link href="/projects" className={outlineButtonClass}>
              🚀 Explore Projects
            </Link>
          </motion.div>
        </motion.div>

        <motion.figure
          className={clsx(
            cardBase,
            shadows.soft,
            "mx-auto h-full max-w-[420px] rounded-3xl border-[color-mix(in_oklab,var(--border) 45%,transparent)] bg-white/85 p-2 backdrop-blur-xl dark:bg-[color-mix(in_oklab,var(--surface) 78%,transparent)]"
          )}
          variants={fadeUp(1.5)}
          initial="hidden"
          animate="visible"
        >
          <AppImage
            image="profileHome"
            alt="Adam Zaatar — portrait"
            width={560}
            height={680}
            withShimmer
            className="h-full w-full rounded-[26px] object-cover"
            sizes="(min-width: 1280px) 420px, (min-width: 768px) 360px, 80vw"
          />
        </motion.figure>
      </Container>
    </section>
  );
}

/* ==============================
   🧠 Skills Section
============================== */
function SkillsSection() {
  return (
    <section className="relative border-t border-[color-mix(in_oklab,var(--border) 40%,transparent)] bg-white/75 py-20 dark:bg-[color-mix(in_oklab,var(--surface) 82%,transparent)]">
      <Container className="relative z-10 flex flex-col gap-10">
        <motion.div
          className="max-w-3xl space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.span className="text-sm uppercase tracking-wide text-foreground/60" variants={fadeUp(0)}>
            how I build
          </motion.span>
          <motion.h2 className="text-pretty text-3xl font-semibold text-foreground sm:text-4xl" variants={fadeUp(1)}>
            Systems that stay observable, respectful of trust, and financially grounded.
          </motion.h2>
          <motion.p className={clsx("text-base", textStyles.muted)} variants={fadeUp(2)}>
            I pair infrastructure strategy with day-to-day shipping: codified guardrails, automated rollouts, and feedback loops that keep teams fast without sacrificing reliability.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {capabilities.map((capability, index) => (
            <motion.span key={capability} variants={fadeUp(index)} className={chipClass}>
              {capability}
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ==============================
   💼 Projects Section
============================== */
function ProjectsSection() {
  return (
    <section className="relative border-t border-[color-mix(in_oklab,var(--border) 40%,transparent)] bg-linear-to-b from-white via-[#eef2ff] to-white py-24 dark:from-[#060816] dark:via-[#0a0d1c] dark:to-[#060816]">
      <Container className="relative z-10 flex flex-col gap-12">
        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.span className="text-sm uppercase tracking-wide text-foreground/60" variants={fadeUp(0)}>
            featured work
          </motion.span>
          <motion.h2 className="text-pretty text-3xl font-semibold text-foreground sm:text-4xl" variants={fadeUp(1)}>
            Where infrastructure, security, and storytelling meet shipping.
          </motion.h2>
          <motion.p className={clsx("max-w-3xl text-base", textStyles.muted)} variants={fadeUp(2)}>
            A mix of production-grade architecture, experimental prototypes, and ongoing research projects exploring how systems shape behavior.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={fadeUp(index)}
              className={projectCardClass}
              whileHover={{ translateY: -12 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <span className="text-xs uppercase tracking-wide text-foreground/50">
                  {project.stack.join(" • ")}
                </span>
              </div>
              <p className={clsx("mb-6 text-sm leading-relaxed", textStyles.muted)}>
                {project.summary}
              </p>
              <Link
                href={project.link}
                className="inline-flex items-center gap-2 text-sm font-semibold text-(--primary) transition-transform hover:translate-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                View project <span aria-hidden>→</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ==============================
   🎓 Certifications
============================== */
function CertificationsSection() {
  return (
    <section className="relative border-t border-[color-mix(in_oklab,var(--border) 38%,transparent)] bg-white/80 py-24 dark:bg-[color-mix(in_oklab,var(--surface) 82%,transparent)]">
      <Container className="relative z-10 flex flex-col gap-10">
        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.span className="text-sm uppercase tracking-wide text-foreground/60" variants={fadeUp(0)}>
            certifications
          </motion.span>
          <motion.h2 className="text-pretty text-3xl font-semibold text-foreground sm:text-4xl" variants={fadeUp(1)}>
            Staying sharp across AI, finance, and cloud security.
          </motion.h2>
          <motion.p className={clsx("max-w-3xl text-base", textStyles.muted)} variants={fadeUp(2)}>
            Learning paths that reinforce decision-making, policy, and delivery for systems at scale.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert}
              variants={fadeUp(index)}
              className={certificationCardClass}
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-(--primary)">
                Credential
              </span>
              <p className="mt-2 text-base font-medium text-foreground">
                {cert}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ==============================
   🚀 Final Call-to-Action
============================== */
function FinalCTASection() {
  return (
    <section className="relative border-t border-[color-mix(in_oklab,var(--border) 35%,transparent)] bg-linear-to-b from-white via-[#f5f7ff] to-white py-24 dark:from-[#060816] dark:via-[#0a0d1c] dark:to-[#060816]">
      <Container className="relative z-10">
        <motion.div
          className={clsx(
            cardBase,
            "mx-auto max-w-4xl rounded-3xl border-[color-mix(in_oklab,var(--border) 45%,transparent)] bg-white/85 p-12 text-center shadow-[0_26px_60px_rgba(18,24,56,0.22)] backdrop-blur-xl dark:bg-[color-mix(in_oklab,var(--surface) 80%,transparent)]"
          )}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            className="text-pretty text-3xl font-semibold text-foreground sm:text-4xl"
            variants={fadeUp(0)}
          >
            Let’s build something that lasts.
          </motion.h2>
          <motion.p
            className={clsx("mt-4 text-base sm:text-lg", textStyles.muted)}
            variants={fadeUp(1)}
          >
            Open to Cloud, SRE, and AI Security collaborations — especially with teams focused on resilient, measurable systems.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            variants={fadeUp(2)}
          >
            <Link
              href="/resume/AdamZaatar_CV_2025.pdf"
              className={resumeButtonClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 View Resume
            </Link>
            <Link href="/contact" className={outlineButtonClass}>
              📬 Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

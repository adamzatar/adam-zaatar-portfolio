"use client";

import Link from "next/link";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useEffect } from "react";

import { Container } from "@/components/ui/Container";
import AppImage from "@/components/AppImage";
import type { ImageKey } from "@/lib/images";
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
      "Lightweight iOS creator tool for multi-perspective mini-episodes. On-device editing, instant preview, and export. Built for speed and privacy.",
    stack: ["SwiftUI", "AVFoundation"],
    link: "https://github.com/adamzatar/cutaway",
    image: "cutaway",
  },
];

type CertificationCard = {
  title: string;
  meta: string;
  status: "complete" | "in-progress";
  proofHref?: string;
  image?: ImageKey;
};

const certifications: readonly CertificationCard[] = [
  {
    title: "Artificial Intelligence A–Z",
    meta: "Udemy • 2025",
    status: "complete",
    proofHref: "/images/AIcertificate.jpg",
    image: "certificate",
  },
  {
    title: "Foundation Stock Trading",
    meta: "Udemy • 2025",
    status: "complete",
    proofHref: "/images/stocktradingcertificate.jpg",
    image: "stockTradingCertificate",
  },
  {
    title: "Git & GitHub Masterclass",
    meta: "Udemy • 2025",
    status: "complete",
    proofHref: "/images/gitcertificate.png",
    image: "gitCertificate",
  },
  {
    title: "AWS Solutions Architect",
    meta: "Amazon Web Services • In Progress",
    status: "in-progress",
  },
  {
    title: "CompTIA Security+",
    meta: "CompTIA • In Progress",
    status: "in-progress",
  },
  {
    title: "Azure Fundamentals",
    meta: "Microsoft • In Progress",
    status: "in-progress",
  },
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
            Hey, I’m Adam Zaatar!  
            I build scalable systems where cloud solutions, agentic AI, and cybersecurity converge.
          </motion.h1>

          <motion.p
            className={clsx("max-w-2xl text-lg sm:text-xl", textStyles.muted)}
            variants={fadeUp(2)}
          >
            Computer Science &amp; Economics @ Bowdoin. Studying to brandish my skills across the reliability, efficiency and the security of digital ecosystems and cloud solutions that scale sustainably. Seeking 2025 roles in Cloud, SRE, AI, or Cybersecurity.
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
          className="relative mx-auto h-full max-w-[420px]"
          variants={fadeUp(1.5)}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 -z-10 blur-3xl opacity-70 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.45),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.45),transparent_45%)]" />

          <div className="relative rounded-[34px] bg-[linear-gradient(135deg,rgba(255,255,255,0.75),rgba(96,165,250,0.35),rgba(15,23,42,0.65))] p-[1.5px] shadow-[0_25px_60px_rgba(8,15,40,0.45),0_0_40px_rgba(59,130,246,0.35)]">
            <div className="relative overflow-hidden rounded-[32px] bg-[color-mix(in_oklab,var(--surface) 70%,transparent)]/60 backdrop-blur-2xl">
              <AppImage
                image="profileHome"
                alt="Adam Zaatar — portrait"
                width={560}
                height={680}
                withShimmer
                className="h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.025]"
                sizes="(min-width: 1280px) 420px, (min-width: 768px) 360px, 80vw"
                priority
              />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.2),transparent_50%)]" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90 backdrop-blur-md shadow-[0_5px_20px_rgba(15,23,42,0.4)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                Available · Summer 2026
              </div>

              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-black/50 p-4 text-white/90 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.4em] text-white/70">
                  Aspiring Systems Engineer
                </p>
                <p className="mt-2 text-2xl font-semibold">Adam Zaatar</p>
                <p className="text-sm text-white/70">
                  Cloud · AI · Cybersecurity · SRE
                </p>
              </div>
            </div>
          </div>
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
    <section className="relative border-t border-[color-mix(in_oklab,var(--border) 35%,transparent)] bg-transparent py-20">
      <Container className="relative z-10 flex flex-col gap-10 rounded-[32px] bg-[color-mix(in_oklab,var(--surface) 65%,transparent)]/55 p-10 backdrop-blur-2xl shadow-[0_25px_80px_rgba(5,8,20,0.35)]">
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
    <section className="relative border-t border-[color-mix(in_oklab,var(--border) 40%,transparent)] bg-transparent py-24">
      <Container className="relative z-10 flex flex-col gap-12 rounded-[32px] bg-[color-mix(in_oklab,var(--surface) 70%,transparent)]/55 p-10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(5,8,20,0.35)]">
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
    <section className="relative border-t border-[color-mix(in_oklab,var(--border) 38%,transparent)] bg-transparent py-24">
      <Container className="relative z-10 flex flex-col gap-10 rounded-[32px] bg-[color-mix(in_oklab,var(--surface) 68%,transparent)]/55 p-10 backdrop-blur-2xl shadow-[0_22px_80px_rgba(5,8,20,0.35)]">
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
            Staying sharp across AI, finance, cloud, full-stack website and IOS development
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
              key={cert.title}
              variants={fadeUp(index)}
              className={certificationCardClass}
            >
              {cert.image ? (
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-[color-mix(in_oklab,var(--border) 50%,transparent)]">
                  {cert.proofHref ? (
                    <Link
                      href={cert.proofHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full"
                      aria-label={`${cert.title} certificate preview`}
                    >
                      <AppImage
                        image={cert.image}
                        alt={`${cert.title} certificate`}
                        fill
                        className="object-cover"
                        wrapperClassName="w-full h-full relative"
                      />
                    </Link>
                  ) : (
                    <AppImage
                      image={cert.image}
                      alt={`${cert.title} certificate`}
                      fill
                      className="object-cover"
                      wrapperClassName="w-full h-full relative"
                    />
                  )}
                </div>
              ) : null}

              <span className="text-sm font-semibold uppercase tracking-wide text-(--primary)">
                {cert.status === "complete" ? "Credential" : "In Progress"}
              </span>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-foreground/60">
                {cert.meta}
              </p>
              <h3 className="mt-2 text-base font-semibold text-foreground">
                {cert.title}
              </h3>
              <div className="mt-4 flex items-center gap-3">
                <span
                  className={clsx(
                    "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold",
                    cert.status === "complete"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-amber-400/15 text-amber-500",
                  )}
                >
                  {cert.status === "complete" ? "Completed" : "In Progress"}
                </span>
                {cert.proofHref ? (
                  <Link
                    href={cert.proofHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center text-xs font-semibold uppercase tracking-wide text-(--primary) hover:text-(--primary)/85"
                  >
                    View Certificate →
                  </Link>
                ) : null}
              </div>
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
    <section className="relative border-t border-[color-mix(in_oklab,var(--border) 35%,transparent)] bg-transparent py-24">
      <Container className="relative z-10 rounded-[32px] bg-[color-mix(in_oklab,var(--surface) 60%,transparent)]/55 p-10 backdrop-blur-2xl shadow-[0_30px_90px_rgba(5,8,20,0.38)]">
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
            Open to Cloud, SRE, AI, and Cybersecurity collaborations, especially with teams focused on resilient and measurable systems!
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

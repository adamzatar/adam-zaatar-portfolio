// -----------------------------------------------------------------------------
"use client";
// components/home/Hero.tsx
// Hero section — Data-driven, accessible, and SSR-safe
// -----------------------------------------------------------------------------


import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { HOME_DATA } from "@/app/data/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
// -----------------------------------------------------------------------------
// Motion variants — smooth fade-up reveal
// -----------------------------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

// -----------------------------------------------------------------------------
// Hero Component
// -----------------------------------------------------------------------------
export default function Hero() {
  const [primaryCta, secondaryCta, tertiaryCta] = HOME_DATA.finalCTA;
  const ctas = [primaryCta, secondaryCta].filter(Boolean);

  return (
    <section
      id="hero"
      className="relative ui-section py-24 sm:py-28 lg:py-32 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <Container className="relative z-10 text-center space-y-12">
        {/* Intro Copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto max-w-4xl space-y-6"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-sm font-medium tracking-[0.3em] uppercase text-foreground/70"
          >
            Cloud · AI · Security
          </motion.p>

          <motion.h1
            id="hero-title"
            custom={0.3}
            variants={fadeUp}
            className="text-pretty text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight
                       bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                       bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.08)]"
          >
            Building trustworthy, observable systems that scale with intent.
          </motion.h1>

          <motion.p
            custom={0.6}
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            I’m{" "}
            <span className="font-semibold text-foreground">Adam Zaatar</span> — a{" "}
            <span className="font-medium">Bowdoin College Computer Science &amp; Economics</span>{" "}
            student focused on cloud architecture, AI platform engineering, and cybersecurity.
            I help teams deliver resilient infrastructure with measurable outcomes.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {ctas.map((cta, index) => (
            <Button
              key={cta.href}
              asChild
              size="lg"
              variant={index === 0 ? cta.variant ?? "primary" : "outline"}
              className="transition-transform duration-300 hover:scale-[1.05]"
            >
              <Link
                href={cta.href}
                target={cta.href.startsWith("http") ? "_blank" : undefined}
                rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {cta.label}
              </Link>
            </Button>
          ))}
        </motion.div>

        {/* Optional tertiary link (ghost variant) */}
        {tertiaryCta && (
          <motion.div
            custom={1.2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Button asChild variant={tertiaryCta.variant ?? "ghost"} size="md">
              <Link
                href={tertiaryCta.href}
                target={tertiaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel={tertiaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {tertiaryCta.label}
              </Link>
            </Button>
          </motion.div>
        )}
      </Container>

      {/* Subtle gradient wash for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b
                   from-[color-mix(in_oklab,var(--primary)20%,transparent)]
                   via-[color-mix(in_oklab,var(--secondary)15%,transparent)]
                   to-[color-mix(in_oklab,var(--bg)90%,transparent)]"
      />
    </section>
  );
}

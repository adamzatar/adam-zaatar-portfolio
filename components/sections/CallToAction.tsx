// components/sections/CallToAction.tsx
"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

/* ----------------------------
   Motion
----------------------------- */
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
  },
});

const popCard: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* ----------------------------
   Component
----------------------------- */
export default function CallToAction() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden py-28 bg-gradient-to-b from-surface/70 to-bg"
    >
      {/* Soft ambient glow behind section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10
                   bg-[radial-gradient(60%_40%_at_50%_-10%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]"
      />

      <Container className="relative">
        {/* Decorative orbs (GPU-friendly, transform-only) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -40, y: -10 }}
            whileInView={{ opacity: 0.35, scale: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute left-[-10%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-[var(--primary)]/18 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40, y: 20 }}
            whileInView={{ opacity: 0.28, scale: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
            className="absolute right-[-12%] bottom-[-18%] h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/18 blur-3xl"
          />
        </div>

        {/* CTA Card */}
        <motion.div
          variants={popCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-4xl"
        >
          <Card
            variant="gradient"
            padding="lg"
            className="relative text-center will-change-[transform,opacity]"
          >
            {/* Subtle overlay to increase contrast on busy backgrounds */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-bg/30 via-transparent to-transparent"
            />

            <div className="relative z-10">
              {/* Eyebrow */}
              <motion.span
                variants={fadeUp(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline-block rounded-full border border-border/70 bg-surface/60 px-3 py-1 text-xs font-medium text-foreground/80 shadow-sm"
              >
                Available for internships & collaborations
              </motion.span>

              {/* Heading */}
              <motion.h2
                id="cta-heading"
                variants={fadeUp(0.5)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-4 text-pretty text-3xl sm:text-5xl font-extrabold tracking-tight
                           bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                           bg-clip-text text-transparent drop-shadow-sm"
              >
                Let’s Build Something Together
              </motion.h2>

              {/* Subtext */}
              <motion.p
                variants={fadeUp(0.9)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted"
              >
                Whether you’re looking to collaborate, hire, or just chat about technology,
                I’d love to hear from you.
              </motion.p>

              {/* Actions */}
              <motion.div
                variants={fadeUp(1.2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                {/* Internal route → Link */}
                <Button asChild size="lg" variant="primary" className="min-w-[13rem]">
                  <Link href="/contact" aria-label="Go to the contact page">
                    📩 Contact Me
                  </Link>
                </Button>

                {/* External/static file → <a> */}
                <Button asChild size="lg" variant="outline" className="min-w-[13rem]">
                  <a
                    href="/resume/AdamZaatar_CV_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Adam Zaatar resume PDF in a new tab"
                  >
                    📄 View Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
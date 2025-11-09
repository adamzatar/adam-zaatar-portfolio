"use client";
import Link from "next/link";

import { HOME_DATA } from "@/app/data/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/* -----------------------------------------------------------------------------
   Component: FinalCTA
   Server-rendered — closing call to action with hero-style gradient & sun glint.
   -----------------------------------------------------------------------------
*/

const fadeUp = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.12 },
  },
});

export default function FinalCTA() {
  const ctas = HOME_DATA.finalCTA;

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* === Gradient Background (mirrors Hero) === */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-(--primary)/15 via-(--secondary)/8 to-(--bg)"
      />

      {/* === Optional Subtle Sun Glint === */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                   rounded-full opacity-20 blur-3xl
                   bg-[radial-gradient(circle_at_center,var(--accent)_25%,transparent_70%)]
                   pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.26, 0.18] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container>
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            id="final-cta-heading"
            className="text-pretty text-4xl sm:text-5xl font-extrabold tracking-tight
                       bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent)
                       bg-clip-text text-transparent drop-shadow-xl"
          >
            Let’s build something that lasts.
          </h2>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Open to Cloud, SRE, and AI-driven product roles — focused on building
            systems that are scalable, secure, and durable by design.
          </p>

          {/* === Buttons === */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {ctas.map((cta, idx) => (
              <Button
                asChild
                key={cta.href}
                variant={idx === 0 ? cta.variant ?? "primary" : cta.variant ?? "outline"}
                size="lg"
              >
                <Link
                  href={cta.href}
                  target={cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={cta.label}
                >
                  {cta.label}
                </Link>
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

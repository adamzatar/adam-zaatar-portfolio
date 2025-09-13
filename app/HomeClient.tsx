"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants, type Transition } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const fadeUp = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      delay: i * 0.12,
    } as Transition,
  },
});

export default function HomeClient() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-surface/70 to-bg">
      {/* Animated vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_-10%,hsl(var(--primary)/0.15),transparent_60%)] animate-gradientShift"
      />

      <Container className="py-20 sm:py-28">
        {/* HERO */}
        <section className="flex flex-col items-center text-center gap-8">
          <motion.h1
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl font-extrabold tracking-tight 
                       bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                       bg-clip-text text-transparent drop-shadow-lg animate-shimmer"
          >
            Hi, I’m Adam Zaatar
          </motion.h1>

          <motion.p
            variants={fadeUp(1)}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-lg sm:text-xl leading-relaxed text-muted"
          >
            CS &amp; Economics student at Bowdoin College. I build at the intersection of{" "}
            <span className="font-semibold text-[var(--primary)]">AI</span>,{" "}
            <span className="font-semibold text-[var(--secondary)]">fintech</span>, and{" "}
            <span className="font-semibold text-[var(--accent)]">full-stack platforms</span>.
          </motion.p>
        </section>

        {/* 3D DOUBLE CARD PORTRAIT */}
        <section className="mt-16 flex justify-center">
          <motion.div
            variants={fadeUp(1.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative w-72 h-72"
          >
            {/* Back Glow Card */}
            <motion.div
              animate={{ rotate: [-4, -6, -4], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute inset-0 -rotate-6 bg-gradient-to-br from-[var(--secondary)] to-[var(--accent)] 
                         opacity-50 blur-xl rounded-2xl shadow-neon"
            />

            {/* Front Card with tilt */}
            <motion.div
              whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative z-10 w-full h-full rounded-2xl bg-surface/90 
                         backdrop-blur-md border border-border/60 shadow-card-hover overflow-hidden p-2"
            >
              <Image
                src="/images/projects/profile.png"
                alt="Portrait of Adam Zaatar"
                width={280}
                height={280}
                priority
                className="rounded-xl object-cover"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* SNAPSHOT / TAGS */}
        <section className="mt-12 flex flex-col items-center gap-6 text-center">
          <motion.h2
            variants={fadeUp(2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-3xl font-bold text-foreground"
          >
            A hybrid lens
          </motion.h2>

          <motion.p
            variants={fadeUp(2.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted"
          >
            From shipping{" "}
            <span className="font-medium">full-stack apps</span> to {" "}
            <span className="font-medium">capital budgeting</span>, I thrive where{" "}
            <span className="text-[var(--secondary)]">code</span> meets{" "}
            <span className="text-[var(--accent)]">markets</span>.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3">
            {["CS + Econ @ Bowdoin", "Research & econometrics", "iOS+Android & full-stack", "Fintech & AI"].map(
              (tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.1 }}
                  className="rounded-full bg-surface px-4 py-1.5 text-sm text-foreground/80 
                             ring-1 ring-border shadow-sm hover:shadow-card transition"
                >
                  {tag}
                </motion.span>
              )
            )}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          variants={fadeUp(3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 rounded-2xl bg-foreground text-background p-10 sm:p-14 shadow-neon relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 via-[var(--secondary)]/20 to-[var(--accent)]/20 animate-gradientShift" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold">Let’s build something useful!</h3>
            <p className="mt-4 text-background/90">
              Open to roles and collaborations in financial analysis, stock trading, software engineering, fintech, and AI-driven projects.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary">
                <a href="/resume/AdamZaatar_CV_2025.pdf" target="_blank" rel="noreferrer">
                  📄 View Resume
                </a>
              </Button>
              <Button asChild variant="outline" className="hover:border-background/50 hover:bg-background/10">
                <Link href="/#projects">🚀 Projects</Link>
              </Button>
              <Button asChild variant="ghost" className="hover:bg-background/10">
                <Link href="/#research">📚 Research</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </Container>
    </main>
  );
}
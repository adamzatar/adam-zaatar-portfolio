"use client";

import { useState } from "react";
import Link from "next/link";
import { MotionConfig, motion, type Variants } from "framer-motion";
import AppImage from "@/components/AppImage";
import { type ImageKey } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import AnimatedBackground from "@/components/AnimatedBackground";

/* ----------------------------
   Motion: consistent, typed, reusable
----------------------------- */
const fadeUp = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.12 },
  },
});

const scaleHover = { scale: 1.05, y: -6 };

/* ----------------------------
   Shimmer Profile (keeps your loader)
----------------------------- */
function ShimmerProfile({ image, alt }: { image: ImageKey; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.figure
      variants={fadeUp(1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={scaleHover}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden
                 bg-[var(--surface)]/80 supports-[backdrop-filter]:backdrop-blur-xl
                 border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                 ring-1 ring-white/5 transition-all duration-300"
    >
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse
                     bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300
                     dark:from-[#1b2029] dark:via-[#1f2630] dark:to-[#222a34]"
        />
      )}

      {/* Responsive sizing for Lighthouse */}
      <AppImage
        image={image}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 320px, 288px"
        className={`object-cover object-top transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadingComplete={() => setLoaded(true)}
      />
      <figcaption className="sr-only">{alt}</figcaption>
    </motion.figure>
  );
}

/* ----------------------------
   Component
----------------------------- */
export default function AboutClient() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-hidden bg-gradient-to-b from-surface/70 to-bg">
        {/* 🔭 Animated painterly sky behind all content */}
        <AnimatedBackground />

        {/* Subtle vignette wash above the sky but below content */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10
                     bg-[radial-gradient(60%_40%_at_50%_-10%,color-mix(in_oklab,var(--primary) 18%,transparent),transparent_70%)]"
        />

        <Container className="py-20 sm:py-28 relative z-0">
          {/* === HERO === */}
          <header className="text-center max-w-4xl mx-auto">
            <motion.h1
              variants={fadeUp(0)}
              initial="hidden"
              animate="visible"
              className="text-pretty text-5xl sm:text-6xl font-extrabold tracking-tight
                         bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                         bg-clip-text text-transparent drop-shadow-xl"
            >
              About Me
            </motion.h1>

            <motion.p
              variants={fadeUp(0.5)}
              initial="hidden"
              animate="visible"
              className="mt-6 text-balance text-lg sm:text-xl leading-relaxed text-muted"
            >
              I’m <span className="font-semibold text-foreground">Adam Zaatar</span>, a{" "}
              <span className="font-semibold">Computer Science &amp; Economics student at Bowdoin College</span>,
              passionate about building at the intersection of{" "}
              <span className="text-[var(--primary)] font-medium">software</span>,{" "}
              <span className="text-[var(--secondary)] font-medium">finance</span>, and{" "}
              <span className="text-[var(--accent)] font-medium">research</span>.
            </motion.p>
          </header>

          {/* === PROFILE + BIO === */}
          <section
            className="mt-20 grid items-center gap-12 lg:grid-cols-[1fr_1.5fr]"
            aria-labelledby="hybrid-lens"
          >
            {/* Profile Image */}
            <div className="flex justify-center mt-8">
              <ShimmerProfile image="profile" alt="Portrait of Adam Zaatar" />
            </div>

            {/* Narrative */}
            <motion.div
              variants={fadeUp(1.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="space-y-6"
            >
              <h2
                id="hybrid-lens"
                className="text-3xl font-bold text-foreground relative inline-block text-center lg:text-left"
              >
                A Hybrid Lens
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full h-1
                             bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                             rounded-full animate-pulse"
                />
              </h2>

              <p className="text-lg text-muted leading-relaxed">
                My journey bridges <span className="italic">computer science</span> and{" "}
                <span className="italic">economics</span>. I’ve explored topics like{" "}
                <span className="font-medium">financial literacy education</span>,{" "}
                <span className="font-medium">corporate lobbying</span>, and{" "}
                <span className="font-medium">post-COVID inflation</span> while developing iOS apps,
                scalable web platforms, and fintech-inspired systems.
              </p>

              <p className="text-lg text-muted leading-relaxed">
                I thrive on projects that are both{" "}
                <span className="font-semibold">technically robust</span> and{" "}
                <span className="font-semibold">socially impactful</span>—whether it’s building secure 2FA
                systems, analyzing “greedflation,” or designing platforms for advocacy and commerce.
              </p>
            </motion.div>
          </section>

          {/* === HIGHLIGHTS === */}
          <section className="mt-16 text-center" aria-labelledby="highlights">
            <h3
              id="highlights"
              className="text-2xl font-bold text-foreground mb-8 relative inline-block"
            >
              Highlights
              <span
                aria-hidden
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1
                           bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--primary)]
                           rounded-full animate-pulse"
              />
            </h3>

            <ul className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2 justify-items-center">
              {[
                { text: "Founder of the Bowdoin Martial Arts Club", icon: "🥋" },
                { text: "Web Staff at The Bowdoin Orient", icon: "📰" },
                {
                  text: "Certificate: Artificial Intelligence A–Z 2025 (Udemy)",
                  icon: "🤖",
                  image: "certificate" as ImageKey, 
                },
                {
                  text:
                    "Research in financial literacy, behavioral economics, econometrics",
                  icon: "📊",
                },
                { text: "Fluent in English & Arabic; intermediate German", icon: "🌍" },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={fadeUp(1.4 + idx * 0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="ui-card flex flex-col items-center gap-3 p-5 rounded-xl
                             border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                             shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.3)]
                             ring-1 ring-white/5 transition-all duration-300 w-full sm:w-[90%]"
                >
                  <span className="text-2xl text-foreground/80">{item.icon}</span>
                  <span className="text-foreground/90">{item.text}</span>

                  {item.image && (
                    <AppImage
                      image={item.image}
                      alt="AI Certificate"
                      width={360}
                      height={220}
                      sizes="(min-width: 640px) 360px, 280px"
                      className="mt-2 rounded-lg shadow-md object-contain"
                    />
                  )}
                </motion.li>
              ))}
            </ul>
          </section>

          {/* === CTA === */}
          <motion.section
            variants={fadeUp(2.6)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            aria-labelledby="cta"
            className="mt-20 relative overflow-hidden rounded-2xl
                       bg-[var(--surface)]/85 supports-[backdrop-filter]:backdrop-blur-xl
                       border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                       shadow-xl p-10 sm:p-14 text-center"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-r
                         from-[var(--primary)]/10 via-[var(--secondary)]/10 to-[var(--accent)]/10"
            />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 id="cta" className="text-pretty text-3xl sm:text-4xl font-extrabold text-foreground">
                Let’s connect
              </h2>
              <p className="mt-4 text-muted">
                Open to roles and collaborations in financial analysis, stock trading, software
                engineering, fintech, and AI-driven projects.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild variant="primary" size="lg" className="shadow-md hover:shadow-xl">
                  <a
                    href="/resume/AdamZaatar_CV_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open resume (PDF) in a new tab"
                  >
                    📄 View Resume
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-xl">
                  <Link href="/projects" aria-label="See my projects">🚀 See My Work</Link>
                </Button>
              </div>
            </div>
          </motion.section>
        </Container>
      </main>
    </MotionConfig>
  );
}
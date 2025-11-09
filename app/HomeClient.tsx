"use client";

import Link from "next/link";
import { MotionConfig, type Variants } from "framer-motion";
import { motion } from "framer-motion";
import AppImage from "@/components/AppImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card"; // ✅ use componentized surfaces

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
   Data
----------------------------- */
const TAGS = [
  "CS + Econ @ Bowdoin",
  "Research & econometrics",
  "iOS+Android & full-stack",
  "Fintech & AI",
];

/* ----------------------------
   Component
----------------------------- */
export default function HomeClient() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-hidden text-foreground">
        <Container className="py-20 sm:py-28 relative z-0">
          {/* === HERO === */}
          <header className="flex flex-col items-center text-center gap-8">
            <motion.h1
              variants={fadeUp(0)}
              initial="hidden"
              animate="visible"
              className="text-pretty text-5xl sm:text-6xl font-extrabold tracking-tight
                         bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent)
                         bg-clip-text text-transparent drop-shadow-lg"
            >
              Hi, I’m Adam Zaatar
            </motion.h1>

            <motion.p
              variants={fadeUp(1)}
              initial="hidden"
              animate="visible"
              className="text-balance max-w-2xl text-lg sm:text-xl leading-relaxed text-muted"
            >
              CS &amp; Economics student at Bowdoin College. I build at the
              intersection of{" "}
              <span className="font-semibold text-(--primary)">AI</span>,{" "}
              <span className="font-semibold text-(--secondary)">fintech</span>, and{" "}
              <span className="font-semibold text-(--accent)">full-stack platforms</span>.
            </motion.p>
          </header>

          {/* === PORTRAIT CARD === */}
          <section className="mt-16 flex justify-center" aria-labelledby="about-photo">
            <h2 id="about-photo" className="sr-only">
              Portrait
            </h2>

            <motion.div
              variants={fadeUp(1.5)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="relative w-72 h-72"
            >
              {/* Decorative glow behind */}
              <motion.div
                aria-hidden
                animate={{ rotate: [-4, -6, -4], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute inset-0 -rotate-6 rounded-2xl
                           bg-linear-to-br from-(--secondary) to-(--accent)
                           opacity-[0.35] blur-2xl"
              />

              {/* Glass card using component (keeps tokens & blur inside Card) */}
              <motion.div
                whileHover={scaleHover}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="relative z-10 w-full h-full"
              >
                <Card
                  className="w-full h-full rounded-2xl overflow-hidden p-2
                             bg-(--surface)/80 supports-backdrop-filter:backdrop-blur-xl
                             border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                             shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                             ring-1 ring-white/5 transition-all duration-300"
                >
                  <AppImage
                    image="profile"
                    alt="Portrait of Adam Zaatar"
                    width={320}
                    height={320}
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 320px, 280px"
                    priority
                    className="rounded-xl object-cover w-full h-full"
                  />
                </Card>
              </motion.div>
            </motion.div>
          </section>

          {/* === SNAPSHOT / TAGS === */}
          <section
            className="mt-12 flex flex-col items-center gap-6 text-center"
            aria-labelledby="snapshot"
          >
            <motion.h2
              id="snapshot"
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
              className="text-balance max-w-3xl text-base sm:text-lg leading-relaxed text-muted"
            >
              From shipping <span className="font-medium">full-stack apps</span> to{" "}
              <span className="font-medium">capital budgeting</span>, I thrive where{" "}
              <span className="text-(--secondary)">code</span> meets{" "}
              <span className="text-(--accent)">markets</span>.
            </motion.p>

            <ul className="flex flex-wrap justify-center gap-3">
              {TAGS.map((tag) => (
                <motion.li key={tag} whileHover={{ scale: 1.06, y: -2 }}>
                  <Card
                    className="rounded-lg px-4 py-2 text-sm text-foreground/90
                               bg-[color-mix(in_oklab,var(--surface) 80%,transparent)]
                               border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                               shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.3)]
                               ring-1 ring-white/5 transition-all"
                  >
                    {tag}
                  </Card>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* === CTA === */}
          <motion.section
            variants={fadeUp(3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-labelledby="cta"
            className="mt-24 relative overflow-hidden rounded-2xl
                       bg-(--surface)/85 supports-backdrop-filter:backdrop-blur-xl
                       border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                       shadow-xl p-10 sm:p-14"
          >
            {/* Subtle gradient wash */}
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-r
                         from-(--primary)/10 via-(--secondary)/10 to-(--accent)/10"
            />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 id="cta" className="text-pretty text-3xl sm:text-4xl font-extrabold text-foreground">
                Let’s build something useful!
              </h2>
              <p className="mt-4 text-muted">
                Open to roles and collaborations in financial analysis, stock trading, software
                engineering, fintech, and AI-driven projects.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild variant="primary">
                  <a
                    href="/resume/AdamZaatar_CV_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open resume (PDF) in a new tab"
                  >
                    📄 View Resume
                  </a>
                </Button>

                {/* ✅ Route to real pages, not #anchors */}
                <Button asChild variant="outline">
                  <Link href="/projects" aria-label="Go to projects">
                    🚀 Projects
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/research" aria-label="Go to research">
                    📚 Research
                  </Link>
                </Button>
              </div>
            </div>
          </motion.section>
        </Container>
      </main>
    </MotionConfig>
  );
}

"use client";

import Link from "next/link";
import { MotionConfig, type Variants } from "framer-motion";
import { motion } from "framer-motion";
import AppImage from "@/components/AppImage";
import { type ImageKey } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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

const FAST_FACTS = [
  {
    text: "Pivoting from study abroad to U.S. Cloud & SRE internships (Bay Area focus).",
    icon: "🌉",
  },
  {
    text: "Cloud/FinOps specialization in partnership with Predrag Cvetkowski (MaxInt).",
    icon: "🤝",
  },
  {
    text: "In progress: AWS Solutions Architect Associate & CompTIA Security+ certifications.",
    icon: "🎯",
  },
  {
    text: "Honors project spans systems optimization, cloud architecture, and applied economics.",
    icon: "🧠",
  },
  {
    text: "Research in financial literacy, behavioral economics, and econometrics.",
    icon: "📊",
  },
  { text: "Founder of the Bowdoin Martial Arts Club.", icon: "🥋" },
  { text: "Web Staff at The Bowdoin Orient.", icon: "📰" },
  { text: "Fluent in English & Arabic; intermediate German.", icon: "🌍" },
] as const;

/* ----------------------------
   Shimmer Profile (keeps your loader)
----------------------------- */
function ShimmerProfile({ image, alt }: { image: ImageKey; alt: string }) {
  return (
    <motion.figure
      variants={fadeUp(1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={scaleHover}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden
                 bg-(--surface)/80 supports-backdrop-filter:backdrop-blur-xl
                 border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                 ring-1 ring-white/5 transition-all duration-300"
    >
      <AppImage
        image={image}
        alt={alt}
        fill
        priority
        withShimmer
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 320px, 288px"
        className="object-cover object-top rounded-3xl"
      />
      <figcaption className="sr-only">{alt}</figcaption>
    </motion.figure>
  );
}

/* ----------------------------
   Component
----------------------------- */
export default function AboutClient() {
  // Certificate link data (kept close to the component)
  const CERTS = [
    {
      text: "Certificate: Artificial Intelligence A–Z 2025 (Udemy)",
      icon: "🤖",
      image: "certificate" as ImageKey,
      href: "https://www.udemy.com/certificate/UC-6162dcfe-b4fa-4b30-a7f7-f0ae1204e552/",
      alt: "Artificial Intelligence A–Z 2025 Certificate (Udemy)",
    },
    {
      text: "Certificate: The Complete Foundation Stock Trading Course (Udemy)",
      icon: "📈",
      image: "stockTradingCertificate" as ImageKey,
      href: "https://ude.my/UC-6162dcfe-b4fa-4b30-a7f7-f0ae1204e552",
      alt: "The Complete Foundation Stock Trading Course Certificate (Udemy)",
      meta: {
        number: "UC-6162dcfe-b4fa-4b30-a7f7-f0ae1204e552",
        reference: "0004",
        date: "Sept. 17, 2025",
        length: "9.5 total hours",
        instructors: "Mohsen Hassan, bloom team",
      },
    },
  ] as const;
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-hidden">
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
                         bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent)
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
              <span className="font-semibold">Computer Science &amp; Economics student at Bowdoin College</span>{" "}
              focused on delivering resilient{" "}
              <span className="text-(--primary) font-medium">cloud</span> and{" "}
              <span className="text-(--accent) font-medium">AI</span> systems for 2025 U.S. internships. I blend
              technical craft with market awareness to ship platforms that stay fast, secure, and measurable.
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
                             bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent)
                             rounded-full animate-pulse"
                />
              </h2>

              <p className="text-lg text-muted leading-relaxed">
                My journey bridges <span className="italic">computer science</span> and{" "}
                <span className="italic">economics</span>. An honors project on{" "}
                <span className="font-medium">systems optimization, cloud architecture, and applied economics</span>{" "}
                anchors my research lens, while I build production-grade apps that keep data trustworthy and pathways
                automated.
              </p>

              <p className="text-lg text-muted leading-relaxed">
                Day to day I’m pairing infrastructure upgrades with{" "}
                <span className="font-semibold">FinOps playbooks from Predrag Cvetkowski (MaxInt)</span>, completing{" "}
                <span className="font-semibold">AWS Solutions Architect</span> and{" "}
                <span className="font-semibold">Security+</span> prep, and iterating on secure 2FA and marketplace tools
                that tie policy, trading, and advocacy together.
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
                           bg-linear-to-r from-(--accent) via-(--secondary) to-(--primary)
                           rounded-full animate-pulse"
              />
            </h3>

            <ul className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2 justify-items-center">
              {/* Static facts */}
              {FAST_FACTS.map((item, idx) => (
                <motion.li
                  key={item.text}
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
                  <span className="text-foreground/90 text-center">{item.text}</span>
                </motion.li>
              ))}

              {/* Certificates */}
              {CERTS.map((cert, idx) => (
                <motion.li
                  key={cert.text}
                  variants={fadeUp(1.8 + idx * 0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="ui-card flex flex-col items-center gap-3 p-5 rounded-xl
                             border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                             shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.3)]
                             ring-1 ring-white/5 transition-all duration-300 w-full sm:w-[90%]"
                >
                  <span className="text-2xl text-foreground/80">{cert.icon}</span>
                  <span className="text-foreground/90">{cert.text}</span>

                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-md"
                    aria-label={`${cert.text} — open certificate`}
                  >
                    <AppImage
                      image={cert.image}
                      alt={cert.alt}
                      width={360}
                      height={220}
                      sizes="(min-width: 640px) 360px, 280px"
                      className="mt-2 rounded-lg shadow-md object-contain hover:brightness-105 transition"
                    />
                  </a>

                  {/* Optional meta for the stock certificate */}
                  {"meta" in cert && cert.meta ? (
                    <div className="text-xs text-foreground/70 grid gap-1 mt-1">
                      <div>
                        <span className="font-semibold">Certificate no:</span>{" "}
                        {cert.meta.number}
                      </div>
                      <div>
                        <span className="font-semibold">Reference #:</span>{" "}
                        {cert.meta.reference}
                      </div>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <span>
                          <span className="font-semibold">Date:</span> {cert.meta.date}
                        </span>
                        <span>•</span>
                        <span>
                          <span className="font-semibold">Length:</span> {cert.meta.length}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Instructors:</span>{" "}
                        {cert.meta.instructors}
                      </div>
                    </div>
                  ) : null}
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
                       bg-(--surface)/85 supports-backdrop-filter:backdrop-blur-xl
                       border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                       shadow-xl p-10 sm:p-14 text-center"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-r
                         from-(--primary)/10 via-(--secondary)/10 to-(--accent)/10"
            />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 id="cta" className="text-pretty text-3xl sm:text-4xl font-extrabold text-foreground">
                Let’s connect
              </h2>
              <p className="mt-4 text-muted">
                Open to Cloud &amp; SRE, platform security, and FinOps collaborations — especially Bay
                Area teams building durable, data-rich systems.
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

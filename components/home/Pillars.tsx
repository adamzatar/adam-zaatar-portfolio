// components/home/Pillars.tsx
"use client";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HOME_DATA } from "@/app/data/home";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export type Pillar = {
  title: string;
  icon: string;
  blurb: string;
};

// -----------------------------------------------------------------------------
// Component: Pillars
// Server-rendered — displays key focus areas (Cloud, AI, Security, etc.)
// -----------------------------------------------------------------------------
export default function Pillars() {
  // ✅ Fix TS4104: HOME_DATA.pillars is readonly
  const pillars = HOME_DATA.pillars as readonly Pillar[];

  return (
    <section
      id="pillars"
      aria-labelledby="focus-areas"
      className="relative ui-section py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Optional background wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-10 
                   bg-[radial-gradient(60%_60%_at_50%_-10%,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_80%)]"
      />

      <Container>
        {/* Section Heading */}
        <header className="text-center mb-14">
          <h2
            id="focus-areas"
            className="text-pretty text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            Focus Areas
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Where cloud infrastructure, applied intelligence, and system security meet
            measurable design.
          </p>
        </header>

        {/* Grid Layout */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 
                     max-w-6xl mx-auto"
        >
          {pillars.map((item, idx) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: idx * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="ui-card card-hover p-6 sm:p-7 flex flex-col justify-start
                         border border-[color-mix(in_oklab,var(--border)_70%,transparent)]
                         bg-[color-mix(in_oklab,var(--surface)_90%,transparent)]
                         supports-[backdrop-filter]:backdrop-blur-xl
                         shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.25)]
                         rounded-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-[var(--primary)]" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {item.blurb}
              </p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
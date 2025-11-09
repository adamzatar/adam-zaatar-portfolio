"use client";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HOME_DATA } from "@/app/data/home";

// -----------------------------------------------------------------------------
// Component: How I Build
// -----------------------------------------------------------------------------
export default function HowIBuild() {
  const steps = HOME_DATA.buildSteps;

  return (
    <section
      id="how-i-build"
      aria-labelledby="build-process"
      className="relative ui-section py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Subtle background wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none 
                   bg-[radial-gradient(50%_50%_at_50%_-10%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_70%)]"
      />

      <Container>
        {/* Section Heading */}
        <header className="text-center mb-14">
          <h2
            id="build-process"
            className="text-pretty text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            How I Build
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            My workflow fuses policy, automation, and observability—helping teams ship fast without losing trust or stability.
          </p>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: idx * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="p-6 sm:p-7 bg-[color-mix(in_oklab,var(--surface)_90%,transparent)] 
                         supports-backdrop-filter:backdrop-blur-xl rounded-xl border 
                         border-[color-mix(in_oklab,var(--border)_70%,transparent)] shadow-md 
                         hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ul>

      </Container>
    </section>
  );
}

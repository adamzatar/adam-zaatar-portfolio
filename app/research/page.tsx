"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Research from "@/components/Research";
import { motion, Variants, Transition } from "framer-motion";

// Animation utility
const fadeUp = (i: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: i * 0.15,
    } as Transition,
  },
});

export default function ResearchPage() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-surface/80 to-bg overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-3xl opacity-50" />

      <Container>
        {/* Page Heading */}
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center 
                     bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                     bg-clip-text text-transparent drop-shadow-sm"
        >
          Research
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg sm:text-xl text-muted text-center max-w-3xl mx-auto leading-relaxed"
        >
          A portfolio of{" "}
          <span className="text-[var(--primary)] font-semibold">funded fellowships</span>,{" "}
          <span className="text-[var(--secondary)] font-semibold">behavioral economics</span>, and{" "}
          <span className="text-[var(--accent)] font-semibold">applied econometrics</span>.  
          My work explores how data and incentives shape policy, markets, and financial literacy—bridging 
          quantitative rigor with real-world impact in{" "}
          <span className="font-semibold">finance, technology, and governance</span>.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-10 mb-14 h-[3px] w-44 mx-auto bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-full origin-center"
        />

        {/* Featured Research Highlight */}
        <motion.div
          variants={fadeUp(2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="p-8 sm:p-12 rounded-2xl shadow-card hover:shadow-card-hover backdrop-blur-sm bg-surface/90 border border-border/60 transition-all">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-text mb-4">
              Featured Research: <span className="text-gradient">Who Rules? Lobbying’s Grip on Democracy</span>
            </h2>
            <p className="text-muted text-center max-w-3xl mx-auto mb-6 leading-relaxed">
              This paper investigates how corporate lobbying influences U.S. democracy and when it crosses into 
              <span className="font-medium"> social irresponsibility</span>.  
              Using{" "}
              <span className="font-medium">Thomas Lyon’s Corporate Political Responsibility framework</span>,{" "}
              <span className="font-medium">Lock & Seele’s CSR decoupling</span>, and{" "}
              <span className="font-medium">behavioral economics insights</span>, it reveals how firms publicly 
              champion ethics while privately lobbying against reform. Case studies in the{" "}
              <span className="font-medium">pharmaceutical</span>,{" "}
              <span className="font-medium">defense</span>, and{" "}
              <span className="font-medium">tech</span> sectors highlight how legal precedents and strategic 
              framing entrench corporate power. The work also contrasts harmful lobbying with{" "}
              <span className="font-medium">renewable energy and privacy advocacy</span>, showing that lobbying 
              can strengthen democracy when it is transparent and aligned with public interest.
            </p>
<div className="flex justify-center">
  <Button asChild variant="primary" size="lg">
    <a href="/papers/lobbying_democracy.pdf" target="_blank">
      📄 Read Paper
    </a>
  </Button>

              <Button asChild variant="outline" size="lg">
                <a href="https://github.com/adamzatar/research-projects" target="_blank">
                  GitHub Repository
                </a>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Other Research */}
        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="p-8 rounded-2xl backdrop-blur-sm bg-surface/80 border border-border/60 
                           shadow-subtle hover:shadow-card-hover transition-transform hover:scale-[1.02]">
            <Research />
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-10 border-t border-border bg-surface relative overflow-hidden"
      role="contentinfo"
    >
      {/* Decorative background glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--secondary)]/10 to-[var(--accent)]/10 blur-3xl opacity-60"
      />

      <Container className="flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Copyright */}
        <p className="text-sm text-muted text-center sm:text-left">
          © {currentYear} <span className="font-semibold">Adam Zaatar</span>. All
          rights reserved.
        </p>

        {/* Footer Navigation */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="relative text-muted hover:text-primary transition-colors group"
                >
                  {/* ✅ Use <a> for in-page anchors to avoid typedRoutes errors */}
                  <a href={href} aria-label={`Go to ${label} section`}>
                    {label}
                    <span
                      className="absolute left-0 -bottom-1 h-[2px] w-0 
                        bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                        transition-all duration-300 group-hover:w-full"
                    />
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </motion.footer>
  );
}
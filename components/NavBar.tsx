"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";

// Define nav link type
interface NavLink {
  href: Route | string;
  label: string;
  external?: boolean;
  download?: boolean;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { 
    href: "/resume/AdamZaatar_CV_2025.pdf", 
    label: "Resume", 
    external: true, 
    download: true, // ✅ direct download
  },
  { href: "/contact", label: "Contact" },
];

const linkVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 35,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatedBackground />

      {/* === NavBar === */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-surface/90 border-border/40 shadow-lg backdrop-blur-2xl"
            : "bg-transparent border-transparent backdrop-blur-sm"
        )}
        role="navigation"
        aria-label="Main Navigation"
      >
        <Container className="flex justify-between items-center h-20">
          {/* === Logo (Synced with Gradient Cycle) === */}
          <motion.div
            className="text-xl sm:text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity 
                       bg-clip-text text-transparent animate-logoCycle"
          >
            <Link href="/" aria-label="Go to Home">
              Adam Zaatar
            </Link>
          </motion.div>

          {/* === Desktop Menu === */}
          <motion.ul
            className="hidden md:flex space-x-8 items-center"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {navLinks.map(({ href, label, external, download }) => (
              <motion.li key={href.toString()} variants={linkVariants}>
                {external ? (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="relative font-medium text-foreground group px-3 text-lg"
                  >
                    <a
                      href={href.toString()}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...(download ? { download: true } : {})}
                      aria-label={`Open ${label}`}
                    >
                      {label}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 
                                       animate-underlineCycle
                                       transition-all duration-500 ease-out group-hover:w-full rounded-full" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="relative font-medium text-foreground group px-3 text-lg"
                  >
                    <Link href={href as Route} aria-label={`Go to ${label} page`}>
                      {label}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 
                                       animate-underlineCycle
                                       transition-all duration-500 ease-out group-hover:w-full rounded-full" />
                    </Link>
                  </Button>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* === Mobile Menu Toggle === */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="md:hidden p-2 rounded-lg hover:bg-muted/40 transition-colors shadow-inner"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <X size={28} className="text-[var(--accent)]" />
            ) : (
              <Menu size={28} className="text-[var(--primary)]" />
            )}
          </motion.button>
        </Container>

        {/* === Mobile Dropdown === */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden border-t border-border bg-surface/95 shadow-xl backdrop-blur-xl"
            >
              <Container className="flex flex-col space-y-4 py-6">
                {navLinks.map(({ href, label, external, download }, index) => (
                  <motion.div
                    key={href.toString()}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                  >
                    {external ? (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full text-lg font-semibold tracking-wide hover:scale-105 transition-transform shadow-md"
                        onClick={() => setIsOpen(false)}
                      >
                        <a
                          href={href.toString()}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...(download ? { download: true } : {})}
                          aria-label={`Open ${label}`}
                        >
                          {label}
                        </a>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full text-lg font-semibold tracking-wide hover:scale-105 transition-transform shadow-md"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={href as Route} aria-label={`Go to ${label} page`}>
                          {label}
                        </Link>
                      </Button>
                    )}
                  </motion.div>
                ))}
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* === Floating Neon Progress Bar (Synced with Gradient Cycle) === */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[3px] origin-left 
                   animate-progressCycle
                   shadow-[0_0_8px_var(--primary),0_0_16px_var(--secondary),0_0_24px_var(--accent)]
                   rounded-full z-[60]"
        style={{ scaleX }}
      />
    </>
  );
}
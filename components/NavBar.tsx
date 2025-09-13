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
  href: Route | string; // internal routes = Route, external = string
  label: string;
  external?: boolean;
}

// 🔑 Internal routes use Link, external ones use <a>
const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/resume/AdamZaatar_CV_2025.pdf", label: "Resume", external: true },
  { href: "/contact", label: "Contact" },
];

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatedBackground />

      {/* === Main Nav === */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          "backdrop-blur-2xl border-b",
          scrolled
            ? "bg-surface/90 border-border/40 shadow-2xl"
            : "bg-transparent border-transparent"
        )}
        role="navigation"
        aria-label="Main Navigation"
      >
        <Container className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                       bg-clip-text text-transparent bg-[length:200%_200%] animate-pulse"
          >
            <Link
              href="/"
              className="text-xl sm:text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity"
              aria-label="Go to Home"
            >
              Adam Zaatar
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.ul
            className="hidden md:flex space-x-8 items-center"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {navLinks.map(({ href, label, external }) => (
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
                      aria-label={`Open ${label}`}
                    >
                      {label}
                      <span className="absolute left-0 -bottom-1 h-[3px] w-0 
                                       bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                                       transition-all duration-500 ease-out group-hover:w-full rounded-full shadow-[0_0_8px_var(--primary)]" />
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
                      <span className="absolute left-0 -bottom-1 h-[3px] w-0 
                                       bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
                                       transition-all duration-500 ease-out group-hover:w-full rounded-full shadow-[0_0_8px_var(--primary)]" />
                    </Link>
                  </Button>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
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

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="md:hidden border-t border-border bg-surface/95 shadow-2xl backdrop-blur-xl"
            >
              <Container className="flex flex-col space-y-4 py-6">
                {navLinks.map(({ href, label, external }, index) => (
                  <motion.div
                    key={href.toString()}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
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

      {/* Floating Neon Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[4px] origin-left 
                   bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]
                   shadow-[0_0_15px_var(--primary),0_0_30px_var(--secondary),0_0_50px_var(--accent)]
                   rounded-full z-[60]"
        style={{ scaleX }}
      />
    </>
  );
}
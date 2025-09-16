"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";

// ----------------------------
// Nav link type
// ----------------------------
interface NavLink {
  href: Route | string;
  label: string;
  external?: boolean;
  download?: boolean;
}

// ----------------------------
// Main nav links
// ----------------------------
const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

// ----------------------------
// Animation variants
// ----------------------------
const linkVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("Home");

  // Progress bar logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 35,
    restDelta: 0.001,
  });

  // Detect scroll for sticky nav styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section in viewport
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              const navLink = navLinks.find((l) =>
                l.href.replace("/", "") === id.toLowerCase()
              );
              setActiveSection(navLink?.label ?? "Home");
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* === NavBar === */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-surface/70 border-border/40 shadow-xl backdrop-blur-2xl rounded-b-xl"
            : "bg-transparent border-transparent"
        )}
        role="navigation"
        aria-label="Main Navigation"
      >
        <Container className="flex justify-between items-center h-20">
          {/* === Logo === */}
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
            {navLinks.map(({ href, label, external, download }) => {
              const isActive = activeSection === label;
              return (
                <motion.li
                  key={href.toString()}
                  variants={linkVariants}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {external ? (
                    <a
                      href={href.toString()}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...(download ? { download: true } : {})}
                      className="relative font-medium text-lg px-2 py-1 group transition-colors"
                    >
                      {label}
                      {/* Gradient underline */}
                      <span
                        className={clsx(
                          "absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-500 ease-out",
                          "bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]",
                          "group-hover:w-full",
                          isActive && "w-full shadow-[0_0_8px_var(--primary),0_0_16px_var(--secondary)]"
                        )}
                      />
                    </a>
                  ) : (
                    <Link
                      href={href as Route}
                      className="relative font-medium text-lg px-2 py-1 group transition-colors"
                    >
                      {label}
                      {/* Gradient underline */}
                      <span
                        className={clsx(
                          "absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-500 ease-out",
                          "bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]",
                          "group-hover:w-full",
                          isActive && "w-full shadow-[0_0_8px_var(--primary),0_0_16px_var(--secondary)]"
                        )}
                      />
                    </Link>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>

          {/* === Mobile Toggle === */}
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
              className="md:hidden border-t border-border 
                         bg-surface/80 shadow-2xl backdrop-blur-2xl rounded-b-xl"
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
                      <a
                        href={href.toString()}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...(download ? { download: true } : {})}
                        className={clsx(
                          "w-full block text-lg font-semibold tracking-wide px-4 py-3 rounded-lg",
                          "bg-surface/60 hover:bg-surface/90 transition-all shadow-md",
                          activeSection === label && "ring-2 ring-[var(--primary)]"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href as Route}
                        className={clsx(
                          "w-full block text-lg font-semibold tracking-wide px-4 py-3 rounded-lg",
                          "bg-surface/60 hover:bg-surface/90 transition-all shadow-md",
                          activeSection === label && "ring-2 ring-[var(--primary)]"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* === Floating Progress Bar === */}
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
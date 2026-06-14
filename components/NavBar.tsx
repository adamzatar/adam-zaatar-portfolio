"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { NavLink as ActiveNavLink, isPathActive } from "@/components/NavLink";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

// ----------------------------
// Nav link type
// ----------------------------
interface NavItem {
  href: Route | string;
  label: string;
  external?: boolean;
  download?: boolean;
  exact?: boolean;
}

// ----------------------------
// Main nav links
// ----------------------------
const navLinks: NavItem[] = [
  { href: "/", label: "Home", exact: true },
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
  const pathname = usePathname();

  // Detect scroll for sticky nav styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground hover:text-(--primary) transition-colors"
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
            {navLinks.map(({ href, label, external, download, exact }) => {
              const hrefString = href.toString();
              const active = isPathActive(pathname, hrefString, Boolean(exact));
              return (
                <motion.li
                  key={hrefString}
                  variants={linkVariants}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {external ? (
                    <a
                      href={hrefString}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...(download ? { download: true } : {})}
                      className={clsx(
                        "group relative inline-flex items-center px-2 py-1 text-lg font-medium transition-colors",
                        active
                          ? "text-foreground"
                          : "text-foreground/70 hover:text-foreground focus-visible:text-foreground"
                      )}
                    >
                      <span>{label}</span>
                      <span
                        className={clsx(
                          "pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 transform rounded-full bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent) transition-all duration-500 ease-out",
                          active
                            ? "scale-x-100 shadow-[0_0_8px_var(--primary),0_0_16px_var(--secondary)]"
                            : "group-hover:scale-x-100 focus-visible:scale-x-100"
                        )}
                        aria-hidden
                      />
                    </a>
                  ) : (
                    <ActiveNavLink href={hrefString} exact={Boolean(exact)}>
                      {label}
                    </ActiveNavLink>
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
              <X size={28} className="text-(--accent)" />
            ) : (
              <Menu size={28} className="text-(--primary)" />
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
                {navLinks.map(({ href, label, external, download, exact }, index) => {
                  const hrefString = href.toString();
                  const active = isPathActive(pathname, hrefString, Boolean(exact));
                  return (
                    <motion.div
                      key={hrefString}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.06 }}
                    >
                      {external ? (
                        <a
                          href={hrefString}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...(download ? { download: true } : {})}
                          className={clsx(
                            "block w-full rounded-lg px-4 py-3 text-lg font-semibold tracking-wide",
                            "bg-surface/60 hover:bg-surface/90 transition-all shadow-md",
                            active && "ring-2 ring-[var(--primary)]"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          href={href as Route}
                          className={clsx(
                            "block w-full rounded-lg px-4 py-3 text-lg font-semibold tracking-wide",
                            "bg-surface/60 hover:bg-surface/90 transition-all shadow-md",
                            active && "ring-2 ring-[var(--primary)]"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

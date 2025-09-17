"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Status = { type: "idle" | "submitting" | "success" | "error"; message?: string };

export default function Contact() {
  const [status, setStatus] = React.useState<Status>({ type: "idle" });
  const formRef = React.useRef<HTMLFormElement | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.type === "submitting") return;
    setStatus({ type: "submitting" });

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    if ((data.get("company") as string)?.trim()) {
      setStatus({ type: "error", message: "Spam detected." });
      return;
    }

    const payload = {
      name: (data.get("name") as string)?.trim(),
      email: (data.get("email") as string)?.trim(),
      message: (data.get("message") as string)?.trim(),
    };

    // basic client-side validation
    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to send message.");
      }

      setStatus({ type: "success", message: "Thanks! I’ll get back to you shortly." });
      formRef.current?.reset();
    } catch (err: unknown) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  return (
    <section id="contact" className="py-20 relative">
      <Container className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-3xl rounded-2xl
                     bg-[var(--surface)]/85 supports-[backdrop-filter]:backdrop-blur-xl
                     border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                     shadow-xl hover:shadow-2xl transition-all duration-500 p-8 sm:p-10"
        >
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-extrabold text-foreground text-center"
          >
            Get in Touch
          </motion.h2>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-4 text-muted text-center max-w-2xl mx-auto"
          >
            Interested in collaborating, hiring, or discussing an idea? Send me a message.
          </motion.p>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="mt-10 grid gap-5"
            aria-describedby="contact-status"
          >
            {/* Honeypot (hidden to humans) */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground/90">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-lg border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                             bg-[color-mix(in_oklab,var(--surface) 65%,transparent)]
                             px-4 py-3 outline-none focus:ring-2 ring-[var(--primary)]
                             text-foreground placeholder:text-foreground/50"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground/90">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-lg border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                             bg-[color-mix(in_oklab,var(--surface) 65%,transparent)]
                             px-4 py-3 outline-none focus:ring-2 ring-[var(--primary)]
                             text-foreground placeholder:text-foreground/50"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground/90">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell me a bit about what you’re looking to build…"
                className="rounded-lg border border-[color-mix(in_oklab,var(--border) 70%,transparent)]
                           bg-[color-mix(in_oklab,var(--surface) 65%,transparent)]
                           px-4 py-3 outline-none focus:ring-2 ring-[var(--primary)]
                           text-foreground placeholder:text-foreground/50 resize-vertical"
              />
            </div>

            <div className="mt-2 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div
                id="contact-status"
                role={status.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={
                  status.type === "success"
                    ? "text-emerald-500"
                    : status.type === "error"
                    ? "text-red-500"
                    : "text-muted"
                }
              >
                {status.type === "submitting" && "Sending…"}
                {status.type === "success" && status.message}
                {status.type === "error" && (status.message || "Something went wrong.")}
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={status.type === "submitting"}>
                {status.type === "submitting" ? "Sending…" : "Send Message"}
              </Button>
            </div>
          </form>

          {/* Optional quick links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-muted">
            <a className="hover:underline" href="mailto:adam.zaatar@gmail.com">
              Or email me directly → adam.zaatar@gmail.com
            </a>
            <span className="opacity-30">•</span>
            <a
              className="hover:underline"
              href="https://www.linkedin.com/in/adamzaatar"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span className="opacity-30">•</span>
            <a
              className="hover:underline"
              href="https://github.com/adamzatar"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
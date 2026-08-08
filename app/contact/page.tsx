import { Github, Linkedin, Mail } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Email, LinkedIn, and GitHub links for Adam Zaatar.",
  path: "/contact",
});

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    text: EMAIL,
    href: `mailto:${EMAIL}`,
    cta: "Send email",
    external: false,
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    text: "Adam Zaatar",
    href: LINKEDIN_URL,
    cta: "View profile",
    external: true,
  },
  {
    icon: Github,
    title: "GitHub",
    text: "github.com/adamzatar",
    href: GITHUB_URL,
    cta: "View repositories",
    external: true,
  },
] as const;

export default function ContactPage() {
  return (
    <section id="contact" className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
            Contact me.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m glad to hear about internships, technical projects, research
            ideas, or software work around campus.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {contactMethods.map(({ icon: Icon, title, text, href, cta, external }) => (
            <article
              key={title}
              className="interactive-card flex h-full flex-col rounded-xl border border-border bg-surface p-6 hover:border-primary/45"
            >
              <Icon className="h-6 w-6 text-primary" aria-hidden />
              <h2 className="mt-4 text-lg font-semibold text-text">{title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{text}</p>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="link-plain mt-6 w-fit text-sm font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
              >
                {cta}
              </a>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
          Email is the best way to reach me, especially for internships, research,
          or project collaboration.
        </p>
      </Container>
    </section>
  );
}

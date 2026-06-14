import { Github, Linkedin, Mail } from "lucide-react";

import { Container } from "@/components/ui/Container";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    text: "azaatar@bowdoin.edu",
    href: "mailto:azaatar@bowdoin.edu",
    cta: "Send email",
    external: false,
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    text: "Adam Zaatar",
    href: "https://www.linkedin.com/in/adam-zaatar-09b106304?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAE2dNPcBbnu6cGrezXKH7zFdmJefhn6vmXs&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B5GoLqgRFTeWosocK647j0w%3D%3D",
    cta: "View profile",
    external: true,
  },
  {
    icon: Github,
    title: "GitHub",
    text: "github.com/adamzatar",
    href: "https://github.com/adamzatar",
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
            Get in touch.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m glad to hear about internships, technical projects, research
            ideas, or student-facing software work.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {contactMethods.map(({ icon: Icon, title, text, href, cta, external }) => (
            <article
              key={title}
              className="flex h-full flex-col rounded-xl border border-border bg-surface p-6"
            >
              <Icon className="h-6 w-6 text-text" aria-hidden />
              <h2 className="mt-4 text-lg font-semibold text-text">{title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{text}</p>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="link-plain mt-6 w-fit text-sm font-semibold text-text underline underline-offset-4"
              >
                {cta}
              </a>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
          Email is the best first contact for anything time-sensitive or related
          to internships, research, or project collaboration.
        </p>
      </Container>
    </section>
  );
}

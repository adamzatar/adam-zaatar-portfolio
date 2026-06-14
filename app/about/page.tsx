import Image from "next/image";

import { Container } from "@/components/ui/Container";

const technicalWork = [
  {
    title: "ProgressSoft",
    body: "Backend-focused Java training at a payments software company in Amman, focused on enterprise Java, Spring Boot, persistence, security, Docker, testing, and code review.",
  },
  {
    title: "ClickErase",
    body: "AI image editing demo built with Python, Gradio, and Hugging Face Spaces. The project lets a user upload an image, click an object, generate a segmentation mask, and remove the object with inpainting.",
  },
  {
    title: "Bowdoin technical work",
    body: "Web and plugin fixes at The Bowdoin Orient, plus introductory computer science course support as a Learning Assistant for CSCI 1101.",
  },
] as const;

const backgroundItems = [
  "Computer Science and Economics student at Bowdoin College, with a German minor.",
  "Grew up in Amman and came to Bowdoin as an international student.",
  "Founder and President of the Bowdoin Martial Arts Club, handling funding, recruiting, logistics, and outside gym coordination.",
  "Currently preparing for AWS Certified Solutions Architect Associate and CompTIA Security+.",
] as const;

export default function AboutPage() {
  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              About
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-text sm:text-5xl">
              Backend systems, economics, and applied AI.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m Adam Zaatar, a Bowdoin student studying Computer Science
              and Economics. I&apos;m building toward backend and systems
              engineering, with interests in finance-oriented software, applied
              AI, and the economics behind technical decisions.
            </p>
          </div>

          <figure className="mx-auto w-full max-w-xs overflow-hidden rounded-xl border border-border bg-surface px-6 pt-6">
            <Image
              src="/images/about-portrait.png"
              alt="Portrait of Adam Zaatar"
              width={408}
              height={612}
              priority
              className="h-auto w-full object-contain"
              sizes="(min-width: 1024px) 320px, 80vw"
            />
          </figure>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section className="interactive-card rounded-xl border border-border bg-surface p-6 hover:border-primary/30">
            <h2 className="text-2xl font-semibold text-text">Background</h2>
            <ul className="mt-5 space-y-4">
              {backgroundItems.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>

            <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-bg p-4">
              <Image
                src="/images/mma.png"
                alt="Adam Zaatar training mixed martial arts"
                width={391}
                height={638}
                className="mx-auto max-h-72 w-auto object-contain"
                sizes="(min-width: 1024px) 260px, 70vw"
              />
              <figcaption className="border-t border-border pt-3 text-sm font-medium text-muted">
                Bowdoin Martial Arts Club
              </figcaption>
            </figure>
          </section>

          <section className="interactive-card rounded-xl border border-border bg-surface p-6 hover:border-primary/30">
            <h2 className="text-2xl font-semibold text-text">What I work on</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Economics gives me a way to think about incentives, markets,
              finance, and data. Computer science gives me a way to build the
              systems that make those ideas useful. I&apos;m most interested in
              work where software, financial systems, and analytical thinking
              meet.
            </p>
            <div className="mt-6 space-y-5">
              {technicalWork.map((item) => (
                <article key={item.title}>
                  <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="interactive-card mt-5 rounded-xl border border-border bg-surface p-6 hover:border-primary/30">
          <h2 className="text-2xl font-semibold text-text">Research and writing</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            My economics work includes research on lobbying, producer prices,
            financial literacy programs, and course design. That work matters
            for this portfolio because it shows how I approach evidence,
            assumptions, and tradeoffs, especially in finance-oriented software.
          </p>
        </section>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Adam Zaatar: from Amman to Bowdoin, studying Computer Science and Economics, training martial arts, and building backend and systems software.",
  path: "/about",
});

const textLink =
  "link-plain font-semibold text-text underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary";

export default function AboutPage() {
  return (
    <div className="bg-bg">
      <section className="border-b border-border/70 bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-normal text-text sm:text-5xl">
              About me
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text sm:text-xl">
              I&apos;m a senior at Bowdoin College studying Computer Science and
              Economics, with a minor in German. I grew up in Amman, Jordan,
              before coming to Maine for college, and I graduate in May 2027.
            </p>
          </div>
          <figure className="mx-auto w-full max-w-[260px] overflow-hidden rounded-xl border border-border bg-surface px-5 pt-5 shadow-card lg:max-w-none">
            <Image
              src="/images/about-portrait.png"
              alt="Portrait of Adam Zaatar"
              width={408}
              height={612}
              priority
              className="h-auto w-full object-contain"
              sizes="(min-width: 1024px) 300px, 260px"
            />
          </figure>
        </Container>
      </section>

      <Container className="grid items-start gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted">
          <p>
            I&apos;ve ended up spending most of my time on backend and systems
            work. Operating Systems was one of my favorite classes at Bowdoin,
            and lately I&apos;ve been building projects around worker failures
            and database coordination.
          </p>
          <p>
            Last summer I spent ten weeks at ProgressSoft in Amman, where I
            built{" "}
            <Link href="/projects/eventguard" className={textLink}>
              EventGuard
            </Link>{" "}
            in Java and Spring Boot with regular code review from my mentor.
          </p>
          <p>
            I founded Bowdoin&apos;s Martial Arts Club and still spend a lot of
            my free time training. I also handle the club&apos;s funding,
            logistics, and relationships with local gyms.
          </p>
          <p>
            I write{" "}
            <Link href="/research" className={textLink}>
              economics papers
            </Link>{" "}
            too, mostly empirical ones. On campus I work on web and data
            projects for The Bowdoin Orient and help teach intro computer
            science as a Learning Assistant.
          </p>

          <div className="flex flex-wrap gap-5 border-t border-border pt-6 text-sm">
            <Link href="/projects" className={textLink}>
              Projects
            </Link>
            <Link href="/resume" className={textLink}>
              Resume
            </Link>
            <Link href="/contact" className={textLink}>
              Contact
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          <figure className="overflow-hidden rounded-xl border border-border bg-surface p-3">
            <Image
              src="/images/mma.png"
              alt="Adam Zaatar training mixed martial arts"
              width={391}
              height={638}
              className="mx-auto max-h-96 w-auto rounded-lg object-contain"
              sizes="(min-width: 1024px) 300px, 70vw"
            />
            <figcaption className="px-1 pb-1 pt-3 text-sm text-muted">
              Training with the Bowdoin Martial Arts Club.
            </figcaption>
          </figure>

          <a
            href="/documents/ProgressSoft_Internship_Certificate_Adam_Zaatar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-card link-plain grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4 rounded-xl border border-border bg-surface p-3 hover:border-primary/45"
          >
            <span className="overflow-hidden rounded-lg border border-border bg-white">
              <Image
                src="/images/progresssoft/progresssoft-completion-certificate.jpg"
                alt=""
                width={842}
                height={596}
                className="h-auto w-full"
                sizes="96px"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-text">
                ProgressSoft internship certificate
              </span>
              <span className="mt-1 block text-xs text-muted">
                June to August 2026
              </span>
            </span>
          </a>
        </div>
      </Container>
    </div>
  );
}

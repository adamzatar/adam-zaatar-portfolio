import Link from "next/link";

import { HOME_DATA } from "@/app/data/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Learning() {
  const certifications = HOME_DATA.certifications;

  return (
    <section
      id="learning"
      aria-labelledby="learning-heading"
      className="relative ui-section py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      <Container>
        <header className="text-center mx-auto mb-14 max-w-3xl space-y-4">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-foreground/60">
            Continuous Learning
          </p>
          <h2
            id="learning-heading"
            className="text-pretty text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            Certifications and ongoing mastery across cloud and security.
          </h2>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list">
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="ui-card rounded-xl border border-(--border)/60 bg-(--surface)/85 supports-[backdrop-filter]:backdrop-blur-xl p-6 sm:p-7 flex flex-col gap-4"
            >
              <header className="space-y-1">
                <p className="text-xs uppercase tracking-[0.25em] text-foreground/50">
                  {typeof cert.year === "number" ? cert.year : cert.year.toString()}
                </p>
                <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.provider}</p>
              </header>

              <span
                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium
                  ${cert.status === "complete" ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-400/15 text-amber-500"}`}
              >
                {cert.status === "complete" ? "Completed" : "In Progress"}
              </span>

              {cert.credentialUrl ? (
                <Button asChild variant="ghost" size="sm" className="mt-auto">
                  <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    View Credential
                  </Link>
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

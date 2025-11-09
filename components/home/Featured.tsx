import Image from "next/image";
import Link from "next/link";

import { HOME_DATA } from "@/app/data/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Featured() {
  const projects = HOME_DATA.projects.slice(0, 3);

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="relative ui-section py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      <Container>
        <header className="text-center mx-auto mb-14 max-w-3xl space-y-4">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-foreground/60">
            Featured Builds
          </p>
          <h2
            id="featured-heading"
            className="text-pretty text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            Recent work across cloud platforms, security, and intelligent tooling.
          </h2>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto" role="list">
          {projects.map((project, index) => {
            const isHero = index === 0;
            return (
              <li
                key={project.slug}
                className={`ui-card rounded-xl border border-(--border)/70 bg-(--surface)/85 supports-[backdrop-filter]:backdrop-blur-xl
                            shadow-[0_12px_28px_rgba(10,10,15,0.18)] hover:shadow-[0_18px_40px_rgba(10,10,20,0.22)] transition-all duration-300
                            flex flex-col justify-between ${isHero ? "md:col-span-2" : ""}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-foreground/70">
                    <span>{project.stack.slice(0, 3).join(" • ")}</span>
                    {project.image ? (
                      <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">Case Study</span>
                    ) : null}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm text-foreground/70">
                  {project.stack.map((tech) => (
                    <span
                      key={`${project.slug}-${tech}`}
                      className="rounded-full border border-(--border) bg-(--surface)/60 px-3 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.image ? (
                  <div className="relative mt-6 overflow-hidden rounded-lg border border-(--border)/60 bg-black/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={720}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="md" variant={isHero ? "primary" : "outline"}>
                    <Link
                      href={project.cta.href}
                      target={project.cta.href.startsWith("http") ? "_blank" : undefined}
                      rel={project.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {project.cta.label}
                    </Link>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

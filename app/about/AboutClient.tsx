"use client";

import { Fragment, useMemo } from "react";
import clsx from "clsx";
import { MotionConfig, motion, type Variants } from "framer-motion";

import {
  aboutPageContent,
  type AboutPhoto,
  type AboutSection as AboutSectionData,
  type AboutPullQuote,
} from "@/app/data/about";
import { Container } from "@/components/ui/Container";
import AppImage from "@/components/AppImage";

const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  },
});

const viewport = { once: true, amount: 0.35 };

export default function AboutClient() {
  const { heroTitle, heroKicker, heroBody, sections, pullQuotes, photos } = aboutPageContent;

  const quotesBySection = useMemo(() => {
    return pullQuotes.reduce<Record<string, AboutPullQuote[]>>((acc, quote) => {
      (acc[quote.sectionId] ??= []).push(quote);
      return acc;
    }, {});
  }, [pullQuotes]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-hidden text-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_-20%,rgba(255,255,255,0.45),rgba(14,20,45,0.08)_65%,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(240,244,255,0.35),transparent_35%,transparent_70%,rgba(8,12,24,0.35))]"
        />

        <Container className="relative z-10 py-20 sm:py-28 space-y-24">
          <AboutHero
            title={heroTitle}
            kicker={heroKicker}
            paragraphs={heroBody}
            photo={photos.hero}
          />

          <div className="space-y-20 lg:space-y-24">
            {sections.map((section, index) => {
              const sectionPhoto = section.photoKey ? photos[section.photoKey] : undefined;
              const sectionQuotes = quotesBySection[section.id] ?? [];
              return (
                <Fragment key={section.id}>
                  <AboutSection section={section} index={index} photo={sectionPhoto} />
                  {sectionQuotes.map((quote) => (
                    <PullQuote key={quote.id} text={quote.text} />
                  ))}
                  {section.id === "training" ? <PhotoBreak photo={photos.petra} /> : null}
                </Fragment>
              );
            })}
          </div>
        </Container>
      </main>
    </MotionConfig>
  );
}

function AboutHero({
  title,
  kicker,
  paragraphs,
  photo,
}: {
  title: string;
  kicker: string;
  paragraphs: string[];
  photo: AboutPhoto;
}) {
  return (
    <motion.section
      variants={fadeIn(0)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] items-center"
    >
      <div className="space-y-6">
        <p className="text-xs font-semibold tracking-[0.35em] uppercase text-foreground/60">
          {kicker}
        </p>
        <h1 className="text-pretty text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <div className="space-y-4 text-base sm:text-lg leading-relaxed text-foreground/80">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <PhotoPanel photo={photo} priority />
    </motion.section>
  );
}

function AboutSection({
  section,
  photo,
  index,
}: {
  section: AboutSectionData;
  photo?: AboutPhoto;
  index: number;
}) {
  const photoLeft = Boolean(photo) && index % 2 === 1;

  return (
    <motion.section
      variants={fadeIn(0)}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      viewport={viewport}
      className="ui-card group relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 group-hover:opacity-35 transition-opacity duration-400 bg-[radial-gradient(circle_at_top,var(--accent)/30,transparent_65%)]" />
      <div className="absolute inset-px rounded-[calc(1.5rem-2px)] opacity-0 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay bg-[linear-gradient(125deg,rgba(255,255,255,0.4),transparent_60%)]" />
      <div className="absolute inset-px rounded-[calc(1.5rem-2px)] pointer-events-none opacity-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%),linear-gradient(45deg,rgba(255,255,255,0.08)_25%,transparent_25%)] bg-[length:18px_18px] mix-blend-soft-light" />
      <div
        className={clsx(
          "relative z-10 gap-10 p-8 sm:p-10",
          photo ? "grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] items-start" : "space-y-6",
        )}
      >
        <div
          className={clsx(
            "space-y-5",
            photo ? (photoLeft ? "order-2 lg:order-1" : "order-1") : undefined,
          )}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Section</p>
          <h2 className="text-pretty text-2xl sm:text-3xl font-semibold text-foreground">
            {section.title}
          </h2>
          <SectionBody blocks={section.body} />
        </div>

        {photo ? (
          <div
            className={clsx(
              "order-1 lg:order-2",
              photoLeft ? "lg:pl-4" : "lg:pl-10",
              "relative",
            )}
          >
            <PhotoPanel photo={photo} floating />
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}

function SectionBody({ blocks }: { blocks: AboutSectionData["body"] }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-foreground/80">
      {blocks.map((block, idx) => {
        if (typeof block === "string") {
          return <p key={idx}>{block}</p>;
        }

        return (
          <ul key={idx} className="space-y-2 pl-1 text-foreground/80">
            {block.items.map((item, itemIdx) => {
              if (typeof item === "string") {
                return (
                  <li key={itemIdx} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-(--primary)" aria-hidden />
                    <span>{item}</span>
                  </li>
                );
              }

              return (
                <li key={item.label + itemIdx} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-(--primary)" aria-hidden />
                  <span>
                    {item.before ?? ""}
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-plain font-semibold text-(--primary) underline underline-offset-2 decoration-dotted hover:text-(--accent)"
                    >
                      {item.label}
                    </a>
                    {item.after ?? ""}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <motion.blockquote
      variants={fadeIn(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="relative mx-auto max-w-3xl rounded-2xl border border-[color-mix(in_oklab,var(--border) 35%,transparent)] bg-[color-mix(in_oklab,var(--surface) 96%,white)]/95 px-6 py-10 text-center text-lg italic text-foreground/80 shadow-[0_12px_28px_rgba(7,10,28,0.12)]"
    >
      <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 text-4xl text-(--primary)">
        “
      </span>
      {text}
    </motion.blockquote>
  );
}

function PhotoPanel({
  photo,
  priority = false,
  floating = false,
}: {
  photo: AboutPhoto;
  priority?: boolean;
  floating?: boolean;
}) {
  const aspectClass =
    photo.aspect === "portrait"
      ? "aspect-[3/4]"
      : photo.aspect === "panorama"
        ? "aspect-[16/9]"
        : "aspect-[4/3]";
  const fitClass = photo.fit === "contain" ? "object-contain p-6 sm:p-8" : "object-cover";
  const sizeClass =
    photo.size === "sm"
      ? "max-w-4xl mx-auto"
      : photo.size === "lg"
        ? "max-w-6xl mx-auto"
        : "";

  return (
    <motion.figure
      variants={fadeIn(0.1)}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -6 }}
      viewport={viewport}
      className={clsx(
        "ui-card group relative overflow-hidden",
        floating ? "lg:translate-y-4" : "",
        sizeClass,
      )}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top,var(--primary)/18,transparent_70%)] transition-opacity duration-300 group-hover:opacity-60" />
      <AppImage
        image={photo.image}
        alt={photo.alt}
        fill
        priority={priority}
        withShimmer
        className={clsx("object-center transition-transform duration-500", fitClass)}
        wrapperClassName={clsx("relative w-full !h-auto overflow-hidden", aspectClass)}
        style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
      />
      {photo.caption ? (
        <figcaption className="px-6 py-4 text-sm text-foreground/80 border-t border-white/20 bg-white/45 backdrop-blur">
          {photo.caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}

function PhotoBreak({ photo }: { photo: AboutPhoto }) {
  return (
    <motion.section
      variants={fadeIn(0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="rounded-[32px] border border-[color-mix(in_oklab,var(--border) 30%,transparent)] bg-[color-mix(in_oklab,var(--surface) 96%,white)]/85 p-3 shadow-[0_6px_22px_rgba(5,8,16,0.08)] max-w-4xl mx-auto"
    >
      <PhotoPanel photo={photo} />
    </motion.section>
  );
}

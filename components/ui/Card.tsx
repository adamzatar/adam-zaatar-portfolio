"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card variants are token-driven and glass-friendly.
 * - We avoid heavy box-shadow stacks; prefer subtle, composited shadows.
 * - Borders use color-mix for soft edges across themes.
 * - Blur only when supported (prevents Safari regressions on older GPUs).
 */
export const cardVariants = cva(
  [
    "relative overflow-hidden rounded-2xl border",
    "transition-all duration-300 ease-out",
    "will-change-[transform,opacity,box-shadow]",
    "supports-[backdrop-filter]:backdrop-blur-xl",
    "focus-within:ring-1 focus-within:ring-[color-mix(in_oklab,var(--primary) 40%,transparent)]",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: cn(
          "bg-[color-mix(in_oklab,var(--surface) 85%,transparent)]",
          "border-[color-mix(in_oklab,var(--border) 70%,transparent)]",
          "shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.26)]"
        ),
        outline: cn(
          "bg-transparent",
          "border-2 border-[color-mix(in_oklab,var(--border) 70%,transparent)]",
          "hover:bg-[color-mix(in_oklab,var(--surface) 40%,transparent)]",
          "shadow-none hover:shadow-[0_10px_28px_rgba(0,0,0,0.18)]"
        ),
        subtle: cn(
          "bg-[color-mix(in_oklab,var(--surface) 60%,transparent)]",
          "border-[color-mix(in_oklab,var(--border) 40%,transparent)]",
          "shadow-none hover:shadow-[0_8px_22px_rgba(0,0,0,0.16)]"
        ),
        elevated: cn(
          "bg-gradient-to-br from-[color-mix(in_oklab,var(--surface) 95%,transparent)] to-[color-mix(in_oklab,var(--bg) 80%,transparent)]",
          "border-[color-mix(in_oklab,var(--border) 70%,transparent)]",
          "shadow-[0_12px_36px_rgba(0,0,0,0.24)] hover:shadow-[0_18px_46px_rgba(0,0,0,0.30)]"
        ),
        gradient: cn(
          "bg-gradient-to-br from-[color-mix(in_oklab,var(--primary) 10%,transparent)] via-[color-mix(in_oklab,var(--surface) 80%,transparent)] to-[color-mix(in_oklab,var(--accent) 10%,transparent)]",
          "border-[color-mix(in_oklab,var(--border) 70%,transparent)]",
          "shadow-[0_10px_30px_rgba(0,0,0,0.22)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.30)]"
        ),
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: cn("cursor-pointer", "transition-transform", "hover:-translate-y-1.5 hover:scale-[1.015]"),
        false: "",
      },
    },
    defaultVariants: {
      variant: "surface",
      padding: "md",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Make the container keyboard-focusable when interactive */
  focusable?: boolean;
}

/**
 * Card
 * - Polished, token-driven container
 * - If `interactive`, we add keyboard focus affordances automatically
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, focusable, ...props }, ref) => {
    const interactiveTabIndex = interactive && (focusable ?? true) ? 0 : undefined;
    return (
      <div
        ref={ref}
        tabIndex={interactiveTabIndex}
        className={cn(
          cardVariants({ variant, padding, interactive }),
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--primary) 45%,transparent)]",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

/* -----------------------------------------------------------
   Slot-like subcomponents (header/title/desc/content/footer)
   Switched empty `interface ... extends` to `type` to satisfy
   @typescript-eslint/no-empty-interface.
----------------------------------------------------------- */

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 px-0 py-0", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg sm:text-xl font-semibold tracking-tight text-foreground", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-muted leading-relaxed", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-3", className)} {...props} />
);
CardContent.displayName = "CardContent";

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-4 flex items-center justify-end gap-3", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
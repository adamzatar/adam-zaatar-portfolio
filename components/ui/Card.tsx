"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative overflow-hidden rounded-2xl border transition-all duration-500 backdrop-blur-sm",
  {
    variants: {
      variant: {
        surface:
          "bg-surface/90 border-border shadow-sm hover:shadow-md",
        outline:
          "bg-transparent border-2 border-border text-text hover:shadow-lg hover:bg-surface/30",
        subtle:
          "bg-surface/60 border-transparent shadow-none hover:shadow-sm",
        elevated:
          "bg-gradient-to-br from-surface/90 to-bg/80 border-border shadow-lg hover:shadow-xl",
        gradient:
          "bg-gradient-to-br from-primary/10 via-surface/70 to-accent/10 border border-border shadow-md hover:shadow-xl",
      },
      padding: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: "hover:scale-[1.02] hover:shadow-card-hover cursor-pointer",
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
    VariantProps<typeof cardVariants> {}

export function Card({
  className,
  variant,
  padding,
  interactive,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        cardVariants({ variant, padding, interactive }),
        "transition-transform duration-300",
        className
      )}
      {...props}
    />
  );
}
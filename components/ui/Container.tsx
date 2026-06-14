import { cn } from "@/lib/utils";
import {
  ElementType,
  ReactNode,
  HTMLAttributes,
  forwardRef,
} from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /**
   * Semantic HTML element type (e.g. <section>, <main>, <header>).
   * Defaults to <div>.
   */
  as?: ElementType;

  /** Container content */
  children: ReactNode;

  /** Adds vertical padding for sectional layout */
  padded?: boolean;

  /** Sets max-width constraint (default: 7xl) */
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";

  /** Optional background layering */
  layer?: "default" | "frosted" | "transparent" | "glass";
}

export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      as: Tag = "div",
      className,
      children,
      padded = false,
      maxWidth = "7xl",
      layer = "default",
      ...props
    },
    ref
  ) => {
    /* Tailwind-safe static width map (since template literals don't work for max-w- classes) */
    const widthMap: Record<string, string> = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
      full: "max-w-full",
    };

    /* Layer visual mapping */
    const layerStyles: Record<string, string> = {
      default: "",
      frosted:
        "backdrop-blur-xl bg-[color-mix(in_oklab,var(--surface)85%,transparent)] border border-[color-mix(in_oklab,var(--border)70%,transparent)] shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
      transparent: "bg-transparent",
      glass:
        "backdrop-blur-2xl bg-[color-mix(in_oklab,var(--surface)70%,transparent)] border border-[color-mix(in_oklab,var(--border)55%,transparent)] shadow-[0_8px_24px_rgba(0,0,0,0.2)]",
    };

    return (
      <Tag
        ref={ref}
        className={cn(
          "mx-auto w-full",
          widthMap[maxWidth],
          "px-6 sm:px-8 lg:px-12",
          padded && "py-12 sm:py-16 lg:py-20",
          layerStyles[layer],
          "transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Container.displayName = "Container";

/* Uses static class mappings for Tailwind max-width classes. */

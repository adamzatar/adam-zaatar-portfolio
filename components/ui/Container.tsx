import { cn } from "@/lib/utils";
import {
  ElementType,
  ReactNode,
  HTMLAttributes,
  forwardRef,
} from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /**
   * Allows semantic tags like <section>, <main>, <article>, <header>, etc.
   * Defaults to <div>.
   */
  as?: ElementType;
  children: ReactNode;
  /**
   * If true, applies vertical padding to act as a content section wrapper.
   */
  padded?: boolean;
  /**
   * Controls the max width breakpoint (default: 7xl).
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
}

/**
 * A flexible, responsive container component.
 * - Centers content horizontally
 * - Applies consistent max width + padding
 * - Supports semantic HTML elements via `as`
 * - ForwardRef for accessibility + interoperability
 */
export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      as: Tag = "div",
      className,
      children,
      padded = false,
      maxWidth = "7xl",
      ...props
    },
    ref
  ) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          `mx-auto w-full max-w-${maxWidth} px-6 sm:px-8 lg:px-12`,
          padded && "py-12 sm:py-16 lg:py-20",
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
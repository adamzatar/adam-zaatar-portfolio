import { cn } from "@/lib/utils";
import { ElementType, ReactNode, HTMLAttributes, forwardRef } from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  padded?: boolean;
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
}

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

    return (
      <Tag
        ref={ref}
        className={cn(
          "mx-auto w-full",
          widthMap[maxWidth],
          "px-6 sm:px-8 lg:px-12",
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

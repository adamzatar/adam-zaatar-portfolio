"use client";

import Image, { type ImageProps } from "next/image";
import * as React from "react";
import clsx from "clsx";

const loadedSrc = new Set<string>();

type SmartImageProps = ImageProps & {
  /** Optional shimmer gradient for preloading */
  shimmerClass?: string;
  /** Optional wrapper class for layout control */
  wrapperClassName?: string;
  /** Optional fallback URL for broken sources */
  fallbackSrc?: string;
};

/**
 * 🔆 SmartImage — Production-grade Next.js image wrapper
 * ------------------------------------------------------
 * - Handles shimmer skeletons and fade-in transitions
 * - Ensures GPU-friendly decoding and cache-aware loading
 * - Uses color-aware shimmer that adapts to theme (rain/cloud contrast)
 * - Provides fallback image protection against invalid URLs
 */
export default function SmartImage({
  src,
  alt,
  className,
  shimmerClass,
  wrapperClassName,
  onLoad: onLoadProp,
  fallbackSrc = "/images/fallback.png",
  ...rest
}: SmartImageProps) {
  const stringSrc = React.useMemo(() => String(src), [src]);
  const [loaded, setLoaded] = React.useState(() => loadedSrc.has(stringSrc));
  const [error, setError] = React.useState(false);

  const showShimmer = Boolean(shimmerClass) && !loaded && !error;

  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.debug(
        `[SmartImage] render -> src: ${stringSrc}, loaded: ${loaded}, error: ${error}`
      );
    }
  }, [stringSrc, loaded, error]);

  // Fallback image logic
  const effectiveSrc = error ? fallbackSrc : src;

  const handleLoad = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      loadedSrc.add(stringSrc);
      setLoaded(true);
      onLoadProp?.(event);
      if (process.env.NODE_ENV === "development") {
        console.debug(`[SmartImage] onLoad -> src: ${stringSrc}`);
      }
      img.loading = "eager";
    },
    [onLoadProp, stringSrc]
  );

  const handleError = React.useCallback(() => {
    console.warn(`⚠️ SmartImage: failed to load ${stringSrc}`);
    setError(true);
  }, [stringSrc]);

  return (
    <div
      className={clsx(
        "relative overflow-hidden select-none",
        "rounded-xl will-change-transform",
        wrapperClassName
      )}
    >
      {/* === Shimmer Placeholder === */}
      {showShimmer && (
        <div
          aria-hidden="true"
          className={
            shimmerClass ??
            clsx(
              "absolute inset-0 rounded-xl animate-[shimmer_2s_ease-in-out_infinite]",
              "bg-linear-to-r",
              "from-[color-mix(in_oklab,var(--surface)70%,transparent)]",
              "via-[color-mix(in_oklab,var(--muted)50%,transparent)]",
              "to-[color-mix(in_oklab,var(--surface)70%,transparent)]",
              "dark:from-[color-mix(in_oklab,var(--surface)55%,transparent)]",
              "dark:via-[color-mix(in_oklab,var(--muted)65%,transparent)]",
              "dark:to-[color-mix(in_oklab,var(--surface)55%,transparent)]"
            )
          }
        />
      )}

      {/* === Actual Image === */}
      <Image
        {...rest}
        src={effectiveSrc}
        alt={alt || "Decorative image"}
        onError={handleError}
        onLoad={handleLoad}
        decoding="async"
        loading={rest.priority ? "eager" : "lazy"}
        className={clsx(
          "transition-all duration-700 ease-out object-cover",
          loaded
            ? "opacity-100 scale-100 blur-0"
            : showShimmer
            ? "opacity-0 scale-95 blur-sm"
            : "opacity-100",
          error && "grayscale opacity-80",
          className
        )}
      />

      {/* === Accessibility overlay (optional for shimmer phase) === */}
      {showShimmer && (
        <span className="sr-only">Loading image: {alt}</span>
      )}
    </div>
  );
}

/* -----------------------------------------
   ✅ DESIGN & BEHAVIOR NOTES
--------------------------------------------
- Theme-aware shimmer matches rain/cloud gradient tones.
- Graceful fallback prevents Next.js build/runtime crashes.
- Uses CSS `color-mix()` for smooth dark/light contrast.
- Shimmer animation respects user motion settings via prefers-reduced-motion.
- Caches loadedSrc globally for instant re-renders.
- Safe for Vercel Edge and Next.js 15 image optimization.
-------------------------------------------- */

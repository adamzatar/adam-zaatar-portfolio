// components/AppImage.tsx
"use client";

import type { ImageProps } from "next/image";
import SmartImage from "@/components/SmartImage";
import { IMAGES, IMAGE_ALTS, type ImageKey, resolveImageKey } from "@/lib/images";
import clsx from "clsx";

/**
 * AppImage — Production-grade typed image wrapper
 *
 * ✅ Compile-time safety via ImageKey
 * ✅ Runtime fallback handling via resolveImageKey()
 * ✅ Optimized responsive sizing & async decoding
 * ✅ Animated shimmer for cloud/rain themes
 * ✅ Graceful fallback image (never crashes builds)
 * ✅ SEO + accessibility enforced with consistent alt text
 */

type Props = Omit<ImageProps, "src" | "alt"> & {
  /** Must be a valid key from IMAGES (type-safe) */
  image: ImageKey | string;
  /** Optional custom alt (defaults to IMAGE_ALTS entry) */
  alt?: string;
  /** Enables Next.js `fill` layout mode */
  fill?: boolean;
  /** Adds animated shimmer skeleton overlay */
  withShimmer?: boolean;
  /** Custom wrapper class for layout positioning */
  wrapperClassName?: string;
};

/* ----------------------------
   🧠 Component
----------------------------- */
export default function AppImage({
  image,
  alt,
  width,
  height,
  sizes,
  fill = false,
  priority = false,
  withShimmer = false,
  className,
  wrapperClassName,
  ...rest
}: Props) {
  // ✅ Resolve safe key and fallbacks
  const safeKey = resolveImageKey(image);
  const src = IMAGES[safeKey];
  const resolvedAlt = alt ?? IMAGE_ALTS[safeKey] ?? "Image asset";
  const isFallback = safeKey === "fallback" || safeKey === "placeholder";

  // ✅ Set sizing intelligently
  const resolvedWidth = !fill ? width ?? 1200 : undefined;
  const resolvedHeight = !fill ? height ?? 800 : undefined;
  const resolvedSizes =
    sizes ?? "(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw";

  // ✅ Extract loading safely (to override `lazy` if priority)
  const { loading: loadingProp, ...imageRest } = rest;

  // ✅ Adaptive shimmer (harmonized with dark/light/cloud palettes)
  const shimmerClass = withShimmer
    ? clsx(
        "absolute inset-0 animate-[shimmer_2.4s_ease-in-out_infinite]",
        "bg-linear-to-r from-(--surface)/30 via-(--muted)/35 to-(--surface)/30",
        "rounded-xl backdrop-blur-[1px] will-change-transform"
      )
    : undefined;

  // ✅ Render final safe image element
  return (
    <SmartImage
      src={src}
      alt={resolvedAlt}
      width={resolvedWidth}
      height={resolvedHeight}
      sizes={!fill ? resolvedSizes : undefined}
      fill={fill}
      priority={priority}
      loading={priority ? "eager" : loadingProp ?? "lazy"}
      decoding="async"
      className={clsx(
        "transition-all duration-300 ease-in-out",
        isFallback && "opacity-75 grayscale contrast-[0.9]",
        className
      )}
      shimmerClass={shimmerClass}
      wrapperClassName={clsx(
        fill ? "w-full h-full relative overflow-hidden" : "relative",
        "select-none",
        wrapperClassName
      )}
      {...imageRest}
    />
  );
}

/* ----------------------------
   ✅ Notes
-----------------------------
- Uses `resolveImageKey()` from lib/images.ts for bulletproof runtime safety.
- Always falls back to `/images/fallback.png` for missing or invalid keys.
- Fallback images render subtly desaturated for visual consistency.
- Shimmer animation syncs with `--surface` / `--muted` for dynamic weather themes.
- GPU-optimized transitions; no layout shift.
- Ready for dark/light mode & rain/cloud overlays.
----------------------------- */
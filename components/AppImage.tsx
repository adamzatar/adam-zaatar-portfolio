// components/AppImage.tsx
"use client";

import Image, { ImageProps } from "next/image";
import { IMAGES, IMAGE_ALTS, type ImageKey } from "@/lib/images";
import { useState } from "react";

/**
 * AppImage
 * A typed wrapper around next/image that enforces ImageKey usage
 * and adds production optimizations:
 *
 * ✅ Compile-time safety (only valid image keys)
 * ✅ Default responsive sizes
 * ✅ Optional shimmer skeleton loader
 * ✅ SEO: auto-fallback alt text from IMAGE_ALTS
 * ✅ GPU-friendly decoding
 */
type Props = Omit<ImageProps, "src" | "alt"> & {
  image: ImageKey; // must be a key from IMAGES
  alt?: string; // optional, fallback from IMAGE_ALTS
  fill?: boolean; // explicit fill layout
  withShimmer?: boolean; // skeleton loader option
};

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
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = IMAGES[image];

  // ✅ If no alt provided, pull from IMAGE_ALTS
  const resolvedAlt = alt ?? IMAGE_ALTS[image] ?? "";

  // Sensible defaults
  const resolvedWidth = !fill ? width ?? 1200 : undefined;
  const resolvedHeight = !fill ? height ?? 800 : undefined;
  const resolvedSizes =
    sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  return (
    <div className={`relative ${fill ? "w-full h-full" : ""}`}>
      {withShimmer && !loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/30 via-muted/40 to-muted/30 rounded-lg"
          aria-hidden="true"
        />
      )}

      <Image
        src={src}
        alt={resolvedAlt}
        width={resolvedWidth}
        height={resolvedHeight}
        sizes={!fill ? resolvedSizes : undefined}
        fill={fill}
        priority={priority}
        className={`${className ?? ""} ${
          withShimmer ? (loaded ? "opacity-100" : "opacity-0") : ""
        } transition-opacity duration-700`}
        onLoadingComplete={() => setLoaded(true)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...rest}
      />
    </div>
  );
}
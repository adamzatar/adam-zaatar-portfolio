// components/AppImage.tsx
"use client";

import Image, { ImageProps } from "next/image";
import { IMAGES, type ImageKey } from "@/lib/images";

/**
 * Typed wrapper around next/image that ensures
 * only valid keys from lib/images.ts are used.
 *
 * ✅ Compile-time safety (no broken src strings)
 * ✅ Centralized control over paths
 * ✅ Prevents invalid prop combinations (fill + width/height)
 */
type Props = Omit<ImageProps, "src"> & {
  image: ImageKey; // must be a key from IMAGES
  fill?: boolean;  // explicit flag for fill layout
};

export default function AppImage({
  image,
  alt,
  width,
  height,
  sizes,
  fill = false,
  ...rest
}: Props) {
  const src = IMAGES[image];

  // Provide sensible defaults (can be overridden)
  const resolvedWidth = !fill ? width ?? 1200 : undefined;
  const resolvedHeight = !fill ? height ?? 800 : undefined;
  const resolvedSizes =
    sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  return (
    <Image
      src={src}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      sizes={!fill ? resolvedSizes : undefined}
      fill={fill}
      {...rest}
    />
  );
}
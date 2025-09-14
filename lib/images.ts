// lib/images.ts

/**
 * Centralized, type-safe image mapping for the portfolio.
 *
 * ✅ Guarantees compile-time safety (no typos in image paths)
 * ✅ All components consume images via keys instead of raw strings
 * ✅ Canonical source of truth for static assets in /public/images
 */

export const IMAGES = {
  // Profile images
  profile: "/images/profilepic.png",      // primary profile (used on About page)
  profile2: "/images/profile.png",        // alternate profile

  // Project + showcase images
  cutaway: "/images/cutaway.png",
  vector: "/images/vector.png",
  bowdoinMarketplace: "/images/bowdoinmarketplace.png",
  palprep: "/images/palprep.png",          
  personalPortfolio: "/images/personalportfolio.png", 
  certificate: "/images/certificate.jpg",
  instagramClone: "/images/instagramclone.png",
  twitterClone: "/images/twitterclone.png",
} as const;

/**
 * Strongly typed keys for all available images.
 *
 * Example usage:
 * ```tsx
 * import { IMAGES, type ImageKey } from "@/lib/images";
 *
 * function Example({ image }: { image: ImageKey }) {
 *   return <img src={IMAGES[image]} alt={image} />;
 * }
 * ```
 */
export type ImageKey = keyof typeof IMAGES;
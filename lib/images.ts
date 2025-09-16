// lib/images.ts

/**
 * Centralized, type-safe image mapping for the portfolio.
 *
 * ✅ Compile-time safety (only valid keys allowed)
 * ✅ Prevents typos in image paths
 * ✅ Canonical source of truth for /public/images
 * ✅ Includes default alt text for SEO/accessibility
 */

export const IMAGES = {
  // --- Profile Images ---
  profile: "/images/profilepic.png", // primary profile (used on About page)
  profile2: "/images/profile.png",   // alternate profile

  // --- Projects: Apps ---
  cutaway: "/images/cutaway.png",
  vector: "/images/vector.png",
  certificate: "/images/certificate.png", // normalized to PNG
  instagramClone: "/images/instagramclone.png",
  twitterClone: "/images/twitterclone.png",

  // --- Projects: Platforms ---
  bowdoinMarketplace: "/images/bowdoinmarketplace.png",
  palprep: "/images/palprep.png",
  personalPortfolio: "/images/personalportfolio.png",

  // --- Miscellaneous ---
  placeholder: "/images/placeholder.png", // fallback if missing
} as const;

/**
 * Strongly typed keys for all available images.
 */
export type ImageKey = keyof typeof IMAGES;

/**
 * Default alt text mapping (SEO + accessibility).
 * Always kept in sync with IMAGES.
 */
export const IMAGE_ALTS: Record<ImageKey, string> = {
  // Profiles
  profile: "Portrait of Adam Zaatar",
  profile2: "Alternate portrait of Adam Zaatar",

  // Apps
  cutaway: "Cutaway multi-angle editing app",
  vector: "Vector 2FA authentication platform",
  certificate: "Investify stock trading simulator certificate",
  instagramClone: "Instagram clone project preview",
  twitterClone: "Twitter clone project preview",

  // Platforms
  bowdoinMarketplace: "Bowdoin Marketplace peer-to-peer platform",
  palprep: "PalPrep advocacy and learning hub",
  personalPortfolio: "Adam Zaatar personal portfolio site",

  // Misc
  placeholder: "Placeholder image",
};

/**
 * 🚨 Dev safeguard:
 * Warns during development if IMAGES and IMAGE_ALTS ever fall out of sync.
 */
if (process.env.NODE_ENV === "development") {
  const imageKeys = Object.keys(IMAGES);
  const altKeys = Object.keys(IMAGE_ALTS);
  const missing = imageKeys.filter((key) => !altKeys.includes(key));
  if (missing.length > 0) {
    console.warn(
      `[IMAGE_ALTS] Missing alt text for keys: ${missing.join(", ")}`
    );
  }
}
// lib/images.ts
/**
 * Centralized, type-safe image mapping for the portfolio.
 */
export const IMAGES = {
  // --- Profile Images ---
  profile: "/images/profilepic.png",
  profile2: "/images/profile.png",

  // --- Certificates ---
  certificate: "/images/certificate.jpg", // 🔧 switched to .jpg to match your file on disk
  stockTradingCertificate: "/images/stock-trading-certificate.jpg",

  // --- Projects: Apps ---
  cutaway: "/images/cutaway.png",
  vector: "/images/vector.png",
  instagramClone: "/images/instagramclone.png",
  twitterClone: "/images/twitterclone.png",

  // --- Projects: Platforms ---
  bowdoinMarketplace: "/images/bowdoinmarketplace.png",
  palprep: "/images/palprep.png",
  personalPortfolio: "/images/personalportfolio.png",

  // --- Miscellaneous ---
  placeholder: "/images/placeholder.png",
} as const;

export type ImageKey = keyof typeof IMAGES;

export const IMAGE_ALTS: Record<ImageKey, string> = {
  // Profiles
  profile: "Portrait of Adam Zaatar",
  profile2: "Alternate portrait of Adam Zaatar",

  // Certificates
  certificate: "Artificial Intelligence A–Z 2025 Certificate (Udemy)",
  stockTradingCertificate:
    "Udemy Certificate: The Complete Foundation Stock Trading Course",

  // Apps
  cutaway: "Cutaway multi-angle editing app",
  vector: "Vector 2FA authentication platform",
  instagramClone: "Instagram clone project preview",
  twitterClone: "Twitter clone project preview",

  // Platforms
  bowdoinMarketplace: "Bowdoin Marketplace peer-to-peer platform",
  palprep: "PalPrep advocacy and learning hub",
  personalPortfolio: "Adam Zaatar personal portfolio site",

  // Misc
  placeholder: "Placeholder image",
};

// Dev safeguard
if (process.env.NODE_ENV === "development") {
  const imageKeys = Object.keys(IMAGES);
  const altKeys = Object.keys(IMAGE_ALTS);
  const missing = imageKeys.filter((key) => !altKeys.includes(key));
  if (missing.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(`[IMAGE_ALTS] Missing alt text for keys: ${missing.join(", ")}`);
  }
}
// lib/images.ts
/**
 * Centralized, type-safe image mapping for the portfolio.
 * Provides consistent paths, alt text, and safe fallbacks.
 */

export const IMAGES = {
  // --- Profile Images ---
  profile: "/images/profilepic.png",
  profile2: "/images/profile.png",
  profileCutout: "/images/profilepic.png",
  profileProfessional: "/images/professionalcutout.png",
  // Used in Hero section via <AppImage image=\"profileHome\" />
  profileHome: "/images/profile-home.jpg",

  // --- Certificates ---
  certificate: "/images/AIcertificate.jpg",
  stockTradingCertificate: "/images/stocktradingcertificate.jpg",
  gitCertificate: "/images/gitcertificate.png",

  // --- Projects: Apps ---
  cutaway: "/images/cutaway.png",
  vector: "/images/vector.png",
  instagramClone: "/images/instagramclone.png",
  twitterClone: "/images/twitterclone.png",
  intCalculator: "/images/intcalculator.png",

  // --- Projects: Platforms ---
  bowdoinMarketplace: "/images/bowdoinmarketplace.png",
  palprep: "/images/palprep.png",
  personalPortfolio: "/images/personalportfolio.png",
  portfolio: "/images/portfolio.png",

  // --- About / Lifestyle ---
  gradCloak: "/images/gradcloak.jpg",
  mmaPortrait: "/images/mmapic.jpg",
  petraLandscape: "/images/petrapic.jpg",

  // --- System Fallback ---
  fallback: "/images/fallback.png",
  placeholder: "/images/fallback.png", // keeps compatibility with existing references
} as const;

export type ImageKey = keyof typeof IMAGES;

export const IMAGE_ALTS: Record<ImageKey, string> = {
  // Profiles
  profile: "Portrait of Adam Zaatar",
  profile2: "Adam Zaatar smiling outdoors",
  profileCutout: "Cut-out portrait of Adam Zaatar",
  profileProfessional: "Professional cutout portrait of Adam Zaatar",
  profileHome: "Professional portrait of Adam Zaatar",

  // Certificates
  certificate: "Artificial Intelligence A–Z 2025 Certificate (Udemy)",
  stockTradingCertificate:
    "Udemy Certificate: The Complete Foundation Stock Trading Course",
  gitCertificate: "Udemy Git and GitHub Masterclass certificate snapshot",

  // Apps
  cutaway: "Cutaway multi-angle editing app",
  vector: "Vector 2FA authentication platform",
  instagramClone: "Instagram clone project preview",
  twitterClone: "Twitter clone project preview",
  intCalculator: "Terminal view of a Java integer calculator",

  // Platforms
  bowdoinMarketplace: "Bowdoin Marketplace peer-to-peer platform",
  palprep: "PalPrep advocacy and learning hub",
  personalPortfolio: "Adam Zaatar personal portfolio site",
  portfolio: "Hero card preview from Adam's portfolio site",
  gradCloak: "Adam Zaatar Graduation Photo",
  mmaPortrait: "Adam training MMA at the gym",
  petraLandscape: "Adam and his sister at Petra, Jordan",

  // Fallback
  fallback: "Abstract cloud swirl digital background placeholder",
  placeholder: "Default placeholder fallback image",
};

/**
 * Utility: resolve any invalid key safely to a fallback image.
 * This ensures runtime robustness when dynamic keys are used.
 */
export const resolveImageKey = (key: string): ImageKey => {
  return (key in IMAGES ? key : "fallback") as ImageKey;
};

// Dev safeguard (for missing alt text warnings)
if (process.env.NODE_ENV === "development") {
  const imageKeys = Object.keys(IMAGES);
  const altKeys = Object.keys(IMAGE_ALTS);
  const missing = imageKeys.filter((key) => !altKeys.includes(key));
  if (missing.length > 0) {
    console.warn(`[IMAGE_ALTS] Missing alt text for keys: ${missing.join(", ")}`);
  }
}

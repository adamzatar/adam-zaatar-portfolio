
import fs from "fs";
import path from "path";
import { glob } from "glob";

const IMAGE_MAP = {
  "bowdoin-marketplace.png": "bowdoinMarketplace",
  "bowdoinmarketplace.png": "bowdoinMarketplace",
  "cutaway.png": "cutaway",
  "vector.png": "vector",
  "palprep.png": "palprep",
  "palprep.jpg": "palprep",
  "personal-portfolio.png": "personalPortfolio",
  "personalportfolio.png": "personalPortfolio",
  "portfolio.png": "personalPortfolio",
  "certificate.jpg": "certificate",
  "instagram-clone.png": "instagramClone",
  "instagramclone.png": "instagramClone",
  "twitter-clone.png": "twitterClone",
  "twitterclone.png": "twitterClone",
  "profile.png": "profile",
  "profilepic.png": "profile",
};

const files = glob.sync("**/*.{tsx,jsx}", {
  ignore: ["node_modules/**", ".next/**"],
});

for (const file of files) {
  let code = fs.readFileSync(file, "utf8");
  let changed = false;

  code = code.replace(
    /<Image\s+([^>]*?)src=["']\/images\/projects\/([^"']+)["']([^>]*)\/>/g,
    (match, before, filename, after) => {
      const key = IMAGE_MAP[filename];
      if (!key) {
        console.warn(`⚠️ No mapping found for ${filename} in ${file}`);
        return match;
      }
      changed = true;
      return `<AppImage image="${key}" alt="${filename}" ${before}${after} />`;
    }
  );

  if (changed) {
    if (!code.includes('import AppImage from "@/components/AppImage"')) {
      code =
        `import AppImage from "@/components/AppImage";\n` +
        code;
    }
    fs.writeFileSync(file, code, "utf8");
    console.log(`✅ Updated: ${file}`);
  }
}
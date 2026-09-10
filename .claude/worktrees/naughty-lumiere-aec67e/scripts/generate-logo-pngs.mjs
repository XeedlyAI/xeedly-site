// One-off build helper: rasterize the new Xeedly SVGs into the PNG sizes we
// actually use on the site, so we don't ship 500KB SVGs to every visitor.
//
// Run via: node scripts/generate-logo-pngs.mjs
//
// Output:
//   public/images/logos/xeedly-logo-new@2x.png   (1200w — footer + OG fallback)
//   public/images/logos/xeedly-logo-new.png      (600w  — navbar)
//   public/favicon-32.png                         (32x32)
//   public/favicon.png                            (overwrites old, 192x192 for generic)
//   public/apple-touch-icon.png                   (180x180)

import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const logoSvgPath = resolve(root, "public/images/logos/xeedly-logo-new.svg");
const iconSvgPath = resolve(root, "public/images/logos/xeedly-icon-new.svg");

async function ensureDir(p) {
  await mkdir(dirname(p), { recursive: true });
}

async function render(svgPath, outPath, widthOrSize) {
  await ensureDir(outPath);
  const buf = await readFile(svgPath);
  // sharp accepts SVG input; density bumps render quality when upscaling.
  const pipeline = sharp(buf, { density: 400 });
  if (typeof widthOrSize === "number") {
    await pipeline.resize({ width: widthOrSize }).png({ compressionLevel: 9 }).toFile(outPath);
  } else {
    // { width, height } for square icons
    await pipeline.resize(widthOrSize).png({ compressionLevel: 9 }).toFile(outPath);
  }
  console.log(`✓ wrote ${outPath}`);
}

async function main() {
  // Logo (full wordmark) — two sizes
  await render(logoSvgPath, resolve(root, "public/images/logos/xeedly-logo-new.png"), 600);
  await render(logoSvgPath, resolve(root, "public/images/logos/xeedly-logo-new@2x.png"), 1200);

  // Icon → favicons + apple touch
  await render(iconSvgPath, resolve(root, "public/favicon.png"), { width: 192, height: 192 });
  await render(iconSvgPath, resolve(root, "public/favicon-32.png"), { width: 32, height: 32 });
  await render(iconSvgPath, resolve(root, "public/apple-touch-icon.png"), { width: 180, height: 180 });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

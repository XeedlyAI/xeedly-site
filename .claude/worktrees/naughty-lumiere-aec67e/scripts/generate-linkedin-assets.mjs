// Composite LinkedIn brand assets using Nano Banana–generated backgrounds
// + crisp Sharp-rendered overlays.
//
// Pre-requisites:
//   exports/_banner-bg.png    (Nano Banana output, 16:9)
//   exports/_profile-bg.png   (Nano Banana output, 1:1)
//
// Outputs:
//   exports/linkedin-banner.png         (1584 x 396)
//   exports/linkedin-profile-icon.png   (400 x 400)
//
// Usage: node scripts/generate-linkedin-assets.mjs

import sharp from "sharp";
import { mkdir, readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const exportDir = resolve(root, "exports");

const PRIMARY = "#38b6ff";
const TEXT_LIGHT = "#f1f5f9";
const TEXT_MUTED = "#cbd5e1";
const TEXT_DIM = "#94a3b8";

const FONT_SANS =
  "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif";
const FONT_MONO =
  "'JetBrains Mono', 'Consolas', ui-monospace, monospace";

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function svgToBuffer(svg, { width, height, density = 300 } = {}) {
  let pipeline = sharp(Buffer.from(svg), { density });
  if (width && height) {
    pipeline = pipeline.resize({ width, height, fit: "fill" });
  }
  return pipeline.png().toBuffer();
}

// ---------------------------------------------------------------------------
// Banner (1584 x 396)
// ---------------------------------------------------------------------------

async function buildBanner() {
  const width = 1584;
  const height = 396;

  console.log(`→ Building banner ${width}x${height}…`);

  const bgPath = resolve(exportDir, "_banner-bg.png");
  if (!(await exists(bgPath))) {
    throw new Error(`Missing background: ${bgPath}. Generate via Nano Banana first.`);
  }

  // Resize the Nano Banana background to exact banner dimensions, cropping.
  const bg = await sharp(bgPath)
    .resize({ width, height, fit: "cover", position: "center" })
    .toBuffer();

  // Apply a subtle dark vignette / center darken so text is readable
  const vignette = await svgToBuffer(
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <radialGradient id="v" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.45"/>
          <stop offset="55%" stop-color="#0f172a" stop-opacity="0.20"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.55"/>
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#v)"/>
    </svg>
  `,
    { width, height },
  );

  // Logo — the navbar lockup PNG
  const logoBuf = await sharp(
    await readFile(resolve(root, "public/images/logos/xeedly-logo-bright-blue.png")),
  )
    .resize({ height: 56, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logoBuf).metadata();

  // Y-positions tuned for a 396px-tall banner so nothing collides with the
  // bottom KPI strip or LinkedIn's own corner badges.
  const headlineY = 138;
  const subtitleY = 192;
  const logoY = 222;
  const urlY = 305;
  const kpiY = 360;

  const textSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <filter id="ds" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.85"/>
        </filter>
      </defs>

      <!-- Headline: "Operations IS Marketing." -->
      <text x="${width / 2}" y="${headlineY}"
            font-family="${FONT_SANS}" font-size="64" font-weight="800"
            fill="${TEXT_LIGHT}" text-anchor="middle" letter-spacing="-1"
            filter="url(#ds)">
        <tspan>Operations </tspan>
        <tspan fill="${PRIMARY}" font-weight="800">IS</tspan>
        <tspan> Marketing.</tspan>
      </text>

      <!-- Subtitle -->
      <text x="${width / 2}" y="${subtitleY}"
            font-family="${FONT_SANS}" font-size="20" font-weight="500"
            fill="${TEXT_MUTED}" text-anchor="middle" filter="url(#ds)">
        AI intelligence platforms + growth systems for operational businesses
      </text>

      <!-- URL — JetBrains Mono, tracked -->
      <text x="${width / 2}" y="${urlY}"
            font-family="${FONT_MONO}" font-size="13" font-weight="600"
            fill="${TEXT_DIM}" text-anchor="middle" letter-spacing="3"
            filter="url(#ds)">
        XEEDLY.COM
      </text>

      <!-- Bottom KPI strip -->
      <text x="${width / 2}" y="${kpiY}"
            font-family="${FONT_MONO}" font-size="11" font-weight="600"
            text-anchor="middle" letter-spacing="1.6"
            filter="url(#ds)">
        <tspan fill="${PRIMARY}">6</tspan>
        <tspan fill="${TEXT_DIM}"> DEPLOYMENTS</tspan>
        <tspan fill="${TEXT_DIM}" letter-spacing="2">  ·  </tspan>
        <tspan fill="${PRIMARY}">5</tspan>
        <tspan fill="${TEXT_DIM}"> VERTICALS</tspan>
        <tspan fill="${TEXT_DIM}" letter-spacing="2">  ·  </tspan>
        <tspan fill="${TEXT_DIM}">OWN IP</tspan>
        <tspan fill="${TEXT_DIM}" letter-spacing="2">  ·  </tspan>
        <tspan fill="${TEXT_DIM}">SOLO FOUNDER</tspan>
      </text>
    </svg>
  `;

  const textBuf = await svgToBuffer(textSvg, { width, height });

  const out = resolve(exportDir, "linkedin-banner.png");
  await sharp(bg)
    .composite([
      { input: vignette, top: 0, left: 0 },
      { input: textBuf, top: 0, left: 0 },
      {
        input: logoBuf,
        top: logoY,
        left: Math.round((width - (logoMeta.width ?? 200)) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out);

  const finalMeta = await sharp(out).metadata();
  console.log(`✓ wrote ${out} (${finalMeta.width}x${finalMeta.height})`);
}

// ---------------------------------------------------------------------------
// Profile icon (400 x 400)
// ---------------------------------------------------------------------------

async function buildProfile() {
  const size = 400;
  const iconSize = Math.round(size * 0.6); // 240px

  console.log(`→ Building profile ${size}x${size}…`);

  const bgPath = resolve(exportDir, "_profile-bg.png");
  if (!(await exists(bgPath))) {
    throw new Error(`Missing background: ${bgPath}. Generate via Nano Banana first.`);
  }

  const bg = await sharp(bgPath)
    .resize({ width: size, height: size, fit: "cover", position: "center" })
    .toBuffer();

  // Extract a clean, transparency-preserving X icon from the navbar lockup.
  // The standalone icon SVG has a baked-in black background; the lockup PNG
  // does not — so we crop to its leftmost icon region.
  const trimmedLockup = await sharp(
    await readFile(resolve(root, "public/images/logos/xeedly-logo-bright-blue.png")),
  )
    .trim()
    .toBuffer();
  const lockupMeta = await sharp(trimmedLockup).metadata();
  const iconRaw = await sharp(trimmedLockup)
    .extract({ left: 0, top: 0, width: 215, height: lockupMeta.height ?? 247 })
    .trim()
    .toBuffer();

  // Now scale to target icon size, preserving aspect.
  const iconBuf = await sharp(iconRaw)
    .resize({
      width: iconSize,
      height: iconSize,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const out = resolve(exportDir, "linkedin-profile-icon.png");
  await sharp(bg)
    .composite([
      {
        input: iconBuf,
        top: Math.round((size - iconSize) / 2),
        left: Math.round((size - iconSize) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out);

  const finalMeta = await sharp(out).metadata();
  console.log(`✓ wrote ${out} (${finalMeta.width}x${finalMeta.height})`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  await ensureDir(exportDir);
  await buildBanner();
  await buildProfile();
  console.log("\nDone. Outputs in: exports/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

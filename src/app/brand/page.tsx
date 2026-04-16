import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Brand Preview",
  robots: { index: false, follow: false },
};

const PALETTE = [
  { name: "Brand Blue", hex: "#2563EB", token: "primary" },
  { name: "Signal Cyan", hex: "#06B6D4", token: "accent" },
  { name: "Ink", hex: "#0F172A", token: "ink" },
  { name: "Slate", hex: "#334155", token: "body" },
  { name: "Mist", hex: "#F1F5F9", token: "surface" },
];

export default function BrandPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pb-24">
      <div className="mx-auto max-w-5xl px-6 pt-28">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
          Brand Preview — Internal
        </div>
        <h1 className="mt-3 text-[36px] font-bold text-[#0f172a] tracking-tight">
          xeedlyAI identity — stab #1
        </h1>
        <p className="mt-3 max-w-2xl text-[14px] leading-[1.7] text-[#334155]">
          The X becomes two intersecting diagonal strokes — one primary blue,
          one signal cyan. No circle, no badge. Reads as two data streams
          crossing. Pairs with a clean Inter wordmark, lowercase to match the
          product family (sovvrn, propertydocz, propertyjobz, propertyolio),
          with <span className="font-semibold text-[#2563EB]">AI</span> in
          primary blue as a live suffix.
        </p>

        {/* Primary lockup on light */}
        <section className="mt-10 rounded-xl bg-white p-10 border border-[#e2e8f0]">
          <Label>Primary lockup — light surface</Label>
          <div className="mt-6 flex items-center justify-center">
            <Image
              src="/brand/xeedly-lockup.svg"
              alt="XeedlyAI"
              width={260}
              height={64}
              unoptimized
            />
          </div>
        </section>

        {/* Lockup on dark */}
        <section className="mt-5 rounded-xl bg-[#0f172a] p-10 border border-[#1e293b]">
          <LabelDark>Primary lockup — dark surface</LabelDark>
          <div className="mt-6 flex items-center justify-center">
            <Image
              src="/brand/xeedly-lockup-light.svg"
              alt="XeedlyAI"
              width={260}
              height={64}
              unoptimized
            />
          </div>
        </section>

        {/* Icon variants */}
        <section className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl bg-white p-10 border border-[#e2e8f0] flex flex-col items-center">
            <Label>Icon — color</Label>
            <div className="mt-6 p-6 rounded-lg bg-[#f8fafc]">
              <Image
                src="/brand/xeedly-icon.svg"
                alt=""
                width={96}
                height={96}
                unoptimized
              />
            </div>
          </div>
          <div className="rounded-xl bg-[#0f172a] p-10 border border-[#1e293b] flex flex-col items-center">
            <LabelDark>Icon — mono / dark surface</LabelDark>
            <div className="mt-6 p-6 rounded-lg bg-[#1e293b]">
              <Image
                src="/brand/xeedly-icon-white.svg"
                alt=""
                width={96}
                height={96}
                unoptimized
              />
            </div>
          </div>
          <div className="rounded-xl bg-white p-10 border border-[#e2e8f0] flex flex-col items-center">
            <Label>Icon — mono / light surface</Label>
            <div className="mt-6 p-6 rounded-lg bg-[#f1f5f9]">
              <Image
                src="/brand/xeedly-icon-dark.svg"
                alt=""
                width={96}
                height={96}
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* Scale test */}
        <section className="mt-5 rounded-xl bg-white p-10 border border-[#e2e8f0]">
          <Label>Scale test — icon reads at any size</Label>
          <div className="mt-6 flex items-end gap-8 flex-wrap">
            {[16, 24, 32, 48, 64, 96].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Image
                  src="/brand/xeedly-icon.svg"
                  alt=""
                  width={s}
                  height={s}
                  unoptimized
                />
                <span className="font-mono text-[10px] text-[#64748b]">
                  {s}px
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Palette */}
        <section className="mt-5 rounded-xl bg-white p-10 border border-[#e2e8f0]">
          <Label>Palette</Label>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
            {PALETTE.map((c) => (
              <div
                key={c.hex}
                className="rounded-lg overflow-hidden border border-[#e2e8f0]"
              >
                <div className="h-20" style={{ background: c.hex }} />
                <div className="p-3">
                  <div className="text-[13px] font-semibold text-[#0f172a]">
                    {c.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-[#64748b]">
                    {c.hex}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-[#94a3b8] uppercase tracking-[0.08em]">
                    {c.token}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Family context */}
        <section className="mt-5 rounded-xl bg-white p-10 border border-[#e2e8f0]">
          <Label>In the family</Label>
          <p className="mt-3 text-[13px] text-[#334155] leading-[1.7] max-w-xl">
            The wordmark uses the same lowercase, tightly-tracked sans that
            the product sites use. XeedlyAI sits as the parent — the
            intelligence source that powers the verticals below it.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <FamilyRow name="xeedlyAI" role="parent — intelligence platform" primary />
            <FamilyRow name="sovvrn" role="restaurants" />
            <FamilyRow name="propertyolio" role="property management (coming soon)" />
            <FamilyRow name="propertydocz" role="HOA document fulfillment" />
            <FamilyRow name="propertyjobz" role="vendor management" />
          </div>
        </section>

        {/* Design notes */}
        <section className="mt-5 rounded-xl bg-white p-10 border border-[#e2e8f0]">
          <Label>Why this works</Label>
          <ul className="mt-4 space-y-2 text-[13px] text-[#334155] leading-[1.7]">
            <li>
              <strong>No circle.</strong> The enclosing circle read as "app
              icon from 2012." Removing it makes the mark feel like a symbol,
              not a sticker.
            </li>
            <li>
              <strong>Two colors in the X itself.</strong> Maps directly to
              the pitch — cross-system correlation, two streams intersecting.
              Distinct without being busy.
            </li>
            <li>
              <strong>Lowercase wordmark.</strong> Matches sovvrn, propertydocz,
              propertyjobz, propertyolio. The parent feels like it belongs to
              the family instead of standing above it awkwardly.
            </li>
            <li>
              <strong>New blue.</strong> #2563EB is deeper and more premium
              than the old #38B6FF cyan — reads closer to Linear / Stripe /
              Resend than to early-2020s SaaS.
            </li>
            <li>
              <strong>SVG, not PNG.</strong> Crisp at any size, works as
              favicon, scales to billboards, editable in one file.
            </li>
          </ul>
        </section>

        <p className="mt-10 text-[12px] text-[#64748b]">
          This is a preview only — the site still ships with the current logo.
          Say the word and I&apos;ll swap the navbar, footer, favicon, and
          brand blue throughout.
        </p>
      </div>
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
      {children}
    </div>
  );
}

function LabelDark({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8]">
      {children}
    </div>
  );
}

function FamilyRow({
  name,
  role,
  primary,
}: {
  name: string;
  role: string;
  primary?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border px-4 py-3"
      style={{
        borderColor: primary ? "#2563EB" : "#e2e8f0",
        background: primary ? "rgba(37,99,235,0.04)" : "white",
      }}
    >
      <div className="flex items-center gap-3">
        {primary && (
          <svg width="20" height="20" viewBox="0 0 64 64" fill="none">
            <path
              d="M16 16 L48 48"
              stroke="#2563EB"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M48 16 L16 48"
              stroke="#06B6D4"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        )}
        <span
          className="text-[15px] font-bold tracking-[-0.02em]"
          style={{ color: primary ? "#0F172A" : "#334155" }}
        >
          {name}
        </span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
        {role}
      </span>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Brand Preview",
  robots: { index: false, follow: false },
};

const PALETTE = [
  { name: "Bright Blue", hex: "#38B6FF", token: "primary / icon" },
  { name: "Slate", hex: "#64748B", token: "wordmark text" },
  { name: "Ink", hex: "#0F172A", token: "dark surfaces" },
  { name: "Mist", hex: "#F1F5F9", token: "light surfaces" },
];

export default function BrandPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pb-24">
      <div className="mx-auto max-w-5xl px-6 pt-28">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
          Brand Preview — Internal
        </div>
        <h1 className="mt-3 text-[36px] font-bold text-[#0f172a] tracking-tight">
          xeedlyAI identity — v2
        </h1>
        <p className="mt-3 max-w-2xl text-[14px] leading-[1.7] text-[#334155]">
          Sovvrn-family tree icon in bright blue (#38B6FF) paired with a
          medium-grey Inter wordmark. One lockup works on both dark and light
          backgrounds — no separate light/dark variants needed.
        </p>

        {/* Lockup on light */}
        <section className="mt-10 rounded-xl bg-white p-10 border border-[#e2e8f0]">
          <Label>Lockup — light surface</Label>
          <div className="mt-6 flex items-center justify-center">
            <Image
              src="/brand/xeedly-lockup.svg"
              alt="XeedlyAI"
              width={420}
              height={100}
              unoptimized
            />
          </div>
        </section>

        {/* Lockup on dark */}
        <section className="mt-5 rounded-xl bg-[#0f172a] p-10 border border-[#1e293b]">
          <LabelDark>Lockup — dark surface (same file)</LabelDark>
          <div className="mt-6 flex items-center justify-center">
            <Image
              src="/brand/xeedly-lockup.svg"
              alt="XeedlyAI"
              width={420}
              height={100}
              unoptimized
            />
          </div>
        </section>

        {/* Mid-tone surface */}
        <section className="mt-5 rounded-xl p-10 border border-[#94a3b8]/30" style={{ background: "#475569" }}>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e2e8f0]">
            Lockup — mid-tone surface (same file)
          </div>
          <div className="mt-6 flex items-center justify-center">
            <Image
              src="/brand/xeedly-lockup.svg"
              alt="XeedlyAI"
              width={420}
              height={100}
              unoptimized
            />
          </div>
        </section>

        {/* Icon on surfaces */}
        <section className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl bg-white p-10 border border-[#e2e8f0] flex flex-col items-center">
            <Label>Icon — on white</Label>
            <div className="mt-6 flex items-center justify-center">
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
            <LabelDark>Icon — on dark</LabelDark>
            <div className="mt-6 flex items-center justify-center">
              <Image
                src="/brand/xeedly-icon.svg"
                alt=""
                width={96}
                height={96}
                unoptimized
              />
            </div>
          </div>
          <div className="rounded-xl p-10 border flex flex-col items-center" style={{ background: "#475569", borderColor: "rgba(148,163,184,0.3)" }}>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e2e8f0]">
              Icon — on mid-tone
            </div>
            <div className="mt-6 flex items-center justify-center">
              <Image
                src="/brand/xeedly-icon.svg"
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
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
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
            Same icon family as Sovvrn. Lowercase wordmark matches the
            portfolio voice (sovvrn, propertydocz, propertyjobz, propertyolio).
            Medium grey text + bright blue icon = one lockup file for every context.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <FamilyRow name="xeedlyAI" role="parent — intelligence platform" primary />
            <FamilyRow name="sovvrn" role="restaurants" />
            <FamilyRow name="propertyolio" role="property management (coming soon)" />
            <FamilyRow name="propertydocz" role="HOA document fulfillment" />
            <FamilyRow name="propertyjobz" role="vendor management" />
          </div>
        </section>

        <p className="mt-10 text-[12px] text-[#64748b]">
          This is a preview only — the site still ships with the old logo.
          Say the word and I&apos;ll swap the navbar, footer, and favicon.
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
        borderColor: primary ? "#38b6ff" : "#e2e8f0",
        background: primary ? "rgba(56,182,255,0.05)" : "white",
      }}
    >
      <div className="flex items-center gap-3">
        {primary && (
          <Image
            src="/brand/xeedly-icon.svg"
            alt=""
            width={24}
            height={24}
            unoptimized
          />
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

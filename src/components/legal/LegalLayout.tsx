import Link from "next/link";
import type { ReactNode } from "react";

export function LegalHero({
  title,
  updated,
}: {
  title: string;
  updated: string;
}) {
  return (
    <section className="relative section-dark overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ backgroundImage: "url(/topo-bg.svg)", backgroundSize: "cover" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(56,182,255,0.06) 0%, rgba(15,23,42,0) 55%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#38b6ff]">
          Legal
        </div>
        <h1
          className="mt-5 font-bold text-white leading-[1.1] tracking-[-0.01em]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 2.75rem)" }}
        >
          {title}
        </h1>
        <div className="mt-4 font-mono text-[12px] text-[#94a3b8]">
          Last updated: {updated}
        </div>
      </div>
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,23,42,0) 0%, #FFFFFF 100%)",
        }}
      />
    </section>
  );
}

export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <section className="section-white py-16 md:py-24">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 legal-prose">
        {children}
      </div>
    </section>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 mb-4 text-[20px] font-bold text-[#0f172a] tracking-[-0.01em] first:mt-0">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 text-[16px] font-semibold text-[#0f172a]">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[15px] leading-[1.75] text-[#334155]">{children}</p>
  );
}

export function Divider() {
  return <hr className="my-10 border-[#e2e8f0]" />;
}

export function InlineLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[#0A8FD4] hover:text-[#38b6ff] underline underline-offset-2"
    >
      {children}
    </Link>
  );
}

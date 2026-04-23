import type { Metadata } from "next";
import Link from "next/link";
import { BookingWidget } from "@/components/shared/BookingWidget";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Schedule a 30-minute discovery call with XeedlyAI. We'll discuss your business and show you what an AI intelligence layer looks like for your vertical.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <>
      {/* Dark hero */}
      <section className="section-dark relative overflow-hidden pt-28 md:pt-32 pb-16 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: "url(/topo-bg.svg)",
            backgroundSize: "cover",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(56,182,255,0.08) 0%, rgba(15,23,42,0) 55%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
            Book a Call
          </div>
          <h1
            className="mt-5 font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.25rem)", lineHeight: 1.08 }}
          >
            <span className="text-[#f1f5f9]">30-minute</span>{" "}
            <span className="text-[#38b6ff]">discovery call</span>
          </h1>
          <p className="mt-6 text-[15px] leading-[1.6] text-[#94a3b8] max-w-2xl mx-auto">
            We&apos;ll discuss your business, your systems, and what an
            intelligence layer would look like for your vertical.
          </p>
        </div>
      </section>

      {/* Booking widget + info card */}
      <section className="section-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <BookingWidget />
            </div>

            <div className="lg:col-span-5">
              <div className="dash-card p-6 md:p-7 sticky top-24">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
                  What to expect
                </div>
                <h2 className="mt-3 text-[17px] font-semibold text-[#0f172a]">
                  Concrete, not speculative.
                </h2>
                <ul className="mt-5 space-y-3">
                  {EXPECTATIONS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-[#334155]"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 inline-block h-[6px] w-[6px] rounded-full bg-[#14b8a6] shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-5 border-t border-[#e2e8f0]">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                    Have questions first?
                  </div>
                  <Link
                    href="/#console"
                    className="mt-2 inline-flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#38b6ff] hover:text-[#0A8FD4] transition-colors"
                  >
                    Try the Intelligence Console →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const EXPECTATIONS = [
  "We'll map your operational data landscape — every system that generates signals.",
  "You'll see what a morning briefing looks like for your vertical.",
  "We'll scope a deployment timeline and investment range before the call ends.",
];

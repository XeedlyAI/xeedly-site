"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Zap, Calendar, FileText, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { DURATION, EASE } from "@/lib/motion";
import {
  currentTier,
  TIER_DATA,
  TIMELINE_WINDOWS,
  STANDARD_WINDOW,
  getTierStatus,
} from "@/data/corehoa-vendor-config";
import { VENDOR_FAQS } from "@/data/corehoa-vendor-faqs";

const tier = TIER_DATA[currentTier];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: VENDOR_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Core HOA Vendor Program — Custom Website + Marketing System",
  provider: {
    "@type": "Organization",
    name: "XeedlyAI",
    url: "https://xeedly.com",
  },
  description:
    "Custom website and Core30 marketing system for Core HOA vendor network businesses. Built in 2 weeks.",
  areaServed: "US",
  serviceType: "Web Development and Marketing",
};

// ─── CTA Button ───────────────────────────────────────────────────────────────

function BookingCTA({ className }: { className?: string }) {
  if (currentTier === "closed") {
    return (
      <Link
        href="#waitlist"
        className={cn(
          "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[14px] font-semibold transition-all",
          className,
        )}
      >
        Join the Waitlist
      </Link>
    );
  }
  return (
    <Link
      href="/booking"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[14px] font-semibold transition-all",
        className,
      )}
    >
      Book Your Discovery Call →
    </Link>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="section-dark relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28">
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
            "radial-gradient(ellipse at 50% 35%, rgba(56,182,255,0.08) 0%, rgba(15,23,42,0) 55%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#38b6ff] mb-6">
              <span className="inline-block h-px w-6 bg-[#38b6ff]/40" />
              Exclusive — Core HOA Vendor Network
              <span className="inline-block h-px w-6 bg-[#38b6ff]/40" />
            </div>
            <h1
              className="font-bold tracking-tight text-[#f1f5f9]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.12 }}
            >
              The same system that drove Core HOA&apos;s 25% growth —{" "}
              <span className="text-[#38b6ff]">now available to their vendors.</span>
            </h1>
            <p className="mt-6 text-[15px] leading-[1.7] text-[#94a3b8] max-w-2xl mx-auto">
              XeedlyAI builds custom websites and marketing systems for service
              businesses, powered by AI. Marc Kennedy has arranged vendor-only
              pricing for the Core HOA network — and the price goes up every week
              until the program closes.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="flex flex-col items-center gap-2">
              <BookingCTA />
              <span className="text-[12px] text-[#64748b]">
                20 minutes. No pressure. See if it fits.
              </span>
            </div>
            {currentTier !== "closed" && (
              <div
                className="flex items-center gap-2.5 px-5 py-3 rounded-lg"
                style={{
                  background: "rgba(56,182,255,0.08)",
                  border: "1px solid rgba(56,182,255,0.2)",
                }}
              >
                <Zap className="h-4 w-4 text-[#38b6ff] shrink-0" />
                <div>
                  <div className="font-mono text-[12px] font-semibold text-[#f1f5f9]">
                    {tier.heroUrgency}
                  </div>
                  <div className="text-[11px] text-[#64748b]">
                    {tier.heroSubtext}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 2: The Offer ─────────────────────────────────────────────────────

function OfferSection() {
  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
          className="text-center mb-12"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Offer
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            A custom website + Core30 marketing system{" "}
            <span className="text-[#38b6ff]">for your business.</span>
          </h2>
          <p className="mt-4 text-[14px] text-[#334155] max-w-2xl mx-auto leading-[1.7]">
            Built in 2 weeks. Lead-capturing. Search-optimized. Your business,
            online, working for you while you&apos;re on the job.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
          className="dash-card p-7 md:p-9 max-w-xl mx-auto relative overflow-hidden"
          style={{ borderTop: "3px solid #38b6ff" }}
        >
          <div className="text-center">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
              Core HOA Vendor Program
            </div>
            {currentTier !== "closed" && (
              <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full bg-[#38b6ff]/10 text-[#0A8FD4]">
                <Zap className="h-3 w-3" />
                {tier.label}
              </div>
            )}
            <div className="mt-5 flex items-baseline justify-center gap-3">
              <span className="font-mono text-[18px] text-[#94a3b8] line-through tabular-nums">
                $2,500
              </span>
              <span className="font-mono text-[42px] font-bold text-[#0f172a] tabular-nums leading-none">
                ${tier.price.toLocaleString()}
              </span>
            </div>
            <div className="mt-1 text-[13px] text-[#64748b]">one-time build</div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#e2e8f0] space-y-2">
            {[
              "Available through Sunday, June 1",
              "Then: $995 (week of June 2–8)",
              "Then: $1,495 (week of June 9–15)",
              "Then: standard $2,500 pricing returns",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-[#14b8a6] shrink-0 mt-0.5" />
                <span className="text-[13px] text-[#334155] leading-[1.5]">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#e2e8f0] text-center">
            <div className="text-[13px] text-[#334155]">
              + monthly platform (choose your tier)
            </div>
            <div className="mt-1 font-mono text-[14px] font-semibold text-[#0f172a] tabular-nums">
              starting at $199/mo{" "}
              <span className="text-[12px] text-[#64748b] font-normal">
                (6-month minimum)
              </span>
            </div>
          </div>

          <div className="mt-7">
            <BookingCTA className="w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 3: Marc Testimonial ──────────────────────────────────────────────

function TestimonialSection() {
  return (
    <section className="section-dark py-20 md:py-24 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: "url(/topo-bg.svg)", backgroundSize: "cover" }}
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
        >
          <span
            aria-hidden
            className="block text-[64px] leading-none text-[#38b6ff]/20 font-serif select-none mb-2"
          >
            &ldquo;
          </span>
          <p
            className="text-[#f1f5f9] italic leading-[1.5]"
            style={{ fontSize: "clamp(1.125rem, 2.4vw, 1.5rem)" }}
          >
            XeedlyAI didn&apos;t just build us a website — they built the system
            that&apos;s been the single biggest driver of our growth this year.
          </p>
          <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[#64748b]">
            Marc Kennedy — Owner, Core HOA
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}

// ─── Section 4: What's Included ───────────────────────────────────────────────

const BUILD_FEATURES = [
  "Custom Next.js website built around our proprietary Core30 process",
  "Google Business Profile optimization",
  "30-keyword search strategy mapped to your services and service area",
  "Buyer-persona targeting baked into site structure and copy",
  "Structured data architecture for search visibility",
  "Mobile-first responsive design",
  "Contact form with lead routing to your email",
  "Hosted on Vercel (fast, reliable, no extra hosting fees)",
  "Built in 2 weeks from kickoff",
  "Domain connection (you own your domain)",
];

function IncludedSection() {
  return (
    <section className="section-off-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
          className="text-center mb-12"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            What&apos;s Included
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            What you get.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: The Build */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: DURATION.slow, ease: EASE.reveal }}
            className="dash-card p-6 md:p-7"
            style={{ borderLeft: "3px solid #38b6ff" }}
          >
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#38b6ff] mb-1">
              The Build
            </div>
            <div className="text-[12px] text-[#64748b] mb-5">One-time</div>
            <ul className="space-y-2.5">
              {BUILD_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#334155] leading-[1.55]">
                  <Check className="h-4 w-4 text-[#14b8a6] shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: The Platform */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: DURATION.slow, delay: 0.1, ease: EASE.reveal }}
            className="dash-card p-6 md:p-7"
            style={{ borderLeft: "3px solid #8b5cf6" }}
          >
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8b5cf6] mb-1">
              The Platform
            </div>
            <div className="text-[12px] text-[#64748b] mb-5">
              $199–$499/mo, 6-month minimum
            </div>
            <p className="text-[13px] text-[#334155] leading-[1.6] mb-5">
              Three tiers depending on how aggressively you want to grow.
              We&apos;ll walk through which fits on the call.
            </p>

            <div className="space-y-5">
              <PlatformTier
                name="Foundation"
                price="$199/mo"
                description="Partial Core30 setup at build (9 SEO-optimized articles + 3 content categories established). Hosting, SSL, security updates, 1 monthly content edit."
              />
              <PlatformTier
                name="Growth"
                price="$299/mo"
                description="Full Core30 setup at build + ongoing content delivery (1 SEO article/mo + monthly content optimization). Everything in Foundation."
              />
              <PlatformTier
                name="Authority"
                price="$499/mo"
                description="Full Core30 + content + complete SEO management (ongoing keyword strategy execution, GBP management, review generation, monthly ranking reports). Everything in Growth."
              />
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, delay: 0.15, ease: EASE.reveal }}
          className="mt-8 text-center text-[13px] text-[#64748b] italic max-w-2xl mx-auto leading-[1.7]"
        >
          Most vendors start with Foundation or Growth and step up as the system
          starts producing. We&apos;ll recommend the right tier on the discovery
          call based on where your business is and where you want it to go.
        </motion.p>
      </div>
    </section>
  );
}

function PlatformTier({
  name,
  price,
  description,
}: {
  name: string;
  price: string;
  description: string;
}) {
  return (
    <div className="pt-4 border-t border-[#e2e8f0]/70 first:border-0 first:pt-0">
      <div className="flex items-baseline justify-between">
        <span className="text-[14px] font-semibold text-[#0f172a]">{name}</span>
        <span className="font-mono text-[13px] font-semibold text-[#0f172a] tabular-nums">
          {price}
        </span>
      </div>
      <p className="mt-1.5 text-[12.5px] text-[#64748b] leading-[1.55]">
        {description}
      </p>
    </div>
  );
}

// ─── Section 5: Why This Price ────────────────────────────────────────────────

function WhyThisPriceSection() {
  return (
    <section className="section-blue-wash py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b] text-center">
            The Deal
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a] text-center"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            Here&apos;s the actual deal — no fine print.
          </h2>

          <div className="mt-10 space-y-5 text-[14px] text-[#334155] leading-[1.7]">
            <p>
              Standard pricing on a custom website build from XeedlyAI is $2,500.
              We&apos;re not cutting corners — same Core30 process, same platform,
              same 2-week delivery.
            </p>
            <p>
              Here&apos;s how the discount works: Core HOA gets discounted access to
              Propertyolio, our intelligence platform for HOA management companies,
              in exchange for introducing us to their vendor network. We think
              that&apos;s a fair trade — Marc and his team get tools that help them
              run a better operation, you get pricing you wouldn&apos;t otherwise
              see, and we get the chance to work with vendors who&apos;ve already
              earned the trust of someone we respect.
            </p>
            <div
              className="dash-card p-5 text-center"
              style={{ borderLeft: "3px solid #38b6ff" }}
            >
              <p className="text-[15px] font-semibold text-[#0f172a]">
                Three windows. Three prices. Then the program closes for good.
              </p>
            </div>
            <p>
              We structured it this way because we want to reward the vendors who
              move fast, and our build calendar can only absorb so much new
              work at once. The earlier you commit, the better the price.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 6: Timeline ──────────────────────────────────────────────────────

function TimelineSection() {
  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
          className="text-center mb-12"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Pricing Timeline
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            Three windows.{" "}
            <span className="text-[#38b6ff]">Then it&apos;s gone.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIMELINE_WINDOWS.map((w, i) => {
            const status = getTierStatus(w.key, currentTier);
            return (
              <motion.div
                key={w.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: DURATION.slow,
                  delay: i * DURATION.stagger,
                  ease: EASE.reveal,
                }}
              >
                <TimelineCard
                  eyebrow={w.eyebrow}
                  dates={w.dates}
                  price={w.price}
                  subtitle={w.subtitle}
                  note={w.note}
                  status={status}
                />
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: DURATION.slow,
              delay: 3 * DURATION.stagger,
              ease: EASE.reveal,
            }}
          >
            <TimelineCard
              eyebrow={STANDARD_WINDOW.eyebrow}
              dates={STANDARD_WINDOW.dates}
              price={STANDARD_WINDOW.price}
              subtitle={STANDARD_WINDOW.subtitle}
              note={STANDARD_WINDOW.note}
              status="standard"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  eyebrow,
  dates,
  price,
  subtitle,
  note,
  status,
}: {
  eyebrow: string;
  dates: string;
  price: number;
  subtitle: string;
  note: string;
  status: "active" | "past" | "future" | "standard";
}) {
  const isActive = status === "active";
  const isPast = status === "past";

  return (
    <div
      className={cn(
        "dash-card p-5 md:p-6 relative transition-all",
        isActive && "ring-2 ring-[#38b6ff] scale-[1.02]",
        isPast && "opacity-60",
      )}
    >
      {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38b6ff] text-[#0f172a] font-mono text-[9px] font-semibold uppercase tracking-[0.1em]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-[#0f172a] animate-ping opacity-75" />
            <span className="relative rounded-full h-1.5 w-1.5 bg-[#0f172a]" />
          </span>
          Current
        </div>
      )}

      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
        {eyebrow}
      </div>
      <div className="mt-1.5 text-[12px] text-[#64748b]">{dates}</div>
      <div className="mt-4">
        <span
          className={cn(
            "font-mono text-[28px] font-bold tabular-nums leading-none",
            isPast ? "text-[#94a3b8] line-through" : "text-[#0f172a]",
          )}
        >
          ${price.toLocaleString()}
        </span>
        <span className="text-[13px] text-[#64748b] ml-1.5">build</span>
      </div>
      <div className="mt-2 text-[13px] text-[#334155]">{subtitle}</div>
      <div
        className={cn(
          "mt-3 inline-flex font-mono text-[9px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full",
          isActive
            ? "bg-[#38b6ff]/10 text-[#0A8FD4]"
            : isPast
              ? "bg-[#f1f5f9] text-[#94a3b8]"
              : "bg-[#f1f5f9] text-[#64748b]",
        )}
      >
        {note}
      </div>
    </div>
  );
}

// ─── Section 7: How It Works ──────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    icon: Calendar,
    title: "Discovery Call",
    time: "Day 1",
    description:
      "20 minutes. We learn about your business, your services, your service areas, and your goals. No sales pressure — if it's not a fit, we'll tell you.",
  },
  {
    icon: FileText,
    title: "Kickoff & Content",
    time: "Days 2–4",
    description:
      "We send you a simple content questionnaire. You share your services, photos, and any existing brand materials. We handle the rest.",
  },
  {
    icon: Zap,
    title: "Build",
    time: "Days 5–10",
    description:
      "Your site gets built using our AI-powered workflow, fully integrated with the Core30 process. You'll see a preview by Day 10.",
  },
  {
    icon: Rocket,
    title: "Launch",
    time: "Days 11–14",
    description:
      "One round of revisions, then we go live. Your domain points to your new site. Lead notifications start flowing to your inbox.",
  },
];

function HowItWorksSection() {
  return (
    <section className="section-warm-wash py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
          className="text-center mb-12"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Process
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            From discovery call to live website{" "}
            <span className="text-[#38b6ff]">in 14 days.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: DURATION.slow,
                  delay: i * DURATION.stagger,
                  ease: EASE.reveal,
                }}
                className="dash-card p-5 md:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#38b6ff]/10 text-[#0A8FD4]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                    {step.time}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-[#0f172a]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] text-[#334155] leading-[1.6]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: FAQ ───────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
          className="text-center mb-10"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            FAQ
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            Questions vendors are asking.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {VENDOR_FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: EASE.out }}
                className="dash-card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-[14px] font-semibold text-[#0f172a]">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-[#64748b] transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE.out }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[13.5px] text-[#334155] leading-[1.7]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section 9: Final CTA ────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section className="section-dark relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: "url(/topo-bg.svg)", backgroundSize: "cover" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(56,182,255,0.06) 0%, rgba(15,23,42,0) 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DURATION.slow, ease: EASE.reveal }}
        >
          <h2
            className="font-bold tracking-tight text-[#f1f5f9]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            Marc made the introduction.{" "}
            <span className="text-[#38b6ff]">The next step is yours.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#94a3b8] max-w-xl mx-auto">
            Book a 20-minute discovery call. We&apos;ll walk through your business,
            answer your questions, and confirm which tier is right for you. If
            it&apos;s not a fit, we&apos;ll tell you — no hard sell.
          </p>
          <div className="mt-8 flex flex-col items-center gap-2">
            <BookingCTA />
            <span className="text-[12px] text-[#64748b]">
              {tier.ctaSubtext}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 10: Terms & Disclosures ──────────────────────────────────────────

function TermsSection() {
  return (
    <section className="section-off-white py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-[11px] text-[#94a3b8] leading-[1.6]">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#64748b]">
              Terms
            </span>
            <p className="mt-1">
              Vendor program pricing tiers: $495 build for vendors signing by
              11:59 PM CT on Sunday, June 1, 2026; $995 build for vendors
              signing between June 2 and June 8, 2026; $1,495 build for vendors
              signing between June 9 and June 15, 2026. Program closes June 15,
              2026, after which standard pricing of $2,500 applies. Build
              includes deliverables listed above; scope beyond listed items
              quoted separately. Required: monthly platform subscription with
              6-month minimum commitment at chosen tier ($199, $299, or
              $499/mo), then month-to-month with 30-day cancellation notice.
              Build payment due at signing; platform billing begins at site
              launch.
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#64748b]">
              Disclosure
            </span>
            <p className="mt-1">
              Core HOA receives discounted access to XeedlyAI&apos;s Propertyolio
              platform in connection with this vendor program.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function VendorLanding() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <HeroSection />
      <OfferSection />
      <TestimonialSection />
      <IncludedSection />
      <WhyThisPriceSection />
      <TimelineSection />
      <HowItWorksSection />
      <FAQSection />
      <FinalCTASection />
      <TermsSection />
    </>
  );
}

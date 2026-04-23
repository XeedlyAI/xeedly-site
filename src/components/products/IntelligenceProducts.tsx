"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CodeBlock,
  EASE,
  FeatureBlock,
  FeatureGrid,
  MiniBriefing,
  ProductHeader,
} from "./shared";

/* ------------------------------------------------------------------ */
/*  Visual primitives used inside the Sovvrn / Propertyolio blocks    */
/* ------------------------------------------------------------------ */

function ThreePanelMock() {
  const panels = [
    { label: "Active", count: "7", tint: "#38b6ff" },
    { label: "Flagged", count: "3", tint: "#f59e0b" },
    { label: "Resolved", count: "24", tint: "#14b8a6" },
  ];
  return (
    <div className="rounded-xl bg-white border border-[#e2e8f0] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="grid grid-cols-3 text-center">
        {panels.map((p) => (
          <div
            key={p.label}
            className="p-3 border-r border-[#e2e8f0] last:border-r-0"
          >
            <div
              className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{ color: p.tint }}
            >
              {p.label}
            </div>
            <div className="mt-1 font-mono text-[18px] font-bold text-[#0f172a] tabular-nums">
              {p.count}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 grid grid-cols-3 gap-3 bg-[#FAFAFA]">
        {panels.map((p) => (
          <div key={p.label} className="space-y-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-10 rounded-md bg-white border border-[#e2e8f0]"
                style={{ borderLeft: `3px solid ${p.tint}` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceTranscriptMock() {
  return (
    <div className="p-5 bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#14b8a6] animate-ping opacity-60" />
            <span className="relative rounded-full w-2 h-2 bg-[#14b8a6]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#14b8a6] font-semibold">
            Voice AI · Inbound Call
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#94a3b8]">02:14</span>
      </div>
      <div className="mt-4 space-y-2.5 text-[12px] leading-[1.55]">
        <div className="flex gap-2">
          <span className="font-mono text-[10px] text-[#64748b] shrink-0 w-10">
            00:04
          </span>
          <span className="text-[#334155]">
            &ldquo;Hi, just wanted to see if you had any availability tonight
            around 7?&rdquo;
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-mono text-[10px] text-[#64748b] shrink-0 w-10">
            00:09
          </span>
          <span className="text-[#334155]">
            Agent: &ldquo;Party of how many?&rdquo;
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-mono text-[10px] text-[#64748b] shrink-0 w-10">
            00:12
          </span>
          <span className="text-[#334155]">&ldquo;Four.&rdquo;</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-[#e2e8f0] grid grid-cols-3 gap-2">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#64748b]">
            Sentiment
          </div>
          <div className="mt-0.5 text-[11px] font-semibold text-[#14b8a6]">
            Positive
          </div>
        </div>
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#64748b]">
            Intent
          </div>
          <div className="mt-0.5 text-[11px] font-semibold text-[#0f172a]">
            Reservation
          </div>
        </div>
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#64748b]">
            Outcome
          </div>
          <div className="mt-0.5 text-[11px] font-semibold text-[#0A8FD4]">
            Booked
          </div>
        </div>
      </div>
    </div>
  );
}

function CorrelatedSignals() {
  const signals = [
    {
      border: "#f59e0b",
      source: "propertyjobz",
      title: "Vendor insurance expired",
      body: "GreenScape Landscaping · coverage lapsed 3 days ago",
    },
    {
      border: "#3b82f6",
      source: "propertydocz",
      title: "3 pending doc requests",
      body: "Maple Ridge HOA · all 3 require vendor attestation",
    },
  ];
  return (
    <div className="space-y-3 relative">
      {signals.map((s, i) => (
        <div
          key={i}
          className="dash-card p-4 bg-white"
          style={{ borderLeft: `3px solid ${s.border}` }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-semibold text-[#0f172a]">
              {s.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b]">
              {s.source}
            </span>
          </div>
          <p className="mt-1.5 text-[12px] text-[#334155]">{s.body}</p>
        </div>
      ))}
      <div className="flex items-center gap-2 justify-center pt-2">
        <span className="h-px flex-1 bg-[#8b5cf6]/30" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6]">
          ⇅ Correlated · severity: high
        </span>
        <span className="h-px flex-1 bg-[#8b5cf6]/30" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Sections                                                   */
/* ------------------------------------------------------------------ */

export function SovvrnSection() {
  return (
    <section
      id="sovvrn"
      className="section-white py-24 md:py-28 scroll-mt-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductHeader
          name="Sovvrn"
          vertical="Restaurant Intelligence"
          verticalAccent="#14b8a6"
          status="Live"
          statusAccent="#14b8a6"
          oneLiner="AI-native business intelligence for multi-unit restaurant operators. The morning briefing your operators never knew they needed."
          link={{
            href: "https://sovvrn.com",
            label: "Learn more at sovvrn.com →",
            external: true,
          }}
        />

        <div className="mt-14 space-y-16">
          <FeatureBlock
            feature="Morning Briefing"
            description="Every morning at 6 AM, Sovvrn delivers a categorized intelligence briefing to every operator in your organization. Revenue health, cost position, operations, voice intelligence, review & marketing, and today's priorities — all analyzed overnight, delivered before the first shift starts."
            visual={
              <MiniBriefing
                title="Morning Briefing — Tue, Apr 15"
                sections={[
                  {
                    icon: "💰",
                    title: "Revenue Health",
                    body:
                      "Locations 1–4 up 6% WoW. Location #5 flat, labor ratio inverted on Tue lunch.",
                  },
                  {
                    icon: "📞",
                    title: "Voice Intelligence",
                    body:
                      "42 inbound calls handled overnight. 4 missed at location #3 between 9–10 PM.",
                  },
                  {
                    icon: "⚡",
                    title: "Today's Priorities",
                    body:
                      "Follow up on 2 negative reviews. Reassign vendor invoice $2,140. Review overnight cash variance.",
                  },
                ]}
              />
            }
          />

          <FeatureBlock
            reverse
            feature="Command Center"
            description="Three-panel signal feed for operators who want to dig deeper. Active signals, flagged items, and dismissed/resolved history. Every signal links back to its source events for full traceability."
            visual={<ThreePanelMock />}
          />

          <FeatureBlock
            feature="Voice AI"
            description="Every phone call to your locations is transcribed, analyzed, and converted to intelligence. Missed call recovery. Sentiment detection. Staff coaching signals. The phone becomes a data source, not just a communication channel."
            visual={<VoiceTranscriptMock />}
          />
        </div>
      </div>
    </section>
  );
}

export function PropertyolioSection() {
  return (
    <section
      id="propertyolio"
      className="section-lavender-wash py-24 md:py-28 scroll-mt-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductHeader
          name="Propertyolio"
          vertical="Property Management Intelligence"
          verticalAccent="#8b5cf6"
          status="In Build"
          statusAccent="#f59e0b"
          oneLiner="The intelligence nerve center for property management. Every event from every tool, correlated into actionable signals."
        />

        <div className="mt-14 space-y-16">
          <FeatureBlock
            feature="Unified Event Bus"
            description="PropertyDocz and PropertyJobz fire webhooks at every action point — document requested, job completed, vendor insurance expired. Propertyolio ingests them all into a canonical event stream. One timeline. Every system."
            visual={
              <CodeBlock
                lines={[
                  "{",
                  '  source: "propertyjobz",',
                  '  event_type: "vendor.insurance.expired",',
                  '  entity_id: "vendor_1041",',
                  '  tenant_id: "corehoa",',
                  '  ts: "2026-04-15T09:22:14Z"',
                  "}",
                ]}
              />
            }
          />

          <FeatureBlock
            reverse
            feature="Cross-Product Signal Engine"
            description="This is where the magic happens. Configurable rules detect patterns across products — a vendor compliance gap in PropertyJobz coinciding with pending document requests in PropertyDocz triggers a high-severity signal. AI correlation runs daily to catch patterns humans wouldn't think to query."
            visual={<CorrelatedSignals />}
          />

          <FeatureBlock
            feature="AI Morning Briefing"
            description="Same three-tier intelligence delivery as Sovvrn, adapted for property management. Community health, vendor compliance, document operations, and today's priorities — briefed to every manager before the first email of the day."
            visual={
              <MiniBriefing
                title="Property Briefing — Tue, Apr 15"
                sections={[
                  {
                    icon: "🏘",
                    title: "Community Health",
                    body:
                      "3 communities flagged. Cedar Park annual meeting in 5 days; docs not yet ordered.",
                  },
                  {
                    icon: "🔧",
                    title: "Vendor & Compliance",
                    body:
                      "92% compliance. 2 vendors approaching insurance expiry.",
                  },
                  {
                    icon: "📄",
                    title: "Document Ops",
                    body:
                      "7 packages fulfilled. Avg 2.1hr turnaround. $847 revenue yesterday.",
                  },
                ]}
              />
            }
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-14 text-[13px] text-[#64748b] italic max-w-2xl"
        >
          Propertyolio is currently in active development. PropertyDocz and
          PropertyJobz are shipping independently while the intelligence layer
          is built.
        </motion.p>
      </div>
    </section>
  );
}

function SetupPriceBlock() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <div className="inline-flex items-baseline gap-2.5 flex-wrap">
        <span className="font-mono text-[15px] font-semibold text-[#94a3b8] line-through tabular-nums">
          $1,500
        </span>
        <span className="font-mono text-[24px] font-bold text-[#0f172a] tabular-nums leading-none">
          $500
        </span>
        <span className="text-[13px] text-[#64748b]">setup</span>
      </div>
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] px-2 py-1 rounded-full bg-[#f59e0b]/10 text-[#b45309]">
        Limited Time
      </span>
      <span className="text-[12px] text-[#64748b] italic">
        No monthly platform fees — revenue-share model
      </span>
    </div>
  );
}

function FullStoryLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="mt-5 inline-flex items-center text-[13px] font-semibold text-[#0A8FD4] hover:text-[#38b6ff] transition-colors"
    >
      See the full story →
    </Link>
  );
}

export function PropertyDoczSection() {
  return (
    <section
      id="propertydocz"
      className="section-white py-24 md:py-28 scroll-mt-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductHeader
          name="PropertyDocz"
          vertical="Document Operations"
          verticalAccent="#3b82f6"
          status="Shipping"
          statusAccent="#3b82f6"
          oneLiner="Bring document fulfillment in-house. Your pricing. Your revenue. AI-powered document generation for HOA management companies — resale certificates, refinance packages, status letters — all generated automatically."
          link={{
            href: "https://propertydocz.com",
            label: "propertydocz.com →",
            external: true,
          }}
        />
        <SetupPriceBlock />
        <FullStoryLink href="/products/propertydocz" />
        <div className="mt-12">
          <FeatureGrid
            accent="#3b82f6"
            items={[
              {
                title: "Your Pricing, Your Revenue",
                body:
                  "Set document prices that reflect your market. Revenue flows directly to your accounts — not to a middleman. Real-time, per-transaction. Stop splitting with third-party fulfillment companies.",
              },
              {
                title: "AI-Powered Pipeline",
                body:
                  "AI harvests, validates, and organizes community data. Three-tier confidence scoring so agents know exactly what to trust. Document packages generate automatically — no manual assembly.",
              },
              {
                title: "Your Brand, Your Subdomain",
                body:
                  "Agents and homeowners order at your own subdomain (e.g., corehoa.propertydocz.com). The experience is yours. The platform runs invisibly behind it. Multi-tenant, built to scale.",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export function PropertyJobzSection() {
  return (
    <section
      id="propertyjobz"
      className="section-warm-wash py-24 md:py-28 scroll-mt-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductHeader
          name="PropertyJobz"
          vertical="Vendor Management"
          verticalAccent="#3b82f6"
          status="Shipping"
          statusAccent="#3b82f6"
          oneLiner="Three systems on one platform — verification, preferred vendor program, and job management. A managed marketplace where vendors pay for verified access to your communities."
          link={{
            href: "https://propertyjobz.com",
            label: "propertyjobz.com →",
            external: true,
          }}
        />
        <SetupPriceBlock />
        <FullStoryLink href="/products/propertyjobz" />
        <div className="mt-12">
          <FeatureGrid
            accent="#3b82f6"
            items={[
              {
                title: "Vendor Verification",
                body:
                  "Every vendor verified for insurance, licensing, bonding, and certifications. Automated expiry tracking, renewal reminders, real-time compliance status visible to your team and your boards.",
              },
              {
                title: "Preferred Vendor Program",
                body:
                  "Verified vendors pay for access to your communities — because your communities represent guaranteed work. Homeowners and boards see only pre-approved vendors. You earn recurring revenue.",
              },
              {
                title: "RFP + Job Management",
                body:
                  "Create an RFP, match qualified vendors, manage bids, assign the job, and track completion. AI assistant on every dashboard. Structured, fair, transparent — and fully automated.",
              },
            ]}
          />
        </div>

        {/* Combined offer — sits at the bottom of the PropertyJobz section since PropertyDocz is directly above */}
        <div className="mt-16 mx-auto max-w-3xl">
          <div
            className="dash-card p-6 md:p-7 text-center"
            style={{ borderLeft: "3px solid #14b8a6" }}
          >
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0d9488]">
              Combined Offer
            </div>
            <p className="mt-3 text-[14px] text-[#334155] leading-[1.7]">
              Deploy both products together:{" "}
              <span className="line-through text-[#94a3b8] font-mono">
                $3,000
              </span>{" "}
              <span className="font-mono font-bold text-[#0f172a]">
                $1,000 combined setup
              </span>{" "}
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 ml-1 rounded-full bg-[#f59e0b]/10 text-[#b45309]">
                Limited Time
              </span>
              . Two revenue streams, one onboarding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

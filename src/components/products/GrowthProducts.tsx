"use client";

import { motion } from "framer-motion";
import { EASE, FeatureGrid, ProductHeader } from "./shared";

function IncludedIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mt-8 font-mono text-[11px] text-[#64748b]"
    >
      <span className="uppercase tracking-[0.14em] font-semibold text-[#0f172a]">
        Included in:
      </span>{" "}
      {children}
    </motion.div>
  );
}

export function AIAdEngine() {
  return (
    <section id="ai-ad-engine" className="section-white py-24 md:py-28 scroll-mt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductHeader
          name="AI Ad Engine"
          vertical="Paid Advertising"
          verticalAccent="#38b6ff"
          oneLiner="Automated ad creation, targeting, and optimization across Meta and Google. AI writes the copy, selects creative, adjusts bids — and never takes a day off."
        />
        <div className="mt-12">
          <FeatureGrid
            accent="#38b6ff"
            items={[
              {
                title: "Automated Campaign Management",
                body:
                  "AI creates and manages your ad campaigns across Facebook, Instagram, and Google. Targeting, bid optimization, and budget allocation happen automatically based on performance data.",
              },
              {
                title: "AI-Generated Creative",
                body:
                  "Ad copy, headlines, and creative variations generated and tested continuously. No more waiting on a designer or copywriter — the system produces, tests, and iterates.",
              },
              {
                title: "Performance Optimization",
                body:
                  "Real-time bid adjustments, audience refinement, and budget reallocation based on conversion data. The system gets smarter every day it runs.",
              },
            ]}
          />
        </div>
        <IncludedIn>
          Starter (<span className="font-semibold">$297/mo</span> — 1 platform),
          Growth (<span className="font-semibold">$597/mo</span> — Meta + Google),
          Scale (<span className="font-semibold">$997/mo</span> — Multi-location)
        </IncludedIn>
      </div>
    </section>
  );
}

export function SEOAutopilot() {
  return (
    <section
      id="seo-autopilot"
      className="section-warm-wash py-24 md:py-28 scroll-mt-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductHeader
          name="SEO Autopilot"
          vertical="Organic Search"
          verticalAccent="#14b8a6"
          oneLiner="Automated content generation, technical optimization, and rank tracking. The SEO agency you'd pay $2K/mo for — automated."
        />
        <div className="mt-12">
          <FeatureGrid
            accent="#14b8a6"
            items={[
              {
                title: "Content Generation",
                body:
                  "AI produces optimized blog posts, service pages, and location pages based on your keyword strategy. Published on schedule, internally linked, schema-marked.",
              },
              {
                title: "Technical Optimization",
                body:
                  "Automated site audits, meta tag optimization, structured data generation, and Core Web Vitals monitoring. The technical SEO checklist runs itself.",
              },
              {
                title: "Rank Tracking & Reporting",
                body:
                  "Keyword position tracking, competitor monitoring, and monthly performance reports. Know exactly where you stand without logging into another dashboard.",
              },
            ]}
          />
        </div>
        <IncludedIn>
          Growth (<span className="font-semibold">$597/mo</span>), Scale (
          <span className="font-semibold">$997/mo</span>)
        </IncludedIn>
      </div>
    </section>
  );
}

export function AICommunication() {
  return (
    <section
      id="ai-communication"
      className="section-white py-24 md:py-28 scroll-mt-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductHeader
          name="AI Communication"
          vertical="Voice & Chat"
          verticalAccent="#8b5cf6"
          oneLiner="AI voice agents and chat agents that handle inbound calls, answer questions, book appointments, and follow up — 24/7, under 60 seconds."
        />
        <div className="mt-12">
          <FeatureGrid
            accent="#8b5cf6"
            items={[
              {
                title: "AI Voice Agent",
                body:
                  "Every inbound call answered in under 3 rings. Natural conversation, appointment booking, FAQ handling, call routing. Missed calls become a thing of the past.",
              },
              {
                title: "AI Chat Agent",
                body:
                  "Website chat, SMS, and social media messaging handled by AI. Instant responses, lead qualification, and appointment scheduling — no human required for first contact.",
              },
              {
                title: "Follow-Up Automation",
                body:
                  "Automated nurture sequences via SMS and email. Leads that don't convert immediately get intelligent follow-up cadences that adapt based on engagement.",
              },
            ]}
          />
        </div>
        <IncludedIn>
          Starter (<span className="font-semibold">$297/mo</span> — chat only),
          Growth (<span className="font-semibold">$597/mo</span> — voice + chat),
          Scale (<span className="font-semibold">$997/mo</span> — custom AI voice persona)
        </IncludedIn>
      </div>
    </section>
  );
}

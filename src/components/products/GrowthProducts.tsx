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

export function SEOAutopilot() {
  return (
    <section
      id="seo-autopilot"
      className="section-warm-wash py-24 md:py-28 scroll-mt-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductHeader
          name="AI SEO"
          vertical="Organic Search"
          verticalAccent="#14b8a6"
          oneLiner="A Core 30 keyword strategy mapped to your buyer personas, plus AI-generated content that publishes on schedule. The SEO agency you'd pay $1,500–$3,000/mo for — automated and built into your monthly plan."
        />
        <div className="mt-12">
          <FeatureGrid
            accent="#14b8a6"
            items={[
              {
                title: "Core 30 Keyword Strategy",
                body:
                  "We map the 30 keywords that matter most to your business based on your buyer personas. Each keyword targets a specific stage of the customer journey — from discovery to ready-to-buy.",
              },
              {
                title: "AI-Generated Blog Content",
                body:
                  "Optimized blog posts, service pages, and location pages produced from your keyword strategy. Published on schedule, internally linked, schema-marked, and formatted for both search engines and humans.",
              },
              {
                title: "Local SEO + GBP",
                body:
                  "Google Business Profile optimization, 10+ local directory listings, citation cleanup, and review-driven authority signals. The local search foundation your business needs to be found.",
              },
            ]}
          />
        </div>
        <IncludedIn>
          Get Found (<span className="font-semibold">$299/mo</span> — 1 blog/mo),
          Get Chosen (<span className="font-semibold">$499/mo</span> — 3 blogs/mo)
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
          name="AI Voice + Chat"
          vertical="Communication"
          verticalAccent="#8b5cf6"
          oneLiner="AI agents that handle inbound calls, website chat, missed-call text-back, and follow-up sequences — 24/7. Every lead answered in under 3 rings, every message responded to in under 60 seconds."
        />
        <div className="mt-12">
          <FeatureGrid
            accent="#8b5cf6"
            items={[
              {
                title: "AI Chat Agent",
                body:
                  "Website chat handled by AI from first contact. Instant responses, lead qualification, FAQ handling, and appointment booking. Included in Get Found and Get Chosen.",
              },
              {
                title: "AI Voice Agent",
                body:
                  "Every inbound call answered in under 3 rings. Missed call text-back, 24/7 answering, natural appointment booking. Get Chosen tier — for businesses that can't afford to miss a call.",
              },
              {
                title: "Follow-Up Automation",
                body:
                  "SMS and email nurture sequences that adapt based on engagement. Leads that don't convert immediately get intelligent cadences. Built into every Growth Systems plan.",
              },
            ]}
          />
        </div>
        <IncludedIn>
          Get Found (<span className="font-semibold">$299/mo</span> — chat only),
          Get Chosen (<span className="font-semibold">$499/mo</span> — voice + chat + appointment booking)
        </IncludedIn>
      </div>
    </section>
  );
}

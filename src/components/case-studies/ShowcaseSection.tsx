"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { AutoScrollShowcase } from "./AutoScrollShowcase";
import { InteractionShowcase } from "./InteractionShowcase";
import { SHOWCASE_ASSETS, type CaseStudyShowcase } from "@/data/showcase-assets";

const EASE = [0.16, 1, 0.3, 1] as const;

type ShowcaseSectionProps = {
  slug: string;
};

export function ShowcaseSection({ slug }: ShowcaseSectionProps) {
  const showcase = SHOWCASE_ASSETS[slug];
  if (!showcase) return null;

  return (
    <section className="section-dark relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
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
            "radial-gradient(ellipse at 50% 30%, rgba(56,182,255,0.06) 0%, rgba(15,23,42,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="max-w-2xl mb-14">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
            Live Preview
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#f1f5f9]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)" }}
          >
            {showcase.headline}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-[#94a3b8] max-w-xl">
            {showcase.subheadline}
          </p>
        </SectionReveal>

        <ShowcaseGrid showcase={showcase} />
      </div>
    </section>
  );
}

function ShowcaseGrid({ showcase }: { showcase: CaseStudyShowcase }) {
  const { assets } = showcase;

  if (assets.length === 1) {
    return (
      <SectionReveal delay={0.15}>
        <div className="mx-auto max-w-5xl">
          <ShowcaseAssetRenderer asset={assets[0]} />
        </div>
      </SectionReveal>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {assets.map((asset) => (
        <motion.div
          key={asset.label}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE },
            },
          }}
        >
          <div className="mb-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
              {asset.label}
            </span>
          </div>
          <ShowcaseAssetRenderer asset={asset} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function ShowcaseAssetRenderer({
  asset,
}: {
  asset: CaseStudyShowcase["assets"][number];
}) {
  if (asset.type === "auto-scroll") {
    return (
      <AutoScrollShowcase
        src={asset.src}
        alt={asset.alt}
        url={asset.url}
        width={asset.width}
        height={asset.height}
      />
    );
  }

  return (
    <InteractionShowcase
      src={asset.src}
      url={asset.url}
      caption={asset.caption}
    />
  );
}

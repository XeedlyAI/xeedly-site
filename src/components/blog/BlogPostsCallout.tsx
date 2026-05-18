"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/types/blog";
import { SILOS, type SiloId } from "@/types/blog";
import { BlogCard } from "./BlogCard";

const EASE = [0.16, 1, 0.3, 1] as const;

type Theme = "light" | "wash" | "dark";

const THEME_STYLES: Record<
  Theme,
  {
    section: string;
    eyebrow: string;
    heading: string;
    body: string;
    link: string;
  }
> = {
  light: {
    section: "section-white",
    eyebrow: "text-[#64748b]",
    heading: "text-[#0f172a]",
    body: "text-[#334155]",
    link: "text-[#38b6ff] hover:text-[#0A8FD4]",
  },
  wash: {
    section: "section-blue-wash",
    eyebrow: "text-[#64748b]",
    heading: "text-[#0f172a]",
    body: "text-[#334155]",
    link: "text-[#0A8FD4] hover:text-[#38b6ff]",
  },
  dark: {
    section: "section-dark",
    eyebrow: "text-[#38b6ff]",
    heading: "text-white",
    body: "text-[#94a3b8]",
    link: "text-[#38b6ff] hover:text-white",
  },
};

interface BlogPostsCalloutProps {
  /** Filter to articles in this silo. */
  silo?: SiloId;
  /** Optional manual list of slugs to feature (overrides silo filter). */
  slugs?: string[];
  /** All articles to filter from (passed by server component). */
  articles: Article[];
  /** How many to show. Default 3. */
  limit?: number;
  /** Eyebrow label. */
  eyebrow: string;
  /** H2 heading. */
  heading: string;
  /** Subheading body. */
  body?: string;
  /** Theme. */
  theme?: Theme;
  /** "See all" link label + href. */
  seeAllLabel?: string;
  /** Override the "see all" href (default uses silo or /blog). */
  seeAllHref?: string;
}

export function BlogPostsCallout({
  silo,
  slugs,
  articles,
  limit = 3,
  eyebrow,
  heading,
  body,
  theme = "light",
  seeAllLabel,
  seeAllHref,
}: BlogPostsCalloutProps) {
  // Resolve which articles to show
  let pool: Article[];
  if (slugs && slugs.length > 0) {
    const bySlug: Record<string, Article> = {};
    for (const a of articles) bySlug[a.slug] = a;
    pool = slugs
      .map((s) => bySlug[s])
      .filter((a): a is Article => Boolean(a));
  } else if (silo) {
    pool = articles
      .filter((a) => a.silo === silo)
      .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  } else {
    pool = [...articles].sort((a, b) =>
      b.publishDate.localeCompare(a.publishDate),
    );
  }

  const featured = pool.slice(0, limit);
  if (featured.length === 0) return null;

  const styles = THEME_STYLES[theme];
  const allLabel = seeAllLabel ?? "See all briefings";
  const allHref = seeAllHref ?? (silo ? `/blog/${silo}` : "/blog");
  const siloLabel = silo ? SILOS[silo].name : undefined;

  return (
    <section className={`${styles.section} py-20 md:py-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div
            className={`text-[10px] font-mono font-semibold uppercase tracking-[0.15em] ${styles.eyebrow}`}
          >
            {eyebrow}
            {siloLabel && (
              <>
                {" · "}
                <span className="text-[#94a3b8]">{siloLabel}</span>
              </>
            )}
          </div>
          <h2
            className={`mt-3 font-bold tracking-tight ${styles.heading}`}
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.85rem)" }}
          >
            {heading}
          </h2>
          {body && (
            <p
              className={`mt-3 text-[14px] leading-[1.6] max-w-xl mx-auto ${styles.body}`}
            >
              {body}
            </p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className={`grid grid-cols-1 ${featured.length >= 3 ? "md:grid-cols-3" : featured.length === 2 ? "md:grid-cols-2" : ""} gap-6`}
        >
          {featured.map((a) => (
            <BlogCard key={a.slug} article={a} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mt-10 text-center"
        >
          <Link
            href={allHref}
            className={`inline-flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${styles.link}`}
          >
            {allLabel} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

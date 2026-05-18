"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Article } from "@/types/blog";
import { SILOS } from "@/types/blog";

const EASE = [0.16, 1, 0.3, 1] as const;

type Variant = "default" | "compact";

export function BlogCard({
  article,
  variant = "default",
}: {
  article: Article;
  variant?: Variant;
}) {
  const silo = SILOS[article.silo];
  const href = `/blog/${article.silo}/${article.slug}`;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
      className="group dash-card status-info overflow-hidden flex flex-col"
    >
      <Link href={href} className="block">
        <div className="relative w-full aspect-[16/9] bg-[#f1f5f9] overflow-hidden">
          <Image
            src={article.thumbnailImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#38b6ff]">
          {silo.name}
        </div>

        <Link href={href} className="mt-2 block">
          <h3
            className={
              variant === "compact"
                ? "text-[15px] font-bold leading-[1.3] text-[#0f172a] group-hover:text-[#0A8FD4] transition-colors"
                : "text-[17px] md:text-[18px] font-bold leading-[1.3] text-[#0f172a] group-hover:text-[#0A8FD4] transition-colors"
            }
          >
            {article.title}
          </h3>
        </Link>

        <p className="mt-2.5 text-[13px] leading-[1.55] text-[#475569] line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[#64748b]">
          <span>{article.readingTimeMinutes} min read</span>
          <span>{formatDate(article.publishDate)}</span>
        </div>
      </div>
    </motion.article>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

"use client";

import { motion } from "framer-motion";
import type { Article } from "@/types/blog";
import { BlogCard } from "./BlogCard";

export function BlogGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="mt-12 max-w-2xl mx-auto text-center">
        <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
            No briefings yet
          </div>
          <p className="mt-4 text-[14px] text-[#475569] leading-[1.7]">
            New briefings are published weekly. Check back soon — or follow
            along by reading the founder&apos;s manifesto below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {articles.map((a) => (
        <BlogCard key={a.slug} article={a} />
      ))}
    </motion.div>
  );
}

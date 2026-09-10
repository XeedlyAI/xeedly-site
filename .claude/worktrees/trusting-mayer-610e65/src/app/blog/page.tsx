import type { Metadata } from "next";
import { BlogIndexHero } from "@/components/blog/BlogIndexHero";
import { SiloFilter } from "@/components/blog/SiloFilter";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogConsole } from "@/components/blog/BlogConsole";
import { ARTICLES } from "@/data/blog";

export const metadata: Metadata = {
  title: "Briefings — XeedlyAI",
  description:
    "Intelligence for leaders who refuse to be built by what they built. Briefings on operational intelligence, multi-unit operations, and building businesses that run without you.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const sorted = [...ARTICLES].sort((a, b) =>
    b.publishDate.localeCompare(a.publishDate),
  );

  return (
    <>
      <BlogIndexHero />
      <section className="section-blue-wash pt-14 md:pt-16 pb-14 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogConsole />
        </div>
      </section>
      <section className="section-white pt-16 md:pt-20 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SiloFilter active="all" />
          <BlogGrid articles={sorted} />
        </div>
      </section>
    </>
  );
}

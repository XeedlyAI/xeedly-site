import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexHero } from "@/components/blog/BlogIndexHero";
import { SiloFilter } from "@/components/blog/SiloFilter";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { getArticlesBySilo } from "@/data/blog";
import { SILOS, SILO_ORDER, type SiloId } from "@/types/blog";

type Params = { silo: string };

export async function generateStaticParams(): Promise<Params[]> {
  return SILO_ORDER.map((silo) => ({ silo }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { silo: siloId } = await params;
  if (!isSiloId(siloId)) return {};
  const silo = SILOS[siloId];
  return {
    title: `${silo.name} — Xeedly Briefings`,
    description: silo.oneLiner,
    alternates: { canonical: `/blog/${siloId}` },
  };
}

export default async function SiloIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { silo: siloParam } = await params;
  if (!isSiloId(siloParam)) notFound();

  const articles = getArticlesBySilo(siloParam);

  return (
    <>
      <BlogIndexHero />
      <section className="section-white pt-16 md:pt-20 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SiloFilter active={siloParam} />
          <BlogGrid articles={articles} />
        </div>
      </section>
    </>
  );
}

function isSiloId(s: string): s is SiloId {
  return (SILO_ORDER as string[]).includes(s);
}

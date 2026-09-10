"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type {
  ArticleBlock,
  ArticleSection,
  CalloutSeverity,
} from "@/types/blog";

const SEVERITY_STYLES: Record<
  CalloutSeverity,
  { accent: string; bg: string; iconColor: string; label: string }
> = {
  info: {
    accent: "border-l-[#38b6ff]",
    bg: "bg-[#38b6ff]/[0.06]",
    iconColor: "#38b6ff",
    label: "INFO",
  },
  good: {
    accent: "border-l-[#10b981]",
    bg: "bg-[#10b981]/[0.06]",
    iconColor: "#10b981",
    label: "INSIGHT",
  },
  warn: {
    accent: "border-l-[#f59e0b]",
    bg: "bg-[#f59e0b]/[0.06]",
    iconColor: "#f59e0b",
    label: "WATCH",
  },
  crit: {
    accent: "border-l-[#ef4444]",
    bg: "bg-[#ef4444]/[0.06]",
    iconColor: "#ef4444",
    label: "CRITICAL",
  },
};

function renderInline(text: string) {
  // Minimal **bold** rendering for emphasis in copy
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[#0f172a]">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[16px] md:text-[17px] leading-[1.75] text-[#334155] mb-5">
          {renderInline(block.text)}
        </p>
      );

    case "heading3":
      return (
        <h3 className="text-[18px] md:text-[20px] font-bold text-[#0f172a] mt-8 mb-3 tracking-tight">
          {block.text}
        </h3>
      );

    case "list":
      return block.ordered ? (
        <ol className="list-decimal pl-6 mb-5 space-y-2 text-[15px] md:text-[16px] leading-[1.7] text-[#334155]">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc pl-6 mb-5 space-y-2 text-[15px] md:text-[16px] leading-[1.7] text-[#334155]">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );

    case "callout": {
      const s = SEVERITY_STYLES[block.severity];
      return (
        <div
          className={cn(
            "my-7 rounded-r-lg border-l-4 p-5 md:p-6",
            s.accent,
            s.bg,
          )}
        >
          <div
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] mb-2"
            style={{ color: s.iconColor }}
          >
            {s.label} · {block.title}
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#1e293b] m-0">
            {renderInline(block.body)}
          </p>
        </div>
      );
    }

    case "quote":
      return (
        <blockquote className="my-7 border-l-4 border-l-[#0f172a] pl-5 italic text-[17px] md:text-[18px] leading-[1.65] text-[#0f172a]">
          &ldquo;{block.text}&rdquo;
          {block.cite && (
            <footer className="mt-3 not-italic font-mono text-[11px] uppercase tracking-[0.1em] text-[#64748b]">
              — {block.cite}
            </footer>
          )}
        </blockquote>
      );

    case "image": {
      const aspect =
        block.aspect === "1:1"
          ? "aspect-square"
          : block.aspect === "4:3"
            ? "aspect-[4/3]"
            : "aspect-[16/9]";
      return (
        <figure className="my-7">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-lg bg-[#0f172a]",
              aspect,
            )}
          >
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#64748b] text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "table":
      return (
        <div className="my-7 overflow-x-auto rounded-lg border border-[#e2e8f0]">
          <table className="w-full text-[14px] md:text-[15px] text-left">
            <thead className="bg-[#f8fafc]">
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0f172a] border-b border-[#e2e8f0]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-t border-[#e2e8f0] hover:bg-[#f8fafc]/60 transition-colors"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 align-top text-[#334155] leading-[1.6]"
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "divider":
      return <hr className="my-10 border-t border-[#e2e8f0]" />;

    default:
      return null;
  }
}

export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div>
      {sections.map((section, i) => (
        <section key={i} className="mb-10">
          <h2
            className="text-[24px] md:text-[28px] font-bold text-[#0f172a] tracking-tight leading-[1.2] mb-5"
            id={slugify(section.heading)}
          >
            {section.heading}
          </h2>
          {section.blocks.map((b, j) => (
            <Block key={j} block={b} />
          ))}
        </section>
      ))}
    </div>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

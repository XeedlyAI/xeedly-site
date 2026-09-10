import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative section-dark overflow-hidden min-h-[70vh] flex items-center">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ backgroundImage: "url(/topo-bg.svg)", backgroundSize: "cover" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(56,182,255,0.08) 0%, rgba(15,23,42,0) 55%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#38b6ff]">
          signal :: not_found
        </div>
        <h1
          className="mt-5 font-bold text-white leading-[1.1] tracking-[-0.01em]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          404
        </h1>
        <p className="mt-4 text-[16px] text-[#94a3b8] max-w-md mx-auto leading-[1.7]">
          The signal you&apos;re looking for didn&apos;t reach the event bus.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-7 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[14px] transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/platform"
            className="text-[13px] text-[#94a3b8] hover:text-[#f1f5f9] transition-colors"
          >
            Or explore the platform →
          </Link>
        </div>
        <div className="mt-10 font-mono text-[10px] text-[#64748b]">
          status: 404 · retry via navigation
        </div>
      </div>
    </section>
  );
}

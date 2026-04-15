export function ComingSoon({ title }: { title: string }) {
  return (
    <section className="section-white py-32 md:py-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#38b6ff]">
          XeedlyAI
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-[#0f172a]">
          {title}
        </h1>
        <p className="mt-6 text-[#64748b] font-mono text-sm">
          — Coming Soon —
        </p>
      </div>
    </section>
  );
}

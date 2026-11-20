import { DESK_CATALOG } from "@/data/desks";

export function DeskCatalog() {
  return (
    <section id="catalog" className="bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The catalog
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}
          >
            Seven desks we know how to build.{" "}
            <span className="text-[#38b6ff]">Pick the role whose week hurts the most.</span>
          </h2>
          <p className="mt-4 text-[15px] text-[#334155] leading-[1.7]">
            Each one lists what the person sees first, what data it needs on day
            one, the actions that are theirs, and the report it produces. Sell
            yourself on one. The second desk is where two roles start sharing
            one brain.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-xl border border-[#e2e8f0]">
          <table className="w-full min-w-[880px] text-left text-[13px]">
            <thead>
              <tr className="bg-[#FAFAFA]">
                {["Desk", "For", "First screen", "Day-one data", "Actions", "Report"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b] border-b border-[#e2e8f0]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DESK_CATALOG.map((r) => (
                <tr key={r.desk} className="border-b border-[#f1f5f9] last:border-b-0 align-top">
                  <td className="px-4 py-4 font-bold text-[#0f172a] whitespace-nowrap">{r.desk}</td>
                  <td className="px-4 py-4 text-[#334155]">{r.forWhom}</td>
                  <td className="px-4 py-4 text-[#334155]">{r.firstScreen}</td>
                  <td className="px-4 py-4 text-[#334155]">{r.dayOneData}</td>
                  <td className="px-4 py-4 text-[#334155]">{r.actions}</td>
                  <td className="px-4 py-4 text-[#334155]">{r.report}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

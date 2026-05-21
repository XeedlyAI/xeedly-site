"use client";

import {
  KpiRow,
  TimeSeriesChart,
  DataTable,
  StatusBar,
  renderTrend,
  renderSparkline,
  renderMoney,
  type KpiCardData,
  type DataPoint,
  type ColumnDef,
} from "@/components/data-overlay";

// ── Sample KPI data ────────────────────────────────────────────────
const KPIS: KpiCardData[] = [
  {
    label: "Spend",
    value: "$870.66",
    trend: { value: 1269.8, suffix: "%" },
    sparkline: [8, 12, 25, 30, 38, 42, 35, 28, 32, 36, 34, 30, 33, 29, 27],
    status: "warning",
    subtitle: "30d",
  },
  {
    label: "Conv",
    value: "0",
    status: "neutral",
  },
  {
    label: "ROAS",
    value: "0.0x",
    status: "neutral",
  },
  {
    label: "CTR",
    value: "7.2%",
    trend: { value: 113.7, suffix: "%" },
    sparkline: [3.2, 4.1, 5.8, 6.2, 7.0, 6.5, 7.2, 7.8, 7.1, 6.9, 7.4, 7.2],
    status: "positive",
  },
  {
    label: "CPM",
    value: "$13.37",
    trend: { value: -28.5, suffix: "%" },
    sparkline: [18, 17, 15, 14, 13, 14, 12, 13, 14, 13, 13, 13],
    status: "positive",
  },
  {
    label: "Clicks",
    value: "4,709",
    trend: { value: 3994.8, suffix: "%" },
    sparkline: [10, 45, 120, 200, 310, 280, 350, 400, 420, 460, 480, 470],
    status: "positive",
  },
  {
    label: "Impressions",
    value: "65,115",
    trend: { value: 1815.7, suffix: "%" },
    sparkline: [200, 800, 2400, 3600, 4800, 5200, 5600, 5400, 5800, 5600, 5900, 6000],
    status: "positive",
  },
  {
    label: "Reach",
    value: "55,444",
    trend: { value: 1752.5, suffix: "%" },
    sparkline: [180, 700, 2100, 3200, 4200, 4600, 4800, 4600, 5000, 5200, 5400, 5500],
    status: "positive",
  },
];

// ── Time series data ───────────────────────────────────────────────
const DAILY_SPEND: DataPoint[] = [
  { label: "Apr 22", value: 24.5 },
  { label: "Apr 23", value: 26.1 },
  { label: "Apr 24", value: 32.8 },
  { label: "Apr 25", value: 28.4 },
  { label: "Apr 26", value: 38.2 },
  { label: "Apr 27", value: 42.1 },
  { label: "Apr 28", value: 46.55 },
  { label: "Apr 29", value: 36.9 },
  { label: "Apr 30", value: 28.7 },
  { label: "May 1", value: 25.3 },
  { label: "May 2", value: 26.8 },
  { label: "May 3", value: 30.1 },
  { label: "May 4", value: 33.6 },
  { label: "May 5", value: 35.2 },
  { label: "May 6", value: 31.4 },
  { label: "May 7", value: 28.9 },
  { label: "May 8", value: 26.5 },
  { label: "May 9", value: 29.3 },
  { label: "May 10", value: 32.7 },
  { label: "May 11", value: 34.1 },
  { label: "May 12", value: 30.8 },
  { label: "May 13", value: 33.2 },
  { label: "May 14", value: 31.6 },
  { label: "May 15", value: 29.4 },
  { label: "May 16", value: 28.1 },
  { label: "May 17", value: 30.5 },
  { label: "May 18", value: 32.9 },
  { label: "May 19", value: 29.7 },
  { label: "May 20", value: 27.0 },
];

// ── Campaign table data ────────────────────────────────────────────
type CampaignRow = {
  name: string;
  spend: number;
  delta: number;
  conv: number;
  roas: number;
  ctr: number;
  cpm: number;
  clicks: number;
  sparkline: number[];
};

const CAMPAIGNS: CampaignRow[] = [
  {
    name: "Concrete Services — Broad",
    spend: 412.33,
    delta: 1450.2,
    conv: 0,
    roas: 0,
    ctr: 8.1,
    cpm: 12.45,
    clicks: 2310,
    sparkline: [5, 12, 18, 22, 20, 24, 21, 19, 23, 25, 22, 20],
  },
  {
    name: "Foundation Repair — Local",
    spend: 258.14,
    delta: 980.5,
    conv: 0,
    roas: 0,
    ctr: 6.8,
    cpm: 14.2,
    clicks: 1420,
    sparkline: [3, 8, 14, 16, 15, 18, 16, 14, 17, 19, 16, 15],
  },
  {
    name: "Driveway Resurfacing — Retarget",
    spend: 124.88,
    delta: 2100.3,
    conv: 0,
    roas: 0,
    ctr: 5.9,
    cpm: 15.8,
    clicks: 620,
    sparkline: [2, 4, 6, 8, 7, 9, 8, 7, 8, 10, 9, 8],
  },
  {
    name: "Stamped Concrete — Lookalike",
    spend: 75.31,
    delta: 890.1,
    conv: 0,
    roas: 0,
    ctr: 6.2,
    cpm: 11.9,
    clicks: 359,
    sparkline: [1, 3, 5, 6, 5, 7, 6, 5, 7, 8, 7, 6],
  },
];

const COLUMNS: ColumnDef<CampaignRow>[] = [
  {
    key: "name",
    label: "Campaign",
    render: (row) => (
      <span className="text-slate-200 font-medium text-xs">{row.name}</span>
    ),
  },
  {
    key: "spend",
    label: "Spend",
    align: "right",
    sortable: true,
    sortValue: (row) => row.spend,
    render: (row) => renderMoney(row.spend),
  },
  {
    key: "delta",
    label: "Δ",
    align: "right",
    sortable: true,
    sortValue: (row) => row.delta,
    render: (row) => renderTrend(row.delta),
  },
  {
    key: "conv",
    label: "Conv",
    align: "right",
    sortable: true,
    render: (row) => (
      <span className="text-slate-500">{row.conv || "—"}</span>
    ),
  },
  {
    key: "roas",
    label: "ROAS",
    align: "right",
    sortable: true,
    render: (row) => (
      <span className="text-slate-500">
        {row.roas ? `${row.roas}x` : "—"}
      </span>
    ),
  },
  {
    key: "ctr",
    label: "CTR",
    align: "right",
    sortable: true,
    sortValue: (row) => row.ctr,
    render: (row) => (
      <span className="font-mono text-slate-300">{row.ctr}%</span>
    ),
  },
  {
    key: "cpm",
    label: "CPM",
    align: "right",
    sortable: true,
    sortValue: (row) => row.cpm,
    render: (row) => renderMoney(row.cpm),
  },
  {
    key: "clicks",
    label: "Clicks",
    align: "right",
    sortable: true,
    sortValue: (row) => row.clicks,
    render: (row) => (
      <span className="font-mono text-slate-300">
        {row.clicks.toLocaleString()}
      </span>
    ),
  },
  {
    key: "sparkline",
    label: "Trend",
    align: "center",
    render: (row) => renderSparkline(row.sparkline, "#f59e0b"),
  },
];

// ── Operational KPIs (light variant demo) ──────────────────────────
const OPS_KPIS: KpiCardData[] = [
  {
    label: "Reviews Captured",
    value: "247",
    trend: { value: 32.4 },
    sparkline: [12, 18, 22, 28, 34, 30, 36, 42, 38, 40, 44, 48],
    status: "positive",
    subtitle: "this month",
  },
  {
    label: "Avg Rating",
    value: "4.8",
    trend: { value: 0.3, suffix: " pts" },
    sparkline: [4.5, 4.6, 4.5, 4.7, 4.6, 4.8, 4.7, 4.8, 4.9, 4.8, 4.8, 4.8],
    status: "positive",
    subtitle: "Google Business",
  },
  {
    label: "Response Time",
    value: "< 4min",
    trend: { value: -45.2 },
    status: "positive",
    subtitle: "signal to action",
  },
  {
    label: "Pipeline Value",
    value: "$142K",
    trend: { value: 89.3 },
    sparkline: [45, 52, 68, 74, 82, 88, 95, 102, 118, 125, 134, 142],
    status: "positive",
    subtitle: "active opportunities",
  },
];

// ── Component ──────────────────────────────────────────────────────
export function DataOverlayDemo() {
  return (
    <div className="min-h-screen bg-[#080e1a]">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0f172a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-semibold text-slate-100">
              Data Overlay Components
            </h1>
            <span className="text-xs font-mono text-slate-600">
              v1.0 — component reference
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Premium data visualization components inspired by Meta Ads OS / Upward Engine.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ── Section: Dark KPI Row (8 metrics) ── */}
        <section>
          <SectionLabel>KPI Row — Dark (8 metrics)</SectionLabel>
          <KpiRow kpis={KPIS} variant="dark" />
        </section>

        {/* ── Section: Time Series Chart ── */}
        <section>
          <SectionLabel>Time Series Chart</SectionLabel>
          <TimeSeriesChart
            title="Daily Spend"
            total="$870.66"
            peak="$46.55"
            latest="$27.00"
            period="Apr 22 → May 20"
            data={DAILY_SPEND}
            color="#f59e0b"
            variant="dark"
          />
        </section>

        {/* ── Section: Data Table ── */}
        <section>
          <SectionLabel>Campaign Table — Sortable</SectionLabel>
          <DataTable
            columns={COLUMNS}
            rows={CAMPAIGNS}
            variant="dark"
          />
        </section>

        {/* ── Section: Status Bars ── */}
        <section>
          <SectionLabel>Status Bars</SectionLabel>
          <div className="rounded-lg border border-white/[0.06] bg-[#0f172a] p-5 space-y-4">
            <StatusRow label="Budget Utilization" value={72} color="amber" />
            <StatusRow label="CTR Performance" value={92} color="green" />
            <StatusRow label="Conversion Rate" value={0} color="red" />
            <StatusRow label="Quality Score" value={85} color="blue" />
          </div>
        </section>

        {/* ── Section: Light Variant ── */}
        <section>
          <SectionLabel>Light Variant — Operational KPIs</SectionLabel>
          <div className="rounded-xl bg-white p-1">
            <KpiRow kpis={OPS_KPIS} variant="light" />
          </div>
        </section>

        {/* ── Section: Compact KPI Row (3 metrics) ── */}
        <section>
          <SectionLabel>Compact KPI Row (3 metrics)</SectionLabel>
          <KpiRow
            kpis={[
              {
                label: "Signals / Day",
                value: "473",
                trend: { value: 22.1 },
                sparkline: [280, 310, 340, 380, 420, 410, 450, 460, 470, 480, 475, 473],
                status: "positive",
              },
              {
                label: "Avg Latency",
                value: "1.2s",
                trend: { value: -18.4 },
                sparkline: [2.1, 1.9, 1.8, 1.6, 1.5, 1.4, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2],
                status: "positive",
              },
              {
                label: "Error Rate",
                value: "0.02%",
                trend: { value: -82.0 },
                sparkline: [0.12, 0.1, 0.08, 0.06, 0.05, 0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02],
                status: "positive",
              },
            ]}
            variant="dark"
          />
        </section>
      </div>
    </div>
  );
}

// ── Small helpers ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="h-px flex-1 bg-white/[0.04]" />
      <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-600">
        {children}
      </span>
      <div className="h-px flex-1 bg-white/[0.04]" />
    </div>
  );
}

function StatusRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "red" | "amber" | "blue";
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-40 text-xs text-slate-500 shrink-0">{label}</span>
      <StatusBar value={value} color={color} className="flex-1" />
      <span className="w-10 text-right text-xs font-mono text-slate-400">
        {value}%
      </span>
    </div>
  );
}

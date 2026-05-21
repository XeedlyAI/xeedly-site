"use client";

import { useState } from "react";
import {
  AppShell,
  TabBar,
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
  type SidebarItem,
  type Tab,
} from "@/components/data-overlay";

// ═══════════════════════════════════════════════════════════════════
// SIDEBAR CONFIG
// ═══════════════════════════════════════════════════════════════════
const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "decisions", label: "Decisions", badge: 12, section: "Workspace" },
  { id: "trust", label: "Trust" },
  { id: "controls", label: "Controls" },
  { id: "revitalize", label: "(NEW) Revitalize Concrete", section: "Clients" },
  { id: "new-client", label: "New client" },
  { id: "activity", label: "Activity", section: "System" },
  { id: "api-health", label: "API Health" },
  { id: "settings", label: "Settings" },
];

// ═══════════════════════════════════════════════════════════════════
// TAB DEFINITIONS — 14 tabs like Meta Ads OS
// ═══════════════════════════════════════════════════════════════════
const TABS: Tab[] = [
  { id: "overview", label: "Overview", badge: 3, badgeVariant: "warn" },
  { id: "performance", label: "Performance" },
  { id: "campaigns", label: "Campaigns" },
  { id: "ad-sets", label: "Ad Sets" },
  { id: "ads", label: "Ads" },
  { id: "creatives", label: "Creatives" },
  { id: "leads", label: "Leads" },
  { id: "audit", label: "Audit", badge: 1, badgeVariant: "error" },
  { id: "competitors", label: "Competitors" },
  { id: "products", label: "Products" },
  { id: "catalogs", label: "Catalogs" },
  { id: "brand", label: "Brand" },
  { id: "workflows", label: "Workflows" },
  { id: "settings", label: "Settings" },
];

// ═══════════════════════════════════════════════════════════════════
// PERFORMANCE TAB DATA
// ═══════════════════════════════════════════════════════════════════
const PERF_KPIS: KpiCardData[] = [
  {
    label: "Spend",
    value: "$870.66",
    trend: { value: 1269.8, suffix: "%" },
    sparkline: [8, 12, 25, 30, 38, 42, 35, 28, 32, 36, 34, 30, 33, 29, 27],
    status: "warning",
    subtitle: "30d",
  },
  { label: "Conv", value: "0", status: "neutral" },
  { label: "ROAS", value: "0.0x", status: "neutral" },
  { label: "CPA", value: "—", status: "neutral" },
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
];

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
    name: "120246496262770140",
    spend: 870.66,
    delta: 1269.8,
    conv: 0,
    roas: 0,
    ctr: 7.2,
    cpm: 13.37,
    clicks: 4709,
    sparkline: [8, 12, 25, 30, 38, 42, 35, 28, 32, 36, 34, 30],
  },
];

const CAMPAIGN_COLS: ColumnDef<CampaignRow>[] = [
  {
    key: "name",
    label: "Campaign",
    render: (row) => (
      <div className="flex flex-col">
        <span className="text-slate-200 font-medium text-xs">{row.name} ›</span>
        <span className="text-[10px] text-slate-600 font-mono">{row.name}</span>
      </div>
    ),
  },
  {
    key: "spend",
    label: "↓ Spend",
    align: "right",
    sortable: true,
    sortValue: (row) => row.spend,
    render: (row) => renderMoney(row.spend),
  },
  {
    key: "delta",
    label: "↕ Δ",
    align: "right",
    sortable: true,
    sortValue: (row) => row.delta,
    render: (row) => renderTrend(row.delta),
  },
  {
    key: "conv",
    label: "↕ Conv",
    align: "right",
    sortable: true,
    render: (row) => <span className="text-slate-500">{row.conv || "—"}</span>,
  },
  {
    key: "roas",
    label: "↕ ROAS",
    align: "right",
    sortable: true,
    render: (row) => (
      <span className="text-slate-500">{row.roas ? `${row.roas}x` : "—"}</span>
    ),
  },
  {
    key: "ctr",
    label: "↕ CTR",
    align: "right",
    sortable: true,
    sortValue: (row) => row.ctr,
    render: (row) => <span className="font-mono text-slate-300">{row.ctr}%</span>,
  },
  {
    key: "cpm",
    label: "↕ CPM",
    align: "right",
    sortable: true,
    sortValue: (row) => row.cpm,
    render: (row) => renderMoney(row.cpm),
  },
  {
    key: "clicks",
    label: "↕ Clicks",
    align: "right",
    sortable: true,
    sortValue: (row) => row.clicks,
    render: (row) => (
      <span className="font-mono text-slate-300">
        {row.clicks.toLocaleString()}
      </span>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════
// OVERVIEW TAB DATA
// ═══════════════════════════════════════════════════════════════════
const OVERVIEW_KPIS: KpiCardData[] = [
  {
    label: "Active Campaigns",
    value: "4",
    sparkline: [1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4],
    status: "positive",
  },
  {
    label: "Total Spend (MTD)",
    value: "$870.66",
    trend: { value: 1269.8, suffix: "%" },
    status: "warning",
  },
  {
    label: "Avg CTR",
    value: "7.2%",
    trend: { value: 113.7, suffix: "%" },
    sparkline: [3.2, 4.1, 5.8, 6.2, 7.0, 6.5, 7.2],
    status: "positive",
  },
];

// ═══════════════════════════════════════════════════════════════════
// LEADS TAB DATA
// ═══════════════════════════════════════════════════════════════════
type LeadRow = {
  name: string;
  source: string;
  status: string;
  value: number;
  date: string;
  score: number;
};

const LEADS: LeadRow[] = [
  { name: "John Martinez", source: "Facebook Lead Form", status: "New", value: 4200, date: "May 20", score: 85 },
  { name: "Sarah Chen", source: "Website — Contact", status: "Contacted", value: 8500, date: "May 19", score: 72 },
  { name: "Mike Thompson", source: "Google Ads", status: "Qualified", value: 12000, date: "May 18", score: 91 },
  { name: "Lisa Park", source: "Referral", status: "Proposal", value: 15000, date: "May 17", score: 95 },
  { name: "David Wilson", source: "Facebook Lead Form", status: "New", value: 3800, date: "May 17", score: 68 },
  { name: "Amy Rodriguez", source: "Website — Chat", status: "Contacted", value: 6200, date: "May 16", score: 77 },
];

const LEAD_COLS: ColumnDef<LeadRow>[] = [
  {
    key: "name",
    label: "Lead",
    render: (row) => <span className="text-slate-200 font-medium text-xs">{row.name}</span>,
  },
  {
    key: "source",
    label: "Source",
    render: (row) => <span className="text-slate-400 text-xs">{row.source}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (row) => {
      const colors: Record<string, string> = {
        New: "bg-sky-400/15 text-sky-400",
        Contacted: "bg-amber-400/15 text-amber-400",
        Qualified: "bg-emerald-400/15 text-emerald-400",
        Proposal: "bg-violet-400/15 text-violet-400",
      };
      return (
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors[row.status] ?? "bg-slate-500/15 text-slate-400"}`}>
          {row.status}
        </span>
      );
    },
  },
  {
    key: "value",
    label: "Value",
    align: "right",
    sortable: true,
    sortValue: (row) => row.value,
    render: (row) => renderMoney(row.value),
  },
  {
    key: "date",
    label: "Date",
    align: "right",
    render: (row) => <span className="text-slate-500 text-xs font-mono">{row.date}</span>,
  },
  {
    key: "score",
    label: "Score",
    align: "right",
    sortable: true,
    sortValue: (row) => row.score,
    render: (row) => (
      <div className="flex items-center gap-2 justify-end">
        <StatusBar value={row.score} color={row.score >= 80 ? "green" : row.score >= 60 ? "amber" : "red"} className="w-16" />
        <span className="text-xs font-mono text-slate-400 w-6 text-right">{row.score}</span>
      </div>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════
// AUDIT TAB DATA
// ═══════════════════════════════════════════════════════════════════
type AuditRow = {
  issue: string;
  severity: string;
  affected: string;
  impact: string;
  status: string;
};

const AUDIT_ITEMS: AuditRow[] = [
  { issue: "No conversion pixel detected", severity: "Critical", affected: "All campaigns", impact: "Cannot track ROAS", status: "Open" },
  { issue: "Ad frequency > 3x in 7d", severity: "Warning", affected: "Foundation Repair — Local", impact: "Ad fatigue risk", status: "Monitoring" },
  { issue: "Landing page load > 4s", severity: "Warning", affected: "Driveway Resurfacing", impact: "Higher bounce rate", status: "Open" },
  { issue: "Budget underspend > 40%", severity: "Info", affected: "Stamped Concrete", impact: "Missed impressions", status: "Acknowledged" },
];

const AUDIT_COLS: ColumnDef<AuditRow>[] = [
  {
    key: "issue",
    label: "Issue",
    render: (row) => <span className="text-slate-200 text-xs font-medium">{row.issue}</span>,
  },
  {
    key: "severity",
    label: "Severity",
    render: (row) => {
      const c: Record<string, string> = {
        Critical: "bg-red-400/15 text-red-400",
        Warning: "bg-amber-400/15 text-amber-400",
        Info: "bg-sky-400/15 text-sky-400",
      };
      return (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c[row.severity] ?? ""}`}>
          {row.severity}
        </span>
      );
    },
  },
  {
    key: "affected",
    label: "Affected",
    render: (row) => <span className="text-slate-400 text-xs">{row.affected}</span>,
  },
  {
    key: "impact",
    label: "Impact",
    render: (row) => <span className="text-slate-500 text-xs">{row.impact}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (row) => {
      const c: Record<string, string> = {
        Open: "text-red-400",
        Monitoring: "text-amber-400",
        Acknowledged: "text-slate-500",
      };
      return <span className={`text-xs font-medium ${c[row.status] ?? "text-slate-400"}`}>{row.status}</span>;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════
// CREATIVES TAB — grid of ad creative cards
// ═══════════════════════════════════════════════════════════════════
const CREATIVES = [
  { id: 1, name: "Foundation Repair — Before/After", format: "Image", ctr: 9.2, spend: 182.40, status: "Active" },
  { id: 2, name: "Driveway Resurfacing — Testimonial", format: "Video", ctr: 6.8, spend: 124.88, status: "Active" },
  { id: 3, name: "Concrete Services — Hero Banner", format: "Image", ctr: 7.5, spend: 218.50, status: "Active" },
  { id: 4, name: "Stamped Concrete — Gallery", format: "Carousel", ctr: 5.1, spend: 75.31, status: "Paused" },
  { id: 5, name: "Emergency Repair — Urgency", format: "Image", ctr: 11.3, spend: 156.20, status: "Active" },
  { id: 6, name: "Seasonal Promo — Spring 2026", format: "Video", ctr: 4.2, spend: 113.37, status: "Draft" },
];

// ═══════════════════════════════════════════════════════════════════
// TAB CONTENT COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function PerformanceTab() {
  return (
    <div className="space-y-0">
      {/* KPI row — flush edge to edge */}
      <KpiRow kpis={PERF_KPIS} variant="dark" className="rounded-none border-x-0 border-t-0" />

      {/* Chart */}
      <div className="px-5 pt-4">
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
      </div>

      {/* Campaign table */}
      <div className="px-5 py-4">
        <DataTable columns={CAMPAIGN_COLS} rows={CAMPAIGNS} variant="dark" />
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-0">
      <KpiRow kpis={OVERVIEW_KPIS} variant="dark" className="rounded-none border-x-0 border-t-0" />
      <div className="p-5 space-y-6">
        {/* Account health */}
        <div className="rounded-lg border border-white/[0.06] bg-[#0f172a] p-5">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Account Health</h3>
          <div className="space-y-4">
            <StatusRow label="Pixel Status" value={0} color="red" note="Not installed" />
            <StatusRow label="Budget Utilization" value={72} color="amber" />
            <StatusRow label="CTR Performance" value={92} color="green" />
            <StatusRow label="Audience Saturation" value={15} color="green" />
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-lg border border-white/[0.06] bg-[#0f172a] p-5">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { time: "2h ago", event: "Daily spend reached $27.00", type: "info" },
              { time: "6h ago", event: "CTR exceeded 7% benchmark", type: "positive" },
              { time: "1d ago", event: "New campaign launched: Stamped Concrete", type: "info" },
              { time: "2d ago", event: "Audience overlap detected in 2 ad sets", type: "warning" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  item.type === "positive" ? "bg-emerald-400" :
                  item.type === "warning" ? "bg-amber-400" : "bg-sky-400"
                }`} />
                <span className="text-xs text-slate-300 flex-1">{item.event}</span>
                <span className="text-[10px] font-mono text-slate-600 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadsTab() {
  return (
    <div className="space-y-0">
      <KpiRow
        kpis={[
          { label: "Total Leads", value: "6", trend: { value: 50 }, status: "positive", subtitle: "this month" },
          { label: "Pipeline Value", value: "$49.7K", trend: { value: 82.3 }, sparkline: [12, 18, 24, 30, 36, 42], status: "positive" },
          { label: "Avg Lead Score", value: "81", sparkline: [72, 74, 76, 78, 80, 81], status: "positive" },
          { label: "Conversion Rate", value: "0%", status: "negative", subtitle: "no pixel" },
        ]}
        variant="dark"
        className="rounded-none border-x-0 border-t-0"
      />
      <div className="px-5 py-4">
        <DataTable columns={LEAD_COLS} rows={LEADS} variant="dark" />
      </div>
    </div>
  );
}

function AuditTab() {
  return (
    <div className="space-y-0">
      <KpiRow
        kpis={[
          { label: "Critical Issues", value: "1", status: "negative" },
          { label: "Warnings", value: "2", status: "warning" },
          { label: "Info", value: "1", status: "neutral" },
          { label: "Health Score", value: "62/100", status: "warning" },
        ]}
        variant="dark"
        className="rounded-none border-x-0 border-t-0"
      />
      <div className="px-5 py-4">
        <DataTable columns={AUDIT_COLS} rows={AUDIT_ITEMS} variant="dark" />
      </div>
    </div>
  );
}

function CreativesTab() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CREATIVES.map((c) => (
          <div key={c.id} className="rounded-lg border border-white/[0.06] bg-[#0f172a] overflow-hidden">
            {/* Placeholder image area */}
            <div className="aspect-video bg-[#1e293b] flex items-center justify-center">
              <span className="text-slate-600 text-xs font-mono">{c.format}</span>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-slate-200 leading-tight">{c.name}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                  c.status === "Active" ? "bg-emerald-400/15 text-emerald-400" :
                  c.status === "Paused" ? "bg-amber-400/15 text-amber-400" :
                  "bg-slate-500/15 text-slate-500"
                }`}>{c.status}</span>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-500">
                <span>CTR <span className="text-slate-300 font-mono">{c.ctr}%</span></span>
                <span>Spend <span className="text-slate-300 font-mono">${c.spend.toFixed(2)}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderTab({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center space-y-2">
        <div className="text-slate-600 text-sm font-mono">{name}</div>
        <div className="text-slate-700 text-xs">
          Each tab renders a self-contained view with its own data layout.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN DEMO COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function DataOverlayDemo() {
  const [activeTab, setActiveTab] = useState("performance");
  const [activeSidebar, setActiveSidebar] = useState("revitalize");

  const tabContent: Record<string, React.ReactNode> = {
    overview: <OverviewTab />,
    performance: <PerformanceTab />,
    leads: <LeadsTab />,
    audit: <AuditTab />,
    creatives: <CreativesTab />,
  };

  return (
    <AppShell
      appName="Meta Ads OS"
      appSubtitle="Upward Engine"
      sidebarItems={SIDEBAR_ITEMS}
      activeSidebarId={activeSidebar}
      onSidebarSelect={setActiveSidebar}
      headerContent={
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Clients ›</span>
          <span className="text-xs font-medium text-slate-200">
            (NEW) Revitalize Concrete
          </span>
          <span className="text-[10px] font-mono text-slate-600 hidden sm:inline">
            act_2082816418546591
          </span>
        </div>
      }
      headerRight={
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600">
          <span>Mode: <span className="text-slate-400">manual</span></span>
          <span>Status: <span className="text-emerald-400">active</span></span>
        </div>
      }
      variant="dark"
    >
      {/* Tab bar — pinned below header */}
      <TabBar
        tabs={TABS}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        variant="dark"
        rightSlot={
          <div className="flex items-center gap-3">
            <TabPill label="Campaigns" active />
            <TabPill label="Ad Sets" />
            <TabPill label="Ads" />
            <span className="text-[10px] font-mono text-slate-600 hidden lg:inline">
              Last 30 days
            </span>
          </div>
        }
      />

      {/* Tab content — scrolls naturally if longer than viewport */}
      {tabContent[activeTab] ?? <PlaceholderTab name={activeTab} />}
    </AppShell>
  );
}

// ── Small helpers ──────────────────────────────────────────────────
function StatusRow({
  label,
  value,
  color,
  note,
}: {
  label: string;
  value: number;
  color: "green" | "red" | "amber" | "blue";
  note?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-40 text-xs text-slate-500 shrink-0">{label}</span>
      <StatusBar value={value} color={color} className="flex-1" />
      <span className="w-20 text-right text-xs font-mono text-slate-400">
        {note ?? `${value}%`}
      </span>
    </div>
  );
}

function TabPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`text-[10px] font-medium px-2.5 py-1 rounded-md transition-colors ${
        active
          ? "bg-amber-400/15 text-amber-400"
          : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
      }`}
    >
      {label}
    </button>
  );
}

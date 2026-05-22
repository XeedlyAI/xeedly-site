# DATA-OVERLAY.md — Premium Data Dashboard Aesthetic & Application Shell Pattern
# The Meta Ads OS / Upward Engine pattern: sidebar nav, tab switching, viewport-aware data stories.

## Philosophy

Data-dense interfaces fail when they ask users to scroll to find answers. The pattern that works: **navigation solves information architecture, not scrolling.** A fixed sidebar picks the entity. Tabs pick the view. The content area tells a complete story for that combination — KPIs at top, visualization in the middle, detail table at the bottom. If a tab's content is short enough to fit one screen, great. If it runs longer, the content scrolls naturally while sidebar and tabs stay pinned.

This pattern applies everywhere we present operational data: ad performance dashboards, property management overviews, restaurant analytics, HOA compliance trackers, case study results sections, admin panels, and internal tools.

## When to Read This Skill

Read this skill when the project brief calls for:
- Admin dashboards or client portals
- Data-heavy sections on marketing sites (case study results, ROI calculators)
- Platform demo pages that show what an OS-style tool looks like
- Any interface where users compare metrics across entities or time periods

## Layout Architecture

### The Three-Layer Structure

```
┌──────────┬───────────────────────────────────────────┐
│          │  Header (breadcrumb, status, search)       │
│          ├───────────────────────────────────────────┤
│ Sidebar  │  TabBar (10-14 tabs, badges, right slot)  │
│ (fixed)  ├───────────────────────────────────────────┤
│          │                                           │
│  Entity  │  Content Area (scrolls if needed)         │
│  context │    ┌─────────────────────────────────┐    │
│          │    │ KPI Row (4-8 metrics)            │    │
│          │    ├─────────────────────────────────┤    │
│          │    │ Chart / Visualization            │    │
│          │    ├─────────────────────────────────┤    │
│          │    │ Data Table (sortable, detailed)  │    │
│          │    └─────────────────────────────────┘    │
└──────────┴───────────────────────────────────────────┘
```

### AppShell (`src/components/data-overlay/AppShell.tsx`)

Fixed sidebar + scrollable main area. The sidebar handles primary context (which client, which property, which restaurant). It never changes as you switch tabs.

```tsx
<AppShell
  appName="Platform Name"
  appSubtitle="v2.0"
  sidebarItems={SIDEBAR_ITEMS}
  activeSidebarId={activeSidebar}
  onSidebarSelect={setActiveSidebar}
  headerContent={<Breadcrumb />}
  headerRight={<StatusIndicators />}
  variant="dark"
>
  <TabBar ... />
  {tabContent}
</AppShell>
```

**Sidebar item structure:**
```tsx
type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;  // notification count, status
  section?: string;          // group heading ("Clients", "System")
};
```

### TabBar (`src/components/data-overlay/TabBar.tsx`)

Handles 10-14+ tabs with horizontal overflow scroll. Each tab can have a badge with severity.

```tsx
<TabBar
  tabs={TABS}
  activeTabId={activeTab}
  onTabChange={setActiveTab}
  variant="dark"
  rightSlot={<FiltersAndToggles />}
/>
```

**Tab structure:**
```tsx
type Tab = {
  id: string;
  label: string;
  badge?: number | string;
  badgeVariant?: "info" | "warn" | "error";  // blue, amber, red
};
```

**Right slot:** Use for sub-filters (Campaigns/Ad Sets/Ads toggles), date range selectors, comparison period toggles, or action buttons. These stay visible across all tabs.

## Component Reference

### KpiCard — The 5-Layer Metric Card

Every KPI card packs five data layers into one compact unit:

1. **Status bar** — 2px color strip at top (green/red/amber/neutral)
2. **Label** — 10px uppercase tracking, muted color
3. **Value** — Large mono font, tabular numerics
4. **Sparkline** — Inline SVG trend line (72x24px)
5. **Trend badge** — Arrow + percentage + suffix

```tsx
<KpiCard
  label="CTR"
  value="7.2%"
  trend={{ value: 113.7, suffix: "%" }}
  sparkline={[3.2, 4.1, 5.8, 6.2, 7.0, 6.5, 7.2]}
  status="positive"
  subtitle="30d"
  variant="dark"
/>
```

**Status values:** `"positive"` (green), `"negative"` (red), `"warning"` (amber), `"neutral"` (slate)

### KpiRow — Multi-Metric Container

Responsive grid with dividers. Auto-adjusts columns based on count.

```tsx
<KpiRow kpis={kpiArray} variant="dark" />
```

- 3 KPIs → 1 col mobile, 3 col desktop
- 4 KPIs → 2 col mobile, 4 col desktop
- 6 KPIs → 2 col mobile, 3 col tablet, 6 col desktop
- 8 KPIs → 2 col mobile, 4 col tablet, 8 col desktop

### TimeSeriesChart — SVG Area Chart

```tsx
<TimeSeriesChart
  title="Daily Spend"
  total="$870.66"
  peak="$46.55"
  latest="$27.00"
  period="Apr 22 → May 20"
  data={[{ label: "Apr 22", value: 24.5 }, ...]}
  color="#f59e0b"
  variant="dark"
/>
```

### DataTable — Sortable Table with Custom Renderers

```tsx
<DataTable
  columns={[
    { key: "name", label: "Campaign", render: (row) => ... },
    { key: "spend", label: "Spend", align: "right", sortable: true, sortValue: (row) => row.spend, render: (row) => renderMoney(row.spend) },
  ]}
  rows={data}
  variant="dark"
/>
```

**Built-in render helpers:**
- `renderTrend(value, suffix)` — TrendBadge with auto-detected direction
- `renderSparkline(data, color)` — Inline sparkline
- `renderMoney(value)` — Formatted dollar amount with mono font

### StatusBar — Thin Progress Meter

```tsx
<StatusBar value={72} color="amber" />
```

Colors: `"green"`, `"red"`, `"amber"`, `"blue"`, `"slate"`

## Design Rules — What Makes It Feel Premium

### Color: Semantic Only
Color is NEVER decorative. Every colored pixel communicates meaning:
- **Green** (#34d399) — positive trend, healthy status, target met
- **Red** (#f87171) — negative trend, critical issue, target missed
- **Amber** (#fbbf24) — warning, caution, approaching threshold
- **Sky blue** (#38bdf8) — informational, neutral highlight
- **Slate** — everything else (text, borders, backgrounds)

Never add color for aesthetics. If a number is just a number with no implied good/bad, it's slate.

### Typography: Tabular Numerics
All numeric values use `font-mono tabular-nums`. This ensures:
- Numbers align vertically in columns
- Values are instantly scannable
- Comparison across rows is effortless

Labels use `text-[10px] font-semibold tracking-[0.14em] uppercase` — small, spaced, muted.

### Sparklines: Inline Context
Every KPI card that tracks a value over time should include a sparkline. The sparkline tells you "is this going up or down?" without needing to navigate to a chart. Size: 72x24px. Color matches the status color.

### Trend Badges: Direction + Magnitude
Always show both the arrow (direction) and the number (magnitude). `▲ 113.7%` tells you more than either piece alone. Auto-color: green for up on metrics where up is good, red for up on metrics where up is bad (like CPA, error rate).

### Status Bars: Thin, Not Thick
Status/progress bars are 2-3px tall, never fat. They communicate proportion without dominating the layout.

### Dark Mode First
The dark aesthetic (#0f172a background, #1e293b cards) is the primary design. It makes data glow, reduces eye strain for users who live in the tool, and feels like a professional operating system. Light variant exists for embedding in marketing pages.

### Density Through Navigation, Not Scrolling
Each tab should present 3 zones: summary metrics (KpiRow) → trend visualization (chart) → detail (table). If 3 zones fit the viewport, great. If not, content scrolls naturally. But the goal is always: tell the complete story in as little vertical space as possible.

## Industry Repurposing Guide

The component system is data-agnostic. The *structure* stays identical — only the labels, values, tabs, and sidebar items change. Here is how to adapt for each vertical:

### Property Management (PropertyDocz / CoreHOA)
**Sidebar entities:** Properties → units/buildings
**Tab examples:** Overview, Compliance, Documents, Violations, Vendors, Financials, Maintenance, Residents
**KPI examples:**
- Compliance Rate: 94.2% ▲ 3.1%
- Open Violations: 12 ▼ -28%
- Pending Documents: 47
- Avg Response Time: < 2h
- Revenue (MTD): $142K ▲ 12.4%

### Home Services / Contractors (PropertyJobz)
**Sidebar entities:** Service areas → crews/technicians
**Tab examples:** Overview, Jobs, Pipeline, Crews, Reviews, Revenue, Marketing, Scheduling
**KPI examples:**
- Active Jobs: 34
- Pipeline Value: $89K ▲ 45%
- Avg Job Value: $2,400
- Review Score: 4.9 ▲ 0.2pts
- Crew Utilization: 87%

### Restaurant Operations
**Sidebar entities:** Locations → shifts/dayparts
**Tab examples:** Overview, Revenue, Labor, Inventory, Reviews, Marketing, Compliance, Training
**KPI examples:**
- Revenue (Today): $4,200
- Labor Cost: 28.4% ▼ -2.1%
- Ticket Average: $18.50 ▲ 8%
- Wait Time: 12min
- Review Score: 4.7

### Ad Management (Meta Ads OS pattern — reference implementation)
**Sidebar entities:** Clients → accounts
**Tab examples:** Overview, Performance, Campaigns, Ad Sets, Ads, Creatives, Leads, Audit, Competitors
**KPI examples:** Spend, Conv, ROAS, CPA, CTR, CPM, Clicks, Impressions, Reach, Frequency

### SaaS / Platform Analytics
**Sidebar entities:** Products → environments
**Tab examples:** Overview, Users, Events, Performance, Errors, Billing, Integrations, Settings
**KPI examples:**
- Active Users: 1,247 ▲ 18%
- Events / Day: 89.4K
- Error Rate: 0.02%
- MRR: $24.8K ▲ 12%
- Avg Latency: 1.2s ▼ -18%

## Composing a New Dashboard View

When building a new tab view, follow this template:

```tsx
function MyTab() {
  return (
    <div className="space-y-0">
      {/* Zone 1: Summary KPIs — flush edge to edge */}
      <KpiRow
        kpis={MY_KPIS}
        variant="dark"
        className="rounded-none border-x-0 border-t-0"
      />

      {/* Zone 2: Visualization — with padding */}
      <div className="px-5 pt-4">
        <TimeSeriesChart
          title="Primary Metric"
          data={MY_CHART_DATA}
          color="#f59e0b"
          variant="dark"
        />
      </div>

      {/* Zone 3: Detail table — with padding */}
      <div className="px-5 py-4">
        <DataTable
          columns={MY_COLUMNS}
          rows={MY_ROWS}
          variant="dark"
        />
      </div>
    </div>
  );
}
```

Not every tab needs all three zones. Creatives tabs might use a card grid instead of a table. Audit tabs might skip the chart. Activity tabs might use a timeline feed. The zones are guidelines, not requirements.

## Anti-Patterns

1. **Don't mix data overlay with scroll-based marketing layout.** The AppShell pattern (h-screen, fixed sidebar) is for tools and dashboards. Marketing pages use the standard Layout component with full-page scroll. Don't put KpiRows inside a landing page section — use the existing KpiTicker component for that.

2. **Don't add decorative color.** No gradients on cards. No colored backgrounds behind KPI rows. No accent colors on borders. The only color comes from data semantics.

3. **Don't skip the sparkline.** If a metric changes over time, show the sparkline. A number without context is just a number.

4. **Don't make fat status bars.** 2-3px. The thinner the bar, the more premium it feels.

5. **Don't put more than 8 KPIs in one row.** Beyond 8, the values become too compressed to read. If you have more than 8 metrics, split them across tabs or use a secondary KPI row below the chart.

6. **Don't use the AppShell for content with fewer than 3 tabs.** If there are only 1-2 views, a simple page with sections is cleaner. The shell earns its complexity at 4+ tabs.

## File Locations

All components live in `src/components/data-overlay/`:
```
AppShell.tsx      — Layout shell with sidebar
TabBar.tsx        — Horizontal tab navigation
KpiCard.tsx       — Individual metric card
KpiRow.tsx        — Multi-metric container
Sparkline.tsx     — Inline SVG trend line
TrendBadge.tsx    — Arrow + value + color
TimeSeriesChart.tsx — SVG area chart
DataTable.tsx     — Sortable table with renderers
StatusBar.tsx     — Thin progress meter
index.ts          — Barrel export
```

Import everything from the barrel:
```tsx
import { AppShell, TabBar, KpiRow, DataTable, TimeSeriesChart } from "@/components/data-overlay";
```

Reference implementation: `src/app/data-overlay-demo/DataOverlayDemo.tsx`

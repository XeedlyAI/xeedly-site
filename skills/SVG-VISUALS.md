# SVG-VISUALS.md — Code-Generated Graphics, Illustrations & Product Mockups
# Build visual assets directly in code. No Figma, no stock photos, no placeholder boxes.

## Philosophy

Every placeholder on a website is a credibility leak. This skill teaches you to generate abstract but intentional graphics that suggest real product UI, data visualizations, and conceptual illustrations — all as inline SVG or CSS, using only the project's brand colors. These aren't screenshots and they aren't generic stock art. They're designed visual elements that communicate "this is what the product feels like" without requiring actual product screenshots.

## Brand Color Constants

Always pull from the project's CSS variables. Default Sovvrn palette:
```
Dark background:  #0F172A (for SVG dark surfaces)
Card surface:     #1E293B (slightly lighter dark)
Border:           #334155 (subtle dark border)
Blue accent:      #4E8AE6
Gold accent:      #D4A853
Text light:       #E2E8F0
Text muted:       #94A3B8
Success:          #3EBE7A
Warning:          #E88B5C
Grid lines:       #1E293B (barely visible on dark)
```

For SVGs on light backgrounds, invert:
```
Card surface:     #F8FAFC
Border:           #E2E8F0
Text dark:        #1E293B
Text muted:       #94A3B8
```

## Pattern 1: Dashboard Mockup (Three-Panel Layout)

Suggests a command center / intelligence dashboard without showing real data.

```tsx
export function DashboardMockup({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer frame */}
      <rect x="0" y="0" width="800" height="500" rx="12" fill="#0F172A" />

      {/* Top bar */}
      <rect x="0" y="0" width="800" height="40" rx="12" fill="#1E293B" />
      <circle cx="20" cy="20" r="5" fill="#EF4444" opacity="0.7" />
      <circle cx="38" cy="20" r="5" fill="#F59E0B" opacity="0.7" />
      <circle cx="56" cy="20" r="5" fill="#22C55E" opacity="0.7" />
      <rect x="300" y="12" width="200" height="16" rx="8" fill="#334155" />

      {/* Left sidebar */}
      <rect x="16" y="56" width="180" height="428" rx="8" fill="#1E293B" />
      {/* Sidebar items */}
      <rect x="28" y="72" width="120" height="10" rx="5" fill="#4E8AE6" opacity="0.8" />
      <rect x="28" y="100" width="100" height="8" rx="4" fill="#334155" />
      <rect x="28" y="124" width="110" height="8" rx="4" fill="#334155" />
      <rect x="28" y="148" width="90" height="8" rx="4" fill="#334155" />
      <rect x="28" y="172" width="105" height="8" rx="4" fill="#334155" />
      <rect x="28" y="210" width="60" height="6" rx="3" fill="#94A3B8" opacity="0.4" />
      <rect x="28" y="230" width="95" height="8" rx="4" fill="#334155" />
      <rect x="28" y="254" width="85" height="8" rx="4" fill="#334155" />

      {/* Main content area */}
      <rect x="212" y="56" width="370" height="428" rx="8" fill="#1E293B" />

      {/* Signal cards in main area */}
      <rect x="228" y="72" width="338" height="80" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <circle cx="248" cy="96" r="8" fill="#3EBE7A" opacity="0.3" />
      <circle cx="248" cy="96" r="4" fill="#3EBE7A" />
      <rect x="268" y="88" width="160" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="268" y="104" width="240" height="6" rx="3" fill="#94A3B8" opacity="0.5" />
      <rect x="510" y="88" width="40" height="16" rx="4" fill="#4E8AE6" opacity="0.2" />

      <rect x="228" y="164" width="338" height="80" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <circle cx="248" cy="188" r="8" fill="#E88B5C" opacity="0.3" />
      <circle cx="248" cy="188" r="4" fill="#E88B5C" />
      <rect x="268" y="180" width="180" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="268" y="196" width="220" height="6" rx="3" fill="#94A3B8" opacity="0.5" />
      <rect x="510" y="180" width="40" height="16" rx="4" fill="#E88B5C" opacity="0.2" />

      <rect x="228" y="256" width="338" height="80" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <circle cx="248" cy="280" r="8" fill="#4E8AE6" opacity="0.3" />
      <circle cx="248" cy="280" r="4" fill="#4E8AE6" />
      <rect x="268" y="272" width="200" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="268" y="288" width="180" height="6" rx="3" fill="#94A3B8" opacity="0.5" />

      {/* Mini chart in main area */}
      <rect x="228" y="352" width="338" height="120" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <polyline
        points="248,440 290,420 330,430 370,400 410,410 450,380 490,390 530,370"
        fill="none"
        stroke="#4E8AE6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polyline
        points="248,440 290,435 330,438 370,425 410,430 450,420 490,425 530,418"
        fill="none"
        stroke="#334155"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Right panel */}
      <rect x="598" y="56" width="186" height="428" rx="8" fill="#1E293B" />
      {/* KPI cards */}
      <rect x="610" y="72" width="162" height="60" rx="6" fill="#0F172A" />
      <rect x="622" y="82" width="50" height="6" rx="3" fill="#94A3B8" opacity="0.5" />
      <rect x="622" y="98" width="80" height="14" rx="4" fill="#D4A853" opacity="0.8" />

      <rect x="610" y="144" width="162" height="60" rx="6" fill="#0F172A" />
      <rect x="622" y="154" width="60" height="6" rx="3" fill="#94A3B8" opacity="0.5" />
      <rect x="622" y="170" width="70" height="14" rx="4" fill="#3EBE7A" opacity="0.8" />

      <rect x="610" y="216" width="162" height="60" rx="6" fill="#0F172A" />
      <rect x="622" y="226" width="45" height="6" rx="3" fill="#94A3B8" opacity="0.5" />
      <rect x="622" y="242" width="90" height="14" rx="4" fill="#4E8AE6" opacity="0.8" />
    </svg>
  )
}
```

## Pattern 2: Phone/SMS Mockup

Suggests a morning briefing delivered via text message.

```tsx
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 580" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Phone body */}
      <rect x="10" y="0" width="280" height="580" rx="36" fill="#1E293B" stroke="#334155" strokeWidth="2" />
      <rect x="18" y="8" width="264" height="564" rx="32" fill="#0F172A" />

      {/* Status bar */}
      <rect x="110" y="16" width="80" height="4" rx="2" fill="#334155" />

      {/* Message bubbles */}
      {/* Incoming - Sovvrn */}
      <rect x="34" y="60" width="200" height="100" rx="16" fill="#1E293B" />
      <rect x="46" y="72" width="80" height="6" rx="3" fill="#4E8AE6" opacity="0.7" />
      <rect x="46" y="86" width="170" height="5" rx="2.5" fill="#E2E8F0" opacity="0.6" />
      <rect x="46" y="97" width="155" height="5" rx="2.5" fill="#E2E8F0" opacity="0.6" />
      <rect x="46" y="108" width="140" height="5" rx="2.5" fill="#E2E8F0" opacity="0.6" />
      <rect x="46" y="119" width="120" height="5" rx="2.5" fill="#E2E8F0" opacity="0.6" />
      <rect x="46" y="136" width="50" height="4" rx="2" fill="#94A3B8" opacity="0.4" />

      {/* Highlight message */}
      <rect x="34" y="176" width="220" height="80" rx="16" fill="#4E8AE6" opacity="0.15" stroke="#4E8AE6" strokeWidth="1" />
      <rect x="46" y="188" width="60" height="5" rx="2.5" fill="#4E8AE6" />
      <rect x="46" y="200" width="190" height="5" rx="2.5" fill="#E2E8F0" opacity="0.7" />
      <rect x="46" y="212" width="175" height="5" rx="2.5" fill="#E2E8F0" opacity="0.7" />
      <rect x="46" y="224" width="130" height="5" rx="2.5" fill="#D4A853" opacity="0.8" />

      {/* Another incoming */}
      <rect x="34" y="272" width="180" height="70" rx="16" fill="#1E293B" />
      <rect x="46" y="284" width="150" height="5" rx="2.5" fill="#E2E8F0" opacity="0.6" />
      <rect x="46" y="296" width="130" height="5" rx="2.5" fill="#E2E8F0" opacity="0.6" />
      <rect x="46" y="308" width="100" height="5" rx="2.5" fill="#3EBE7A" opacity="0.7" />

      {/* Stats row */}
      <rect x="34" y="358" width="232" height="60" rx="16" fill="#1E293B" />
      <rect x="50" y="372" width="60" height="20" rx="4" fill="#0F172A" />
      <rect x="56" y="378" width="48" height="8" rx="2" fill="#D4A853" opacity="0.8" />
      <rect x="120" y="372" width="60" height="20" rx="4" fill="#0F172A" />
      <rect x="126" y="378" width="48" height="8" rx="2" fill="#3EBE7A" opacity="0.8" />
      <rect x="190" y="372" width="60" height="20" rx="4" fill="#0F172A" />
      <rect x="196" y="378" width="48" height="8" rx="2" fill="#4E8AE6" opacity="0.8" />

      {/* Input bar */}
      <rect x="34" y="520" width="200" height="36" rx="18" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <rect x="50" y="534" width="80" height="6" rx="3" fill="#94A3B8" opacity="0.3" />
      <circle cx="252" cy="538" r="14" fill="#4E8AE6" />
    </svg>
  )
}
```

## Pattern 3: Chart / Trend Line

Abstract analytics chart suggesting performance data.

```tsx
export function ChartMockup({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="600" height="350" rx="12" fill="#0F172A" />

      {/* Title area */}
      <rect x="24" y="20" width="120" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="24" y="36" width="80" height="6" rx="3" fill="#94A3B8" opacity="0.4" />

      {/* Legend */}
      <circle cx="460" cy="24" r="4" fill="#4E8AE6" />
      <rect x="470" y="20" width="50" height="6" rx="3" fill="#94A3B8" opacity="0.5" />
      <circle cx="540" cy="24" r="4" fill="#334155" />
      <rect x="550" y="20" width="30" height="6" rx="3" fill="#94A3B8" opacity="0.5" />

      {/* Grid lines */}
      <line x1="60" y1="80" x2="576" y2="80" stroke="#1E293B" strokeWidth="1" />
      <line x1="60" y1="140" x2="576" y2="140" stroke="#1E293B" strokeWidth="1" />
      <line x1="60" y1="200" x2="576" y2="200" stroke="#1E293B" strokeWidth="1" />
      <line x1="60" y1="260" x2="576" y2="260" stroke="#1E293B" strokeWidth="1" />
      <line x1="60" y1="320" x2="576" y2="320" stroke="#1E293B" strokeWidth="1" />

      {/* Y-axis labels */}
      <rect x="24" y="77" width="24" height="6" rx="3" fill="#94A3B8" opacity="0.3" />
      <rect x="24" y="137" width="20" height="6" rx="3" fill="#94A3B8" opacity="0.3" />
      <rect x="24" y="197" width="22" height="6" rx="3" fill="#94A3B8" opacity="0.3" />
      <rect x="24" y="257" width="18" height="6" rx="3" fill="#94A3B8" opacity="0.3" />

      {/* Target line (dashed) */}
      <line x1="60" y1="180" x2="576" y2="180" stroke="#D4A853" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.5" />

      {/* Primary trend line */}
      <polyline
        points="60,280 100,260 150,270 200,240 250,220 300,200 350,180 400,160 450,170 500,140 550,120 576,110"
        fill="none"
        stroke="#4E8AE6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Area fill under line */}
      <polygon
        points="60,280 100,260 150,270 200,240 250,220 300,200 350,180 400,160 450,170 500,140 550,120 576,110 576,320 60,320"
        fill="url(#blueGradient)"
      />

      {/* Comparison line */}
      <polyline
        points="60,260 100,255 150,250 200,245 250,240 300,238 350,235 400,230 450,228 500,225 550,222 576,220"
        fill="none"
        stroke="#334155"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Data point highlight */}
      <circle cx="500" cy="140" r="6" fill="#0F172A" stroke="#4E8AE6" strokeWidth="2" />
      <rect x="480" y="110" width="60" height="22" rx="4" fill="#4E8AE6" />
      <rect x="492" y="118" width="36" height="6" rx="3" fill="white" opacity="0.9" />

      <defs>
        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4E8AE6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4E8AE6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
```

## Pattern 4: Voice/Audio Waveform

Suggests an AI voice agent or call interface.

```tsx
export function VoiceMockup({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="400" height="300" rx="12" fill="#0F172A" />

      {/* Avatar circle */}
      <circle cx="200" cy="90" r="36" fill="#1E293B" stroke="#4E8AE6" strokeWidth="2" />
      <circle cx="200" cy="82" r="12" fill="#94A3B8" opacity="0.5" />
      <ellipse cx="200" cy="104" rx="18" ry="10" fill="#94A3B8" opacity="0.3" />

      {/* Name */}
      <rect x="155" y="140" width="90" height="8" rx="4" fill="#E2E8F0" opacity="0.8" />
      <rect x="165" y="156" width="70" height="6" rx="3" fill="#94A3B8" opacity="0.4" />

      {/* Waveform bars */}
      {[...Array(30)].map((_, i) => {
        const height = Math.sin(i * 0.5) * 20 + Math.random() * 15 + 10
        return (
          <rect
            key={i}
            x={80 + i * 8}
            y={200 - height / 2}
            width="4"
            height={height}
            rx="2"
            fill="#4E8AE6"
            opacity={0.4 + Math.sin(i * 0.3) * 0.3}
          />
        )
      })}

      {/* Duration */}
      <rect x="170" y="230" width="60" height="6" rx="3" fill="#94A3B8" opacity="0.4" />

      {/* Controls */}
      <circle cx="160" cy="265" r="12" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <circle cx="200" cy="265" r="16" fill="#EF4444" opacity="0.8" />
      <circle cx="240" cy="265" r="12" fill="#1E293B" stroke="#334155" strokeWidth="1" />
    </svg>
  )
}
```

NOTE: The waveform uses random heights for illustration. In a real component, generate fixed values to avoid hydration mismatches between server and client. Use a seeded pattern instead:

```tsx
const barHeights = [25, 15, 30, 20, 35, 18, 28, 22, 32, 12, 26, 19, 34, 16, 29, 24, 31, 14, 27, 21, 33, 17, 30, 23, 28, 13, 25, 20, 35, 18]
```

## Pattern 5: Location Grid / Table Mockup

Suggests a multi-location comparison table.

```tsx
export function LocationGridMockup({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 700 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="700" height="400" rx="12" fill="#0F172A" />

      {/* Header row */}
      <rect x="16" y="16" width="668" height="36" rx="6" fill="#1E293B" />
      <rect x="28" y="28" width="80" height="6" rx="3" fill="#94A3B8" opacity="0.6" />
      <rect x="180" y="28" width="50" height="6" rx="3" fill="#94A3B8" opacity="0.6" />
      <rect x="300" y="28" width="60" height="6" rx="3" fill="#94A3B8" opacity="0.6" />
      <rect x="420" y="28" width="55" height="6" rx="3" fill="#94A3B8" opacity="0.6" />
      <rect x="540" y="28" width="65" height="6" rx="3" fill="#94A3B8" opacity="0.6" />
      <rect x="630" y="28" width="40" height="6" rx="3" fill="#94A3B8" opacity="0.6" />

      {/* Data rows */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const y = 68 + i * 40
        const isHighlight = i === 2
        const healthColor = i === 2 ? '#E88B5C' : i === 5 ? '#D4A853' : '#3EBE7A'
        return (
          <g key={i}>
            {isHighlight && <rect x="16" y={y - 4} width="668" height="36" rx="4" fill="#E88B5C" opacity="0.06" />}
            <rect x="28" y={y + 6} width={90 + (i % 3) * 10} height="6" rx="3" fill="#E2E8F0" opacity="0.7" />
            <rect x="180" y={y + 6} width="40" height="6" rx="3" fill="#D4A853" opacity="0.7" />
            <rect x="300" y={y + 6} width="50" height="6" rx="3" fill="#E2E8F0" opacity="0.5" />
            <rect x="420" y={y + 6} width="45" height="6" rx="3" fill="#E2E8F0" opacity="0.5" />
            {/* Sparkline */}
            <polyline
              points={`540,${y + 14} 555,${y + 10 - i} 570,${y + 12} 585,${y + 6} 600,${y + 8}`}
              fill="none"
              stroke="#4E8AE6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Health indicator */}
            <circle cx="646" cy={y + 10} r="5" fill={healthColor} opacity="0.3" />
            <circle cx="646" cy={y + 10} r="3" fill={healthColor} />
            <line x1="16" y1={y + 32} x2="684" y2={y + 32} stroke="#1E293B" strokeWidth="1" />
          </g>
        )
      })}
    </svg>
  )
}
```

## Rules for SVG Mockups

1. **Always use brand colors** — never introduce random colors. Everything comes from the palette.
2. **Abstract, not literal** — these suggest UI patterns without committing to specific data or labels. Use rectangles for text, circles for avatars, polylines for charts.
3. **Dark background assumed** — most product mockups look best on a dark (#0F172A) background, even when the page section is light. This creates a "screenshot" effect.
4. **Rounded corners everywhere** — rx="4" minimum on all rectangles. Matches modern UI aesthetics.
5. **Opacity for depth** — use opacity variations (0.3, 0.5, 0.7, 0.9) to create visual hierarchy within the mockup.
6. **Responsive** — use viewBox, never fixed width/height. Let the parent container control size.
7. **No text** — use rectangle placeholders for text. Real text in SVGs doesn't scale well and creates font loading issues.
8. **Server-safe** — avoid Math.random() or Date.now() in SVGs rendered on the server. Use deterministic values to prevent hydration mismatches.
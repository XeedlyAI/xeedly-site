# LAYOUT.md — Advanced Layout Composition & Visual Hierarchy
# The patterns that make pages feel designed, not just stacked.

## Philosophy

Amateur layouts stack content vertically: heading, text, image, heading, text, image. Professional layouts compose visual relationships — asymmetry, overlap, tension, breathing room, and rhythm. This skill covers the structural patterns that make a visitor feel "this was designed by someone who knows what they're doing."

## Pattern 1: Split Screen with Offset

Content on one side, visual on the other, but NOT aligned to the same baseline. The visual breaks out of its container slightly.

```tsx
export function SplitOffset({
  content,
  visual,
  reverse = false
}: {
  content: React.ReactNode
  visual: React.ReactNode
  reverse?: boolean
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:direction-rtl' : ''}`}>
      <div className={`${reverse ? 'lg:order-2 lg:direction-ltr' : ''} max-w-lg`}>
        {content}
      </div>
      <div className={`${reverse ? 'lg:order-1 lg:direction-ltr' : ''} relative`}>
        {/* Visual breaks out of grid on one side */}
        <div className={`relative ${reverse ? 'lg:-ml-12' : 'lg:-mr-12'} lg:scale-105`}>
          {visual}
        </div>
      </div>
    </div>
  )
}
```

## Pattern 2: Bento Grid

Mixed-size cards in an asymmetric grid. 1 large card + 2-4 smaller cards. Creates visual interest and implied hierarchy.

```tsx
export function BentoGrid({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  )
}

// Usage with specific spans:
// <div className="lg:col-span-2 lg:row-span-2"> — Large feature card
// <div className="lg:col-span-1"> — Standard card
// <div className="lg:col-span-1"> — Standard card
// <div className="lg:col-span-2"> — Wide card
// <div className="lg:col-span-1"> — Standard card

// Example layout:
// ┌──────────────┬────────┐
// │              │        │
// │   Feature    │ Card 2 │
// │   (2x2)      │        │
// │              ├────────┤
// │              │ Card 3 │
// ├──────────────┴────────┤
// │     Wide Card (3x1)   │
// └───────────────────────┘
```

### Specific Bento Implementation:

```tsx
export function FeatureBento() {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 max-w-6xl mx-auto">
      {/* Large feature - spans 2 cols, 2 rows */}
      <div className="col-span-4 md:col-span-2 row-span-2 rounded-2xl bg-white border border-gray-200 p-8 flex flex-col justify-between min-h-[400px]">
        <div>
          <span className="text-sm font-mono text-blue-500">Intelligence</span>
          <h3 className="text-2xl font-semibold mt-2">Command Center</h3>
          <p className="text-gray-500 mt-3">Description here</p>
        </div>
        <div className="mt-6">
          {/* Visual/mockup goes here */}
        </div>
      </div>

      {/* Top right */}
      <div className="col-span-4 md:col-span-2 rounded-2xl bg-white border border-gray-200 p-6">
        <span className="text-sm font-mono text-blue-500">Coaching</span>
        <h3 className="text-xl font-semibold mt-2">AI Coach</h3>
        <p className="text-gray-500 mt-2 text-sm">Description</p>
      </div>

      {/* Bottom right */}
      <div className="col-span-4 md:col-span-2 rounded-2xl bg-white border border-gray-200 p-6">
        <span className="text-sm font-mono text-blue-500">Voice</span>
        <h3 className="text-xl font-semibold mt-2">Voice AI</h3>
        <p className="text-gray-500 mt-2 text-sm">Description</p>
      </div>

      {/* Full width bottom */}
      <div className="col-span-4 rounded-2xl bg-white border border-gray-200 p-6">
        <span className="text-sm font-mono text-blue-500">Delivery</span>
        <h3 className="text-xl font-semibold mt-2">Morning Briefing</h3>
      </div>
    </div>
  )
}
```

## Pattern 3: Sticky Scroll Feature Showcase

Left side stays pinned while right side content scrolls through features. Each scroll position changes what's shown on the left. This is the most premium layout pattern on modern SaaS sites.

Implementation is in ANIMATION.md (Pattern 8: Sticky Scroll Section). This file covers the layout structure:

```
┌─────────────────────────────────────────┐
│  ┌──────────────┐  ┌──────────────────┐ │
│  │              │  │                  │ │
│  │   STICKY     │  │  Feature 1       │ │
│  │   VISUAL     │  │  description     │ │
│  │              │  │                  │ │
│  │  (changes    │  ├──────────────────┤ │
│  │   based on   │  │                  │ │
│  │   scroll     │  │  Feature 2       │ │
│  │   position)  │  │  description     │ │
│  │              │  │                  │ │
│  │              │  ├──────────────────┤ │
│  │              │  │                  │ │
│  │              │  │  Feature 3       │ │
│  │              │  │  description     │ │
│  └──────────────┘  └──────────────────┘ │
└─────────────────────────────────────────┘
```

Key implementation rules:
- Container height = number of features × 100vh
- Sticky side: `position: sticky; top: 0; height: 100vh;`
- Scrolling side: each feature block is `min-height: 100vh` with content centered vertically
- On mobile: collapses to stacked layout (no sticky behavior)

## Pattern 4: Overlapping Cards

Cards that slightly overlap their neighbors, creating depth without 3D effects.

```tsx
export function OverlapCards({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="relative flex flex-col items-center">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative w-full max-w-2xl rounded-2xl bg-white border border-gray-200 p-8 shadow-sm"
          style={{
            marginTop: i === 0 ? 0 : -24,
            zIndex: items.length - i, // First card on top
            transform: `scale(${1 - i * 0.02})`, // Each card slightly smaller
          }}
        >
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-gray-500 mt-2">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
```

## Pattern 5: Content Container with Breakout Element

Section content stays within max-width container, but one element (image, card, gradient) extends beyond it to the edge of the viewport.

```tsx
export function Breakout({
  children,
  breakoutSide = 'right'
}: {
  children: React.ReactNode
  breakoutSide?: 'left' | 'right' | 'both'
}) {
  const marginClass = {
    right: '-mr-[calc((100vw-1200px)/2)] pr-0',
    left: '-ml-[calc((100vw-1200px)/2)] pl-0',
    both: '-mx-[calc((100vw-1200px)/2)] px-0',
  }

  return (
    <div className={`${marginClass[breakoutSide]} overflow-hidden`}>
      {children}
    </div>
  )
}
```

## Pattern 6: Section with Floating Decorative Elements

Subtle background shapes that add depth without competing with content. These use absolute positioning and low opacity.

```tsx
export function DecoratedSection({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Top right glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Bottom left glow */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern (very subtle) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}
```

## Pattern 7: Testimonial as Full-Width Pull Quote

Instead of small testimonial cards, use a full-width section with large italic text. Creates a breathing point between dense feature sections.

```
┌─────────────────────────────────────────┐
│                                         │
│    "Before Sovvrn, I spent 90 minutes   │
│     every morning logging into Toast    │
│     for each of my 12 locations."       │
│                                         │
│              — Name, Title              │
│                                         │
└─────────────────────────────────────────┘
```

```tsx
export function PullQuote({
  quote,
  author,
  title
}: {
  quote: string
  author: string
  title: string
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-gray-700 leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="mt-8 text-sm text-gray-400">
          <span className="font-semibold text-gray-600">{author}</span>
          <span className="mx-2">·</span>
          <span>{title}</span>
        </div>
      </div>
    </section>
  )
}
```

## Pattern 8: Stats Row with Visual Weight

Numbers presented with clear hierarchy — the number is massive, the label is small, and optional trend indicators add context.

```tsx
export function StatRow({
  stats
}: {
  stats: { value: string; label: string; trend?: 'up' | 'down'; trendValue?: string }[]
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="text-center md:text-left">
          <div className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-[#D4A853]">
            {stat.value}
          </div>
          <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
          {stat.trend && (
            <div className={`mt-1 text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-400'}`}>
              {stat.trend === 'up' ? '↑' : '↓'} {stat.trendValue}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
```

## Spacing System

Consistent spacing prevents sections from feeling randomly placed.

```
Section padding:        py-16 md:py-24 (64px / 96px)
Between heading & body: mt-4 (16px)
Between body & cards:   mt-10 (40px)
Between cards:          gap-4 or gap-6 (16px or 24px)
Card internal padding:  p-6 md:p-8 (24px / 32px)
Section label to heading: mb-3 (12px)
Max content width:      max-w-6xl (1152px) — not max-w-7xl (too wide)
Max text width:         max-w-2xl (672px) for paragraphs — prevents long line lengths
```

## Section Rhythm Rules

1. **Never stack two identical layouts** — if Section A is left-text / right-image, Section B should NOT also be left-text / right-image. Alternate, or use a centered layout, or use a grid.

2. **Break density with breathing sections** — after 2-3 content-heavy sections, insert a breathing element: a pull quote, a stat row, or a simple centered heading with no cards.

3. **Visual weight follows content importance** — the most important section gets the most visual space (bento grid, sticky scroll, or full-width treatment). Supporting sections get simpler layouts.

4. **Edge-to-edge for emphasis** — when a section needs to feel important, let its background extend edge-to-edge (full viewport width) even though its content stays within max-width.

5. **Progressive disclosure** — the page should give you the big picture first (hero → pillars → how it works) before going deep (feature details → proof → pricing). Never front-load complexity.

## Mobile Adaptation Rules

- All multi-column layouts collapse to single column below `md` (768px)
- Sticky scroll sections become stacked content blocks on mobile
- Bento grids collapse to full-width stacked cards
- Split layouts stack with visual BELOW text (text-first on mobile)
- Reduce section padding: py-16 → py-10 on mobile
- Card padding: p-8 → p-5 on mobile
- Font sizes: text-5xl → text-3xl, text-3xl → text-2xl, text-xl → text-lg
- Hide decorative background elements on mobile (they eat performance)
- Breakout elements return to container width on mobile
# ANIMATION.md — World-Class Motion Design for Web
# The patterns that separate amateur from professional. Every timing value, every easing curve, every threshold is deliberate.

## Philosophy

Motion should feel like gravity — natural, expected, invisible until it's missing. The best animations are the ones users don't consciously notice but would immediately miss if removed. Every animation must serve one of three purposes: orient (show where something came from), focus (draw attention to what matters), or delight (reward an interaction). If it doesn't serve one of these, delete it.

## Core Library: Framer Motion

All patterns use Framer Motion. Import what you need:
```tsx
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
```

## Timing Constants

Define these as project constants in `src/lib/motion.ts`:

```tsx
// Timing
export const DURATION = {
  instant: 0.1,      // Micro-interactions (button press feedback)
  fast: 0.2,          // Hover states, toggles, small transitions
  normal: 0.35,       // Standard reveals, card transitions
  slow: 0.5,          // Section reveals, large element entrances
  dramatic: 0.8,      // Hero animations, page-level transitions
  stagger: 0.08,      // Delay between staggered children
  staggerSlow: 0.12,  // Delay for fewer, larger items
}

// Easing — these are the curves that make motion feel physical
export const EASE = {
  // Default for most animations — fast start, gentle landing
  out: [0.16, 1, 0.3, 1] as const,
  // For elements entering the viewport — slight anticipation
  reveal: [0.22, 1, 0.36, 1] as const,
  // For interactive elements — snappy, responsive
  snap: [0.25, 0.46, 0.45, 0.94] as const,
  // For dramatic entrances — slow build, smooth finish
  dramatic: [0.76, 0, 0.24, 1] as const,
  // For spring-like motion without actual spring physics
  bounce: [0.34, 1.56, 0.64, 1] as const,
  // Linear — only for progress bars and looping animations
  linear: [0, 0, 1, 1] as const,
}

// Viewport trigger thresholds
export const THRESHOLD = {
  eager: 0.05,    // Trigger almost immediately when element enters viewport
  normal: 0.2,    // Trigger when 20% visible (default for most reveals)
  patient: 0.4,   // Trigger when 40% visible (for important content)
  center: 0.5,    // Trigger at center of viewport
}
```

## Pattern 1: Section Reveal (Fade Up)

The most common and most important animation. Elements fade in and slide up slightly as they scroll into view.

```tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DURATION, EASE } from '@/lib/motion'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  className?: string
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  className
}: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0
      } : undefined}
      transition={{
        duration: DURATION.slow,
        ease: EASE.reveal,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Usage:
```tsx
<Reveal>
  <h2>This fades up into view</h2>
</Reveal>

<Reveal delay={0.1} direction="left">
  <Card>Slides in from left with delay</Card>
</Reveal>
```

## Pattern 2: Staggered Children

Multiple elements animate in sequence. The key is the stagger delay — too fast looks random, too slow feels sluggish.

```tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DURATION, EASE } from '@/lib/motion'

interface StaggerContainerProps {
  children: React.ReactNode
  stagger?: number
  className?: string
}

export function StaggerContainer({
  children,
  stagger = 0.08,
  className
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATION.normal,
            ease: EASE.reveal
          }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Usage:
```tsx
<StaggerContainer stagger={0.1} className="grid grid-cols-3 gap-6">
  <StaggerItem><Card>First</Card></StaggerItem>
  <StaggerItem><Card>Second</Card></StaggerItem>
  <StaggerItem><Card>Third</Card></StaggerItem>
</StaggerContainer>
```

## Pattern 3: Animated Counter (Numbers Counting Up)

Stats that count up when scrolled into view. The spring physics make the deceleration feel natural — fast at first, settling gently.

```tsx
'use client'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface CounterProps {
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  className
}: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    stiffness: 50,    // Lower = slower, smoother
    damping: 25,      // Higher = less bounce
    restDelta: 0.001
  })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) {
      motionValue.set(target)
    }
  }, [isInView, motionValue, target])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplay(
        latest.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      )
    })
    return unsubscribe
  }, [spring, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
```

### Usage:
```tsx
<AnimatedCounter target={200} suffix="+" className="text-5xl font-bold text-gold" />
<AnimatedCounter target={99.9} suffix="%" decimals={1} />
<AnimatedCounter target={3000} prefix="$" suffix="+" />
```

## Pattern 4: Text Reveal (Word by Word)

Heading text that reveals word by word. Extremely effective for hero headlines. Use sparingly — only on the primary H1, never on body copy.

```tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DURATION, EASE } from '@/lib/motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <motion.span
      ref={ref}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{
              duration: DURATION.slow,
              ease: EASE.reveal,
              delay: delay + i * 0.06,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
```

### Usage:
```tsx
<h1>
  <TextReveal text="Stop pulling reports." />
  <br />
  <TextReveal text="Start getting answers." delay={0.3} />
</h1>
```

## Pattern 5: Character Reveal (Letter by Letter)

More dramatic than word reveal. Use for a single short phrase — taglines, brand names, stat labels. Never for paragraphs.

```tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE } from '@/lib/motion'

export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.03
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span ref={ref} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.4,
            ease: EASE.reveal,
            delay: delay + i * stagger,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
```

## Pattern 6: Parallax Scroll

Elements that move at different speeds relative to scroll position. Creates depth without 3D.

```tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxProps {
  children: React.ReactNode
  speed?: number  // 0 = no movement, 1 = full scroll speed, negative = reverse
  className?: string
}

export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
```

### Usage:
```tsx
<div className="relative">
  <Parallax speed={0.2}>
    <div className="absolute -top-20 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
  </Parallax>
  <h2>Content stays fixed while background element drifts</h2>
</div>
```

## Pattern 7: Scroll-Driven Progress

A progress bar or indicator that fills based on scroll position. Great for page progress or section progress.

```tsx
'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#4E8AE6] origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}
```

## Pattern 8: Sticky Scroll Section

Content on one side stays pinned while content on the other side scrolls through multiple items. This is the pattern that makes sites feel like $50K builds.

```tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface StickyScrollProps {
  items: {
    label: string
    title: string
    description: string
    visual: React.ReactNode // What shows on the sticky side
  }[]
}

export function StickyScroll({ items }: StickyScrollProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={containerRef} style={{ height: `${items.length * 100}vh` }} className="relative">
      {/* Sticky visual side */}
      <div className="sticky top-0 h-screen w-1/2 float-right flex items-center justify-center p-12">
        {items.map((item, i) => {
          const start = i / items.length
          const end = (i + 1) / items.length
          return (
            <StickyVisual
              key={i}
              progress={scrollYProgress}
              start={start}
              end={end}
            >
              {item.visual}
            </StickyVisual>
          )
        })}
      </div>

      {/* Scrolling content side */}
      <div className="w-1/2 relative">
        {items.map((item, i) => (
          <div key={i} className="h-screen flex flex-col justify-center px-12">
            <span className="text-sm font-mono text-[#4E8AE6] mb-3">
              {item.label}
            </span>
            <h3 className="text-3xl font-semibold mb-4">{item.title}</h3>
            <p className="text-lg text-gray-600 max-w-md">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function StickyVisual({
  children,
  progress,
  start,
  end
}: {
  children: React.ReactNode
  progress: any
  start: number
  end: number
}) {
  const opacity = useTransform(
    progress,
    [start - 0.1, start, end - 0.1, end],
    [0, 1, 1, 0]
  )

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-12"
      style={{ opacity }}
    >
      {children}
    </motion.div>
  )
}
```

## Pattern 9: Hover Micro-Interactions

Cards and interactive elements that respond to hover with subtle depth and movement.

```tsx
// Card with lift + shadow deepening
export function HoverCard({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      style={{
        // Shadow transitions via CSS since Framer Motion doesn't animate shadows well
      }}
    >
      <style jsx>{`
        .hover-card {
          transition: box-shadow 0.2s ease;
        }
        .hover-card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
        }
      `}</style>
      <div className="hover-card">
        {children}
      </div>
    </motion.div>
  )
}

// Button with subtle scale + glow
export function HoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Link with underline slide-in
// Use CSS for this — more performant than JS animation
// .link-underline {
//   position: relative;
// }
// .link-underline::after {
//   content: '';
//   position: absolute;
//   bottom: -2px;
//   left: 0;
//   width: 0;
//   height: 1.5px;
//   background: currentColor;
//   transition: width 0.25s ease;
// }
// .link-underline:hover::after {
//   width: 100%;
// }
```

## Pattern 10: Page/Route Transitions

Smooth transitions between pages. Wrap your layout content.

```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { DURATION, EASE } from '@/lib/motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: DURATION.normal, ease: EASE.out }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

## Pattern 11: Scroll-Triggered Line Drawing

SVG paths that draw themselves as you scroll. Extremely premium feel for diagrams, flowcharts, or decorative elements.

```tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function DrawLine({
  d,
  className,
  strokeWidth = 2,
  color = '#4E8AE6'
}: {
  d: string
  className?: string
  strokeWidth?: number
  color?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 40%'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <svg ref={ref} className={className} viewBox="0 0 400 200">
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </svg>
  )
}
```

## Pattern 12: Marquee / Infinite Scroll

Logo bars, testimonial strips, or any content that scrolls infinitely. Pure CSS — no JS needed for performance.

```tsx
export function Marquee({
  children,
  speed = 30,
  direction = 'left',
  className
}: {
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}) {
  const animationDirection = direction === 'left' ? 'normal' : 'reverse'

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection,
        }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
```

## Anti-Patterns: NEVER Do These

1. **Bounce easing on content** — Spring physics are for interactive elements (buttons, toggles), never for section reveals. Content should ease in smoothly, not bounce.

2. **Animating everything** — If every element on the page animates, nothing feels special. Animate: headings, cards, stats, CTAs. Don't animate: body paragraphs, footers, nav links, breadcrumbs.

3. **Long delays** — No element should wait more than 0.5s to start animating after entering the viewport. Users don't wait.

4. **Scroll hijacking** — Never prevent native scroll behavior. Sticky sections are fine. Taking over the scrollbar is not.

5. **Animation on mobile that triggers repaints** — Avoid animating width, height, margin, padding on mobile. Stick to transform and opacity — they're GPU-accelerated.

6. **Replay animations** — Use `once: true` on all scroll-triggered animations. Elements should animate in once and stay. Re-triggering on scroll back feels buggy.

7. **Animating layout properties** — Never animate `display`, `position`, or `grid-template-columns`. Use `opacity` + `transform` for reveals, `height` for accordions (with overflow: hidden).

8. **Too much distance** — Elements should slide in from 20-40px away, not 100px+. Large distances make elements appear to "fly in" which feels amateurish.

## Performance Rules

- Keep total animated elements per viewport under 15
- Use `will-change: transform` sparingly (only on elements actively animating)
- Prefer CSS transitions for hover states over Framer Motion
- Test on mobile: if animations cause jank, reduce or disable them
- Use `useReducedMotion()` from Framer Motion to respect accessibility preferences:

```tsx
import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()
// Then conditionally disable animations
```

## Implementation Order

When building a page, add animations in this order:
1. Section reveals (fade up) — biggest impact, lowest risk
2. Staggered card grids — second biggest impact
3. Stat counters — high wow factor
4. Hero text reveal — sets the tone
5. Hover micro-interactions — polish layer
6. Parallax backgrounds — depth layer (optional)
7. Sticky scroll sections — premium feature (use sparingly, 1 per site max)
8. Route transitions — final polish
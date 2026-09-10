# INTERACTIVE.md — Premium Interactive Components & Micro-Interactions
# The components that make visitors interact, explore, and stay.

## Philosophy

Interactivity should reward curiosity. Every interactive element teaches the visitor something new about the product or creates a moment of delight. If an interaction doesn't serve one of those purposes, make it static instead. The best interactive components feel inevitable — like the only natural way to present that information.

## Pattern 1: Animated Tabs (Feature Showcase)

Tabs with smooth content transitions and an animated active indicator. The indicator slides between tabs instead of jumping.

```tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DURATION, EASE } from '@/lib/motion'

interface TabItem {
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

export function AnimatedTabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const tab = tabRefs.current[active]
    if (tab) {
      setIndicatorStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      })
    }
  }, [active])

  return (
    <div>
      {/* Tab bar */}
      <div className="relative border-b border-gray-200">
        <div className="flex gap-1">
          {items.map((item, i) => (
            <button
              key={i}
              ref={(el) => { tabRefs.current[i] = el }}
              onClick={() => setActive(i)}
              className={`
                relative px-5 py-3 text-sm font-medium transition-colors duration-200
                ${active === i ? 'text-[#4E8AE6]' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </button>
          ))}
        </div>
        {/* Sliding indicator */}
        <motion.div
          className="absolute bottom-0 h-[2px] bg-[#4E8AE6]"
          animate={indicatorStyle}
          transition={{ duration: DURATION.fast, ease: EASE.snap }}
        />
      </div>

      {/* Tab content with crossfade */}
      <div className="mt-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
          >
            {items[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
```

## Pattern 2: Smooth Accordion (FAQ / Feature Expansion)

Height animation that feels physical, not jarring. The key is animating max-height with overflow hidden, and using proper easing.

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  question: string
  answer: string
}

export function SmoothAccordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="text-base font-medium text-gray-800 group-hover:text-[#4E8AE6] transition-colors">
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400 flex-shrink-0 ml-4"
            >
              <ChevronDown size={18} />
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.2, delay: 0.05 }
                }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-gray-500 leading-relaxed pr-12">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
```

## Pattern 3: Hover Card with Preview

Card that reveals additional content on hover — a preview image, extra description, or action buttons. Desktop only; on mobile, show expanded state by default.

```tsx
'use client'
import { motion } from 'framer-motion'

export function PreviewCard({
  title,
  description,
  preview,
  href
}: {
  title: string
  description: string
  preview: React.ReactNode
  href: string
}) {
  return (
    <motion.a
      href={href}
      className="group block rounded-2xl border border-gray-200 bg-white overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Preview area — hidden by default, revealed on hover */}
      <div className="h-0 group-hover:h-48 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="p-4 h-48">
          {preview}
        </div>
      </div>

      {/* Always visible content */}
      <div className="p-6 border-t border-transparent group-hover:border-gray-100 transition-colors">
        <h3 className="font-semibold text-gray-800 group-hover:text-[#4E8AE6] transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </motion.a>
  )
}
```

## Pattern 4: Scroll-Triggered Progress Steps

Steps that fill/activate as the user scrolls through a section. Each step lights up when its content enters the viewport.

```tsx
'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Step {
  number: string
  title: string
  description: string
}

export function ProgressSteps({ steps }: { steps: Step[] }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 40%'],
  })

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical progress line */}
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-200">
        <motion.div
          className="w-full bg-[#4E8AE6] origin-top"
          style={{ scaleY: scrollYProgress }}
        />
      </div>

      <div className="space-y-16 pl-16">
        {steps.map((step, i) => {
          const stepProgress = useTransform(
            scrollYProgress,
            [(i) / steps.length, (i + 0.5) / steps.length],
            [0, 1]
          )

          return (
            <StepItem key={i} step={step} progress={stepProgress} />
          )
        })}
      </div>
    </div>
  )
}

function StepItem({ step, progress }: { step: Step; progress: any }) {
  const opacity = useTransform(progress, [0, 1], [0.3, 1])
  const dotScale = useTransform(progress, [0, 1], [0.6, 1])

  return (
    <motion.div style={{ opacity }} className="relative">
      {/* Step dot */}
      <motion.div
        className="absolute -left-[52px] top-1 w-4 h-4 rounded-full bg-[#4E8AE6] border-4 border-white shadow-sm"
        style={{ scale: dotScale }}
      />

      <span className="text-sm font-mono text-[#4E8AE6]">{step.number}</span>
      <h3 className="text-xl font-semibold text-gray-800 mt-1">{step.title}</h3>
      <p className="text-gray-500 mt-2 max-w-md">{step.description}</p>
    </motion.div>
  )
}
```

## Pattern 5: Comparison Toggle (Before/After or Monthly/Annual)

Toggle between two states with smooth crossfade. Use for pricing switches, before/after comparisons, or feature comparisons.

```tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function ComparisonToggle({
  labelA,
  labelB,
  contentA,
  contentB
}: {
  labelA: string
  labelB: string
  contentA: React.ReactNode
  contentB: React.ReactNode
}) {
  const [isB, setIsB] = useState(false)

  return (
    <div>
      {/* Toggle switch */}
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm font-medium transition-colors ${!isB ? 'text-gray-800' : 'text-gray-400'}`}>
          {labelA}
        </span>
        <button
          onClick={() => setIsB(!isB)}
          className="relative w-12 h-6 rounded-full bg-gray-200 transition-colors"
          style={{ backgroundColor: isB ? '#4E8AE6' : '#E5E7EB' }}
        >
          <motion.div
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
            animate={{ left: isB ? 28 : 4 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </button>
        <span className={`text-sm font-medium transition-colors ${isB ? 'text-gray-800' : 'text-gray-400'}`}>
          {labelB}
        </span>
      </div>

      {/* Content */}
      <div className="mt-8 relative">
        <motion.div
          animate={{ opacity: isB ? 0 : 1, y: isB ? -10 : 0 }}
          transition={{ duration: 0.2 }}
          className={isB ? 'pointer-events-none absolute inset-0' : ''}
        >
          {contentA}
        </motion.div>
        <motion.div
          animate={{ opacity: isB ? 1 : 0, y: isB ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className={!isB ? 'pointer-events-none absolute inset-0' : ''}
        >
          {contentB}
        </motion.div>
      </div>
    </div>
  )
}
```

## Pattern 6: Tooltip with Rich Content

Hover tooltip that shows extra context — not just text, but small cards, images, or mini-data.

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function RichTooltip({
  trigger,
  content,
  position = 'top'
}: {
  trigger: React.ReactNode
  content: React.ReactNode
  position?: 'top' | 'bottom'
}) {
  const [isOpen, setIsOpen] = useState(false)

  const positionClass = position === 'top'
    ? 'bottom-full mb-2'
    : 'top-full mt-2'

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 4 : -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === 'top' ? 4 : -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${positionClass} left-1/2 -translate-x-1/2 z-50 w-64 p-4 bg-white rounded-xl shadow-lg border border-gray-200`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
```

## Pattern 7: Notification / Toast Animation

For form submissions, success states, or live data updates.

```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'

export function Toast({
  message,
  isVisible,
  onClose
}: {
  message: string
  isVisible: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white rounded-xl shadow-lg border border-gray-200 px-5 py-4"
        >
          <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700">{message}</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-2">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

## Pattern 8: Logo Carousel / Client Bar

Scrolling logo bar that shows trust badges. Pure CSS for performance.

```tsx
export function LogoCarousel({
  logos
}: {
  logos: { name: string; src: string }[]
}) {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-16 animate-scroll whitespace-nowrap">
        {/* Double the logos for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.name}
            className="h-8 opacity-40 hover:opacity-70 transition-opacity grayscale hover:grayscale-0"
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
```

## Interaction Budget

Every page has a limited attention budget. Allocate interactivity carefully:

- **Homepage:** 3-4 interactive elements max (hero animation, tab showcase, stat counters, FAQ accordion)
- **Product page:** 4-5 elements (tabs, sticky scroll, expandable features, FAQ)
- **About page:** 1-2 elements (team hover cards, timeline)
- **Contact page:** 1 element (form with validation feedback)
- **Blog:** 0-1 elements (reading progress bar)

If you add more interactivity than this, the page feels like a tech demo instead of a product.

## Performance Checklist

Before shipping any interactive component:
- [ ] Does it work without JavaScript? (Progressive enhancement — content should be visible even if JS fails)
- [ ] Does it respect `prefers-reduced-motion`?
- [ ] Is hover behavior replicated with focus states for keyboard users?
- [ ] Does it have appropriate ARIA attributes?
- [ ] Is animation duration under 500ms for interactive feedback?
- [ ] Does it avoid layout shifts when content changes size?
- [ ] Is it tested on mobile (touch) and desktop (mouse)?
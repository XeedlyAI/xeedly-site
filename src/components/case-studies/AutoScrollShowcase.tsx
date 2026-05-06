"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { BrowserMockup } from "./BrowserMockup";

type AutoScrollShowcaseProps = {
  src: string;
  alt: string;
  url: string;
  width: number;
  height: number;
  viewportHeight?: number;
  scrollDuration?: number;
  variant?: "light" | "dark";
  className?: string;
};

export function AutoScrollShowcase({
  src,
  alt,
  url,
  width,
  height,
  viewportHeight = 520,
  scrollDuration = 18,
  variant = "dark",
  className = "",
}: AutoScrollShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);

  const imageRef = useCallback((node: HTMLImageElement | null) => {
    if (!node) return;
    const measure = () => setImageHeight(node.offsetHeight);
    if (node.complete) {
      measure();
    } else {
      node.addEventListener("load", measure, { once: true });
    }
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const scrollDistance = Math.max(0, imageHeight - viewportHeight);

  return (
    <div ref={containerRef} className={className}>
      <BrowserMockup url={url} variant={variant}>
        <div
          className="relative overflow-hidden cursor-pointer group"
          style={{ height: viewportHeight }}
          onClick={() => setIsPaused((p) => !p)}
          role="button"
          tabIndex={0}
          aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsPaused((p) => !p);
            }
          }}
        >
          <motion.div
            animate={
              isInView && !isPaused && scrollDistance > 0
                ? { y: [0, -scrollDistance, -scrollDistance, 0] }
                : { y: 0 }
            }
            transition={
              isInView && !isPaused && scrollDistance > 0
                ? {
                    y: {
                      duration: scrollDuration,
                      times: [0, 0.42, 0.58, 1],
                      ease: "easeInOut",
                      repeat: Infinity,
                    },
                  }
                : undefined
            }
            style={{ width: "100%" }}
          >
            <Image
              ref={imageRef}
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-auto"
              quality={90}
              priority
            />
          </motion.div>

          {/* Pause indicator */}
          <motion.div
            initial={false}
            animate={{ opacity: isPaused ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ background: "rgba(0,0,0,0.3)" }}
          >
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden>
                <path d="M2 1l16 11L2 23V1z" fill="#0f172a" />
              </svg>
            </div>
          </motion.div>

          {/* Top/bottom fade edges */}
          <div
            className="absolute inset-x-0 top-0 h-8 pointer-events-none"
            style={{
              background: variant === "dark"
                ? "linear-gradient(to bottom, #1e1e2e, transparent)"
                : "linear-gradient(to bottom, #ffffff, transparent)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
            style={{
              background: variant === "dark"
                ? "linear-gradient(to top, #1e1e2e, transparent)"
                : "linear-gradient(to top, #ffffff, transparent)",
            }}
          />
        </div>
      </BrowserMockup>
    </div>
  );
}

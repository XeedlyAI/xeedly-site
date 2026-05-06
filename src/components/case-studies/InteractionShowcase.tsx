"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BrowserMockup } from "./BrowserMockup";

type InteractionShowcaseProps = {
  /** Path to MP4/WebM video or GIF. */
  src: string;
  poster?: string;
  url: string;
  /** Visible viewport height inside the browser frame (px). */
  viewportHeight?: number;
  variant?: "light" | "dark";
  className?: string;
  caption?: string;
};

export function InteractionShowcase({
  src,
  poster,
  url,
  viewportHeight = 520,
  variant = "dark",
  className = "",
  caption,
}: InteractionShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const isGif = src.endsWith(".gif");

  return (
    <div ref={containerRef} className={className}>
      <BrowserMockup url={url} variant={variant}>
        <div
          className="relative overflow-hidden"
          style={{ height: viewportHeight }}
        >
          {isGif ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-top"
                onClick={togglePlay}
              />

              {/* Play/pause overlay */}
              <motion.button
                initial={false}
                animate={{ opacity: isPlaying ? 0 : 1 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                style={{ background: "rgba(0,0,0,0.3)" }}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  {isPlaying ? (
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden>
                      <rect x="2" y="2" width="6" height="20" rx="1" fill="#0f172a" />
                      <rect x="12" y="2" width="6" height="20" rx="1" fill="#0f172a" />
                    </svg>
                  ) : (
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden>
                      <path d="M2 1l16 11L2 23V1z" fill="#0f172a" />
                    </svg>
                  )}
                </div>
              </motion.button>
            </>
          )}
        </div>
      </BrowserMockup>

      {caption && (
        <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#64748b]">
          {caption}
        </p>
      )}
    </div>
  );
}

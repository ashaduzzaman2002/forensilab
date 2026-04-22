"use client";

import { useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MarqueeWrapper({ children, trackClassName = "", className = "", dark = false }: { children: React.ReactNode; trackClassName?: string; className?: string; dark?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const speedRef = useRef(0.5);
  const pausedRef = useRef(false);

  // Infinite auto-scroll via requestAnimationFrame + seamless loop reset
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Wait a frame for children to render so scrollWidth is accurate
    const init = requestAnimationFrame(() => {
      const half = el.scrollWidth / 2;
      if (half === 0) return;

      const tick = () => {
        if (!pausedRef.current) {
          el.scrollLeft += speedRef.current;
          // seamless reset: when we've scrolled past the first copy, jump back
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          if (el.scrollLeft <= 0) el.scrollLeft += half;
        }
        animRef.current = requestAnimationFrame(tick);
      };
      animRef.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(init);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleManualScroll = useCallback((dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    // Temporarily boost speed in the desired direction for a smooth scroll
    const originalSpeed = speedRef.current;
    speedRef.current = dir * 4;
    setTimeout(() => { speedRef.current = originalSpeed; }, 500);
  }, []);

  const btnClass = dark
    ? "border-white/20 bg-white/10 hover:bg-white/20 text-white"
    : "border-border bg-white hover:bg-gray-50 text-foreground";

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        className="overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
      >
        <div className={`flex ${trackClassName}`} style={{ width: "max-content" }}>
          {children}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={() => handleManualScroll(-1)} aria-label="Scroll left"
          className={`rounded-full border p-2.5 shadow-sm transition-colors ${btnClass}`}>
          <ChevronLeft className="size-4" />
        </button>
        <button onClick={() => handleManualScroll(1)} aria-label="Scroll right"
          className={`rounded-full border p-2.5 shadow-sm transition-colors ${btnClass}`}>
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

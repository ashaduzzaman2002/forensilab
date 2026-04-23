"use client";

import { useRef, useEffect } from "react";

export function MarqueeWrapper({ children, trackClassName = "", className = "" }: { children: React.ReactNode; trackClassName?: string; className?: string; dark?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const speedRef = useRef(0.5);
  const pausedRef = useRef(false);
  const touchRef = useRef({ startX: 0, lastX: 0, velocity: 0, ts: 0 });
  const momentumRef = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const init = requestAnimationFrame(() => {
      const half = el.scrollWidth / 2;
      if (half === 0) return;

      const tick = () => {
        if (!pausedRef.current) {
          el.scrollLeft += speedRef.current;
        }
        // apply momentum decay
        if (Math.abs(touchRef.current.velocity) > 0.2) {
          el.scrollLeft -= touchRef.current.velocity;
          touchRef.current.velocity *= 0.95;
        } else {
          touchRef.current.velocity = 0;
        }
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        if (el.scrollLeft <= 0) el.scrollLeft += half;
        animRef.current = requestAnimationFrame(tick);
      };
      animRef.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(init);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    pausedRef.current = true;
    touchRef.current.velocity = 0;
    touchRef.current.startX = e.touches[0].clientX;
    touchRef.current.lastX = e.touches[0].clientX;
    touchRef.current.ts = Date.now();
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!scrollRef.current) return;
    const x = e.touches[0].clientX;
    const dx = x - touchRef.current.lastX;
    scrollRef.current.scrollLeft -= dx;
    touchRef.current.lastX = x;
    const now = Date.now();
    const dt = now - touchRef.current.ts || 1;
    touchRef.current.velocity = dx / dt * 16; // normalize to ~frame
    touchRef.current.ts = now;
  }

  function onTouchEnd() {
    pausedRef.current = false;
  }

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        className="overflow-hidden select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={`flex ${trackClassName}`} style={{ width: "max-content" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

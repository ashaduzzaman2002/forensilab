"use client";

import { useRef, useEffect } from "react";

export function MarqueeWrapper({ children, trackClassName = "", className = "" }: { children: React.ReactNode; trackClassName?: string; className?: string; dark?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const speedRef = useRef(0.5);
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, lastX: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const init = requestAnimationFrame(() => {
      const half = el.scrollWidth / 2;
      if (half === 0) return;

      const tick = () => {
        if (!pausedRef.current) {
          el.scrollLeft += speedRef.current;
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

  function onPointerDown(e: React.PointerEvent) {
    pausedRef.current = true;
    dragRef.current = { active: true, lastX: e.clientX };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current.active || !scrollRef.current) return;
    scrollRef.current.scrollLeft -= e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;
  }

  function onPointerUp() {
    dragRef.current.active = false;
    pausedRef.current = false;
  }

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className={`flex ${trackClassName}`} style={{ width: "max-content" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

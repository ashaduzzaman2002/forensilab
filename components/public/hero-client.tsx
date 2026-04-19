"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value);
    if (isNaN(num)) { setDisplay(value); return; }
    const suffix = value.replace(/[\d]/g, "");
    const duration = 1500;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), num);
      setDisplay(current + suffix);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-right">
      <div className="font-heading text-[38px] font-[800] leading-none text-white max-md:text-[28px]">{display}</div>
      <div className="mt-[3px] text-[11px] tracking-[0.06em] text-white/50">{label}</div>
    </div>
  );
}

interface Stat {
  value: string;
  label: string;
}

interface HeroData {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  stats: Stat[];
}

export function HeroClient({ data }: { data: HeroData }) {
  return (
    <section id="hero" className="relative -mt-[60px] flex h-screen items-center overflow-hidden px-[60px] pb-[100px] md:pt-[120px] max-md:px-6 max-md:pb-[90px]"
      style={{ background: "linear-gradient(135deg, #0A0A1A 0%, #0A1A40 45%, #0557EE 100%)" }}
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute -right-[150px] -top-[150px] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,87,255,.35) 0%, transparent 70%)" }}
      />

      <div className="relative z-10">
        {data.badge && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-[7px] rounded-full border border-white/[0.14] bg-white/[0.08] px-[14px] py-[5px] text-[11px] uppercase tracking-[0.06em] text-white/70"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-[#4AFF8C]" />
            {data.badge}
          </motion.div>
        )}

        <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          className="font-heading text-[clamp(56px,8vw,80px)] leading-none tracking-[-2px] text-white"
        >
          {data.headingLine1}<br />
          <span className="text-[#3378FF]">{data.headingLine2}</span>
          {data.headingLine3 && <><br />{data.headingLine3}</>}
        </motion.h1>

        <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-9 mt-5 max-w-[460px] text-[17px] font-light leading-[1.7] text-white/60"
        >
          {data.description}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-[14px]"
        >
          <Link href={data.primaryBtnLink}
            className="rounded-full bg-white px-7 py-3 text-[13px] font-semibold text-[#0057FF] transition hover:-translate-y-px hover:bg-[#f0f4ff]"
          >
            {data.primaryBtnText}
          </Link>
          <Link href={data.secondaryBtnLink}
            className="rounded-full border-[1.5px] border-white/40 bg-transparent px-7 py-3 text-[13px] font-medium text-white transition hover:border-white/80 hover:bg-white/[0.07]"
          >
            {data.secondaryBtnText}
          </Link>
        </motion.div>
      </div>

      {/* Stats */}
      {data.stats.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[60px] right-[60px] flex gap-11 max-md:bottom-10 max-md:right-6 max-md:gap-6"
        >
          {data.stats.map((s, i) => (
            <AnimatedStat key={i} value={s.value} label={s.label} />
          ))}
        </motion.div>
      )}
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface Testimonial { name: string; role: string; text: string }

export function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-[#111] px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-14 flex flex-wrap items-end justify-between gap-5"
      >
        <div>
          <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            <span className="block h-[2px] w-[22px] bg-white/30" />What They Say
          </div>
          <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-white">
            Client<br />Testimonials
          </h2>
        </div>
        <p className="max-w-[300px] text-[15px] leading-[1.7] text-white/50 max-md:text-left md:text-right">
          Trusted feedback from our partners across insurance, law enforcement, and corporate India.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="relative"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-[-60px] z-10 w-20 bg-gradient-to-r from-[#111] to-transparent max-md:left-[-24px]" />
        <div className="pointer-events-none absolute inset-y-0 right-[-60px] z-10 w-20 bg-gradient-to-l from-[#111] to-transparent max-md:right-[-24px]" />

        <div className="marquee-track flex gap-6 hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
          {doubled.map((t, i) => (
            <div key={i} className="w-[360px] shrink-0 rounded-[10px] border border-white/[0.08] bg-white/[0.05] p-8">
              <div className="font-heading text-[28px] font-[800] leading-none text-primary">&ldquo;</div>
              <p className="mt-4 text-[14px] leading-[1.75] text-white/70">{t.text}</p>
              <div className="mt-6 flex items-center gap-[14px]">
                <div className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-primary font-heading text-[14px] font-bold text-white">
                  {t.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-heading text-[13px] font-bold text-white">{t.name}</div>
                  <div className="mt-[2px] text-[11px] text-white/45">{t.role}</div>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold tracking-[0.06em] text-[#4AFF8C]">
                    <span className="text-[9px]">✓</span> Verified Client
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

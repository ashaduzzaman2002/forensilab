"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./section-heading";
import { MarqueeWrapper } from "./marquee-wrapper";

interface Item { slug: string; tag?: string; badge?: string; title: string; description: string; image?: string; gradient?: string }

export function CaseStudiesClient({ items }: { items: Item[] }) {
  return (
    <section id="cases" className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <SectionHeading
        label="Our Work"
        title={<>Case Studies &amp;<br />Industry Insights</>}
        description="Explore how our forensic expertise has delivered critical results across high-profile investigations."
      />

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:hidden"
      >
        {items.map((c, i) => (
          <div key={i} className="group flex flex-col overflow-hidden rounded-[10px] border border-border bg-white transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,87,255,.1)]">
            <div className="relative flex h-[180px] items-center justify-center" style={{ background: c.gradient || "linear-gradient(135deg,#0A1A40,#0057FF)" }}>
              {c.image && <Image src={c.image} alt={c.title} fill unoptimized className="object-cover" />}
              {c.badge && (
                <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-white/15 px-[10px] py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[4px]">
                  {c.badge}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              {c.tag && <div className="mb-[10px] text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{c.tag}</div>}
              <h3 className="font-heading text-[17px] font-bold tracking-[-0.3px] text-foreground">{c.title}</h3>
              <p className="mt-[10px] flex-1 text-[13px] leading-[1.65] text-gray-500">{c.description}</p>
              <Link href={`/case-studies/${c.slug}`} className="mt-[18px] inline-flex items-center gap-[6px] text-[12px] font-semibold tracking-[0.02em] text-primary transition-[gap] duration-200 hover:gap-[10px]">
                View Case Study →
              </Link>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Mobile marquee */}
      <div className="relative overflow-hidden md:hidden -mx-6">
        <MarqueeWrapper trackClassName="gap-4">
          {[...items, ...items].map((c, i) => (
            <div key={i} className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-border bg-white">
              <div className="relative flex h-[180px] items-center justify-center" style={{ background: c.gradient || "linear-gradient(135deg,#0A1A40,#0057FF)" }}>
                {c.image && <Image src={c.image} alt={c.title} fill unoptimized className="object-cover" />}
                {c.badge && (
                  <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-white/15 px-[10px] py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[4px]">
                    {c.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                {c.tag && <div className="mb-[10px] text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{c.tag}</div>}
                <h3 className="font-heading text-[17px] font-bold tracking-[-0.3px] text-foreground">{c.title}</h3>
                <p className="mt-[10px] flex-1 text-[13px] leading-[1.65] text-gray-500 line-clamp-3">{c.description}</p>
                <Link href={`/case-studies/${c.slug}`} className="mt-[18px] inline-flex items-center gap-[6px] text-[12px] font-semibold tracking-[0.02em] text-primary">
                  View Case Study →
                </Link>
              </div>
            </div>
          ))}
        </MarqueeWrapper>
      </div>
    </section>
  );
}

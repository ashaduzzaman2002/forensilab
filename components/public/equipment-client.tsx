"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Item { badge?: string; category: string; name: string; description: string; image?: string }

export function EquipmentClient({ items }: { items: Item[] }) {
  return (
    <section className="bg-[#F5F7FA] px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-14 flex flex-wrap items-end justify-between gap-5"
      >
        <div>
          <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="block h-[2px] w-[22px] bg-primary" />Our Laboratory
          </div>
          <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
            Glimpses to<br />Laboratory
          </h2>
        </div>
        <p className="max-w-[300px] text-[14px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
          State-of-the-art instruments and equipment powering every investigation we undertake.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-4 gap-[18px] max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {items.map((item, i) => (
          <div key={i} className="group overflow-hidden rounded-lg border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_10px_36px_rgba(0,87,255,.1)]">
            <div className="relative flex aspect-[4/3] items-center justify-center bg-[#E8F0FF]">
              {item.image && <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" />}
              {item.badge && (
                <span className="absolute left-[10px] top-[10px] rounded-full bg-primary px-[9px] py-[3px] text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="px-5 py-[18px]">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">{item.category}</div>
              <h3 className="mt-[5px] font-heading text-sm font-bold text-foreground">{item.name}</h3>
              <p className="mt-[5px] text-[11px] leading-[1.5] text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}

        {/* More Equipment CTA card */}
        <div className="flex overflow-hidden rounded-lg border border-primary bg-primary flex-col">
          <div className="flex aspect-[4/3] items-center justify-center bg-white/10">
            <span className="text-[46px] opacity-50">➕</span>
          </div>
          <div className="px-5 py-[18px]">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55">And More</div>
            <h3 className="mt-[5px] font-heading text-sm font-bold text-white">More Equipment</h3>
            <p className="mt-[5px] text-[11px] leading-[1.5] text-white/55">Contact us to learn about our full range of specialized instruments.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

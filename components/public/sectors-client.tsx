"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Sector { image?: string; name: string; description: string }

export function SectorsClient({ items }: { items: Sector[] }) {
  return (
    <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-14 flex flex-wrap items-end justify-between gap-5"
      >
        <div>
          <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="block h-[2px] w-[22px] bg-primary" />Our Reach
          </div>
          <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
            Sectors We<br />Serve
          </h2>
        </div>
        <p className="max-w-[320px] text-[15px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
          From law enforcement to corporate boardrooms, our expertise spans every critical industry.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-4 gap-[2px] bg-border max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {items.map((s, i) => (
          <div key={i} className="group flex min-h-[200px] cursor-default flex-col justify-between bg-white p-7 transition-all duration-300 hover:bg-primary">
            <div className="flex items-start justify-between">
              <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-[9px] bg-[#E8F0FF] transition-all group-hover:bg-white/15">
                {s.image && <Image src={s.image} alt={s.name} fill unoptimized className="object-contain p-1.5" />}
              </div>
              <span className="font-heading text-[28px] font-[800] leading-none text-border transition-colors group-hover:text-white/15">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-5">
              <h3 className="font-heading text-base font-bold tracking-[-0.3px] text-foreground transition-colors group-hover:text-white/90">
                {s.name}
              </h3>
              <p className="mt-[7px] text-xs leading-[1.6] text-gray-500 transition-colors group-hover:text-white/60">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { MarqueeWrapper } from "./marquee-wrapper";

interface Sector { image?: string; name: string; description: string }

export function SectorsClient({ items }: { items: Sector[] }) {
  return (
    <section id="sectors" className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <SectionHeading
        label="Our Reach"
        title={<>Sectors We<br />Serve</>}
        description="From law enforcement to corporate boardrooms, our expertise spans every critical industry."
      />

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-4 gap-[2px] max-md:hidden"
      >
        {items.map((s, i) => (
          <div key={i} className="group flex min-h-[200px] rounded-[10px] overflow-hidden cursor-default flex-col justify-between bg-white p-7 transition-all duration-300 hover:bg-primary">
            <div className="flex items-start justify-between">
              <div className="relative flex size-12 items-center justify-center overflow-hidden">
                {s.image && <Image src={s.image} alt={s.name} fill unoptimized className="object-contain" />}
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

      {/* Mobile marquee */}
      <div className="relative overflow-hidden md:hidden -mx-6">
        <MarqueeWrapper trackClassName="gap-4">
          {[...items, ...items].map((s, i) => (
            <div key={i} className="group flex min-h-[200px] w-[320px] shrink-0 cursor-default flex-col justify-between rounded-[10px] bg-[#F5F7FA] p-7">
              <div className="flex items-start justify-between">
                <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-[9px] bg-[#E8F0FF]">
                  {s.image && <Image src={s.image} alt={s.name} fill unoptimized className="object-contain p-1.5" />}
                </div>
                <span className="font-heading text-[28px] font-[800] leading-none text-border">
                  {String((i % items.length) + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5">
                <h3 className="font-heading text-base font-bold tracking-[-0.3px] text-foreground">{s.name}</h3>
                <p className="mt-[7px] text-xs leading-[1.6] text-gray-500">{s.description}</p>
              </div>
            </div>
          ))}
        </MarqueeWrapper>
      </div>
    </section>
  );
}

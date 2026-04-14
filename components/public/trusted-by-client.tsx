"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Item { name: string; logo: string; link: string }

export function TrustedByClient({ items }: { items: Item[] }) {
  const doubled = [...items, ...items];

  return (
    <section className="overflow-hidden px-[60px] pb-[100px] pt-10 max-md:px-6 max-md:pb-[72px]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-14 flex flex-wrap items-end justify-between gap-5"
      >
        <div>
          <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="block h-[2px] w-[22px] bg-primary" />Our Network
          </div>
          <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
            Trusted By
          </h2>
        </div>
        <p className="max-w-[320px] text-[15px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
          Partnering with leading organisations in insurance, government, and corporate India.
        </p>
      </motion.div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-[-60px] z-10 w-20 bg-gradient-to-r from-blue-50/80 to-transparent max-md:left-[-24px]" />
        <div className="pointer-events-none absolute inset-y-0 right-[-60px] z-10 w-20 bg-gradient-to-l from-blue-50/80 to-transparent max-md:right-[-24px]" />

        <div className="marquee-track flex gap-[2px] hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
          {doubled.map((item, i) => {
            const content = (
              <div className="flex h-[80px] w-[200px] shrink-0 items-center justify-center border border-border bg-white px-5 transition-colors duration-200 hover:bg-[#E8F0FF]">
                {item.logo ? (
                  <Image src={item.logo} alt={item.name} width={140} height={40} unoptimized className="h-10 w-auto object-contain" />
                ) : (
                  <span className="font-heading text-[13px] font-bold text-foreground text-center transition-colors">{item.name}</span>
                )}
              </div>
            );
            return item.link ? (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">{content}</a>
            ) : (
              <div key={i}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

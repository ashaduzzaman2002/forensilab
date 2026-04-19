"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./section-heading";

interface Item { badge?: string; category: string; name: string; description: string; image?: string }

export function EquipmentClient({ items }: { items: Item[] }) {
  // Duplicate for seamless infinite loop
  const track = [...items, ...items];

  return (
    <section id="glimpses" className="bg-[#F5F7FA] px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <SectionHeading
        label="Our Laboratory"
        title={<>Glimpses to<br />Laboratory</>}
        description="State-of-the-art instruments and equipment powering every investigation we undertake."
      />

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F5F7FA] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F5F7FA] to-transparent" />

        <div className="marquee-track flex gap-[18px] hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
          {track.map((item, i) => (
            <div key={i} className="w-[280px] shrink-0 overflow-hidden rounded-[10px] border border-border bg-white transition-colors duration-300 hover:border-primary">
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
        </div>
      </div>
    </section>
  );
}

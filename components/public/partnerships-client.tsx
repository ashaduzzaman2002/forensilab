"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";

interface Item {
  name: string;
  subtitle?: string;
  type: string;
}

export function PartnershipsClient({ items }: { items: Item[] }) {
  const [tab, setTab] = useState<"mou" | "moa">("mou");
  const filtered = items.filter((i) => i.type === tab);

  return (
    <section
      id="partners"
      className="bg-[#F5F7FA] px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading
          reversed
          label="Academic Partnerships"
          title={<>MOUs &amp; MOAs</>}
          description="Collaborating with top academic institutions to advance forensic science research and training."
        />

        <div className="mb-9 flex gap-[2px]">
          {(["mou", "moa"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-[22px] py-[9px] text-[12px] font-medium transition-colors ${tab === t ? "bg-primary text-white" : "bg-white text-gray-500 hover:text-foreground"}`}
            >
              {t === "mou" ? "MOUs" : "MOAs"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-[2px] max-md:grid-cols-2 max-sm:hidden">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="flex min-h-[110px] items-center justify-center border border-border bg-white p-9"
            >
              <div className="text-center">
                <div className="font-heading text-[14px] font-bold text-foreground">
                  {item.name}
                </div>
                {item.subtitle && (
                  <div className="mt-1 text-[10px] text-gray-500">
                    {item.subtitle}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile marquee */}
        <div className="relative overflow-hidden sm:hidden -mx-6">
          <div className="marquee-track flex gap-4 hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
            {[...filtered, ...filtered].map((item, i) => (
              <div key={i} className="flex min-h-[110px] w-[260px] shrink-0 items-center justify-center rounded-[10px] border border-border bg-white p-9">
                <div className="text-center">
                  <div className="font-heading text-[14px] font-bold text-foreground">{item.name}</div>
                  {item.subtitle && <div className="mt-1 text-[10px] text-gray-500">{item.subtitle}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

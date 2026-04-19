"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

interface Item { _id?: string; caseId: string; scene: string; date: string; image: string; }

export function GalleryClient({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState<Item | null>(null);

  if (items.length === 0) return <section className="px-[60px] py-[100px] text-center text-gray-500 max-md:px-6">No records yet.</section>;

  return (
    <>
      {/* Gallery Grid */}
      <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-5"
        >
          <div>
            <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="block h-[2px] w-[22px] bg-primary" />Case Files
            </div>
            <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
              Evidence<br />Gallery
            </h2>
          </div>
          <p className="max-w-[320px] text-[15px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
            Documented forensic evidence and scene records from our investigations.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-4 gap-[2px] bg-border max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
        >
          {items.map((c, i) => (
            <div key={i} onClick={() => setSelected(c)} className="group flex min-h-[280px] cursor-pointer flex-col overflow-hidden bg-white transition-all duration-300 hover:bg-primary">
              {c.image ? (
                <div className="relative h-[180px] overflow-hidden">
                  <Image src={c.image} alt={c.scene} fill unoptimized className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-white/15 px-[10px] py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[4px]">
                    {c.caseId}
                  </span>
                </div>
              ) : (
                <div className="flex h-[180px] items-center justify-center bg-[#E8F0FF]">
                  <span className="font-heading text-[28px] font-[800] text-primary/20">{c.caseId}</span>
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between p-5">
                <h3 className="font-heading text-base font-bold tracking-[-0.3px] text-foreground transition-colors group-hover:text-white/90">
                  {c.scene}
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-500 transition-colors group-hover:text-white/60">
                  <CalendarDays className="size-3" />{c.date}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative max-h-[85vh] max-w-4xl w-full overflow-hidden rounded-[10px] bg-white" onClick={e => e.stopPropagation()}>
            {selected.image && (
              <div className="relative h-[60vh]">
                <Image src={selected.image} alt={selected.scene} fill unoptimized className="object-contain bg-black" />
              </div>
            )}
            <div className="p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{selected.caseId}</div>
              <h3 className="mt-1 font-heading text-lg font-bold">{selected.scene}</h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500"><CalendarDays className="size-3.5" />{selected.date}</div>
            </div>
            <button onClick={() => setSelected(null)} className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold shadow backdrop-blur-sm hover:bg-white">✕</button>
          </motion.div>
        </div>
      )}
    </>
  );
}

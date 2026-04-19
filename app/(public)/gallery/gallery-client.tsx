"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/public/section-heading";

interface Item { _id?: string; title: string; description: string; image: string; }

export function GalleryClient({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState<Item | null>(null);

  if (items.length === 0) return <section className="px-[60px] py-[100px] text-center text-gray-500 max-md:px-6">No records yet.</section>;

  return (
    <>
      <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
        <SectionHeading
          label="Case Files"
          title={<>Evidence<br />Gallery</>}
          description="Documented forensic evidence and scene records from our investigations."
        />

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1"
        >
          {items.map((c, i) => (
            <div key={i} onClick={() => setSelected(c)} className="group flex cursor-pointer flex-col overflow-hidden rounded-[10px] border border-border bg-white transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,87,255,.1)]">
              <div className="relative flex h-[180px] items-center justify-center bg-[#E8F0FF]">
                {c.image && <Image src={c.image} alt={c.title} fill unoptimized className="object-cover" />}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-[17px] font-bold tracking-[-0.3px] text-foreground">{c.title}</h3>
                {c.description && <p className="mt-[10px] text-[13px] leading-[1.65] text-gray-500">{c.description}</p>}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative max-h-[85vh] max-w-4xl w-full overflow-hidden rounded-[10px] bg-white" onClick={e => e.stopPropagation()}>
            {selected.image && (
              <div className="relative h-[60vh]">
                <Image src={selected.image} alt={selected.title} fill unoptimized className="object-contain bg-black" />
              </div>
            )}
            <div className="p-6">
              <h3 className="font-heading text-lg font-bold">{selected.title}</h3>
              {selected.description && <p className="mt-2 text-sm text-gray-500">{selected.description}</p>}
            </div>
            <button onClick={() => setSelected(null)} className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold shadow backdrop-blur-sm hover:bg-white">✕</button>
          </motion.div>
        </div>
      )}
    </>
  );
}

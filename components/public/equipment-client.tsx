"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./animated-section";
import { SectionHeading } from "./section-heading";

interface Item { name: string; category: string; description: string; image: string; }

export function EquipmentClient({ items }: { items: Item[] }) {
  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter(d => d.category === active);

  return (
    <AnimatedSection>
      <section className="relative overflow-hidden py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Forensic Divisions & Equipment" subtitle="State-of-the-art laboratories equipped with cutting-edge technology across all forensic disciplines" />

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} className={`rounded-full px-6 py-2 text-sm font-medium tracking-wide transition-all ${active === cat ? "bg-primary text-primary-foreground shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"}`}>
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((d, i) => (
                <motion.div key={d.name} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="group overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={d.image} alt={d.name} fill unoptimized className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-sm font-semibold">{d.name}</h3>
                    {d.description && <p className="mt-1 text-xs text-muted-foreground">{d.description}</p>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

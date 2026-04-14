"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";

export default function ProductsPage() {
  return (
    <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-14 flex flex-wrap items-end justify-between gap-5"
      >
        <div>
          <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="block h-[2px] w-[22px] bg-primary" />Our Products
          </div>
          <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
            Product<br />Catalog
          </h2>
        </div>
        <p className="max-w-[320px] text-[15px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
          Forensic tools, kits, and lab equipment — curated for professionals.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-border bg-[#F5F7FA] text-center"
      >
        <FlaskConical className="size-12 text-primary/30" />
        <h3 className="mt-5 font-heading text-2xl font-[800] tracking-[-1px] text-primary">Coming Soon</h3>
        <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-gray-500">
          We&apos;re preparing our product catalog. Stay tuned for forensic tools, kits, and lab equipment.
        </p>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { SectionHeading } from "@/components/public/section-heading";

export default function ProductsPage() {
  return (
    <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <SectionHeading
        label="Our Products"
        title={<>Product<br />Catalog</>}
        description="Forensic tools, kits, and lab equipment — curated for professionals."
      />

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="flex min-h-[320px] flex-col items-center justify-center rounded-[10px] border border-border bg-[#F5F7FA] text-center"
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

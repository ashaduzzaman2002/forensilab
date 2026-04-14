"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Item { title: string; text: string; icon: string }

export function CertificationsClient({ items }: { items: Item[] }) {
  return (
    <section className="px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-14 flex flex-wrap items-end justify-between gap-5"
      >
        <div>
          <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="block h-[2px] w-[22px] bg-primary" />Credentials
          </div>
          <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
            Certifications &amp;<br />Standards
          </h2>
        </div>
        <p className="max-w-[320px] text-[15px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
          Accredited, recognised, and compliant with leading national and international bodies.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((c, i) => (
          <div key={i} className="group flex flex-col items-center rounded-lg border border-border bg-white px-6 py-10 text-center transition-colors duration-300 hover:border-primary">
            {c.icon && (
              <div className="mb-5 flex size-16 items-center justify-center rounded-xl bg-[#E8F0FF] transition-colors group-hover:bg-primary">
                <Image src={c.icon} alt="" width={40} height={40} unoptimized className="object-contain transition duration-300 [filter:brightness(0)_saturate(100%)_invert(26%)_sepia(95%)_saturate(2500%)_hue-rotate(215deg)] group-hover:[filter:brightness(0)_invert(1)_brightness(100)]" />
              </div>
            )}
            <h3 className="font-heading text-base font-bold text-foreground">{c.title}</h3>
            {c.text && <p className="mt-2 text-xs leading-relaxed text-gray-500">{c.text}</p>}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

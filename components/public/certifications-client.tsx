"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { MarqueeWrapper } from "./marquee-wrapper";

interface Item {
  title: string;
  text: string;
  icon: string;
}

export function CertificationsClient({ items }: { items: Item[] }) {
  return (
    <section
      id="certs"
      className="px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]"
    >
      <SectionHeading
        reversed
        label="Credentials"
        title={
          <>
            Certifications &amp;
            <br />
            Standards
          </>
        }
        description="Accredited, recognised, and compliant with leading national and international bodies."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-sm:hidden"
      >
        {items.map((c, i) => (
          <div
            key={i}
            className="group flex flex-col items-center rounded-[10px] border border-border bg-white px-6 py-10 text-center transition-colors duration-300 hover:border-primary"
          >
            {c.icon && (
              <div className="mb-5 flex size-16 items-center justify-center rounded-xl  overflow-hidden transition-colors group-hover:bg-primary">
                <Image
                  src={c.icon}
                  alt=""
                  width={100}
                  height={100}
                  unoptimized
                  className="object-contain w-full h-full transition duration-300 "
                />
              </div>
            )}
            <h3 className="font-heading text-base font-bold text-foreground">
              {c.title}
            </h3>
            {c.text && (
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                {c.text}
              </p>
            )}
          </div>
        ))}
      </motion.div>

      {/* Mobile marquee */}
      <div className="relative overflow-hidden sm:hidden -mx-6">
        <MarqueeWrapper trackClassName="gap-4">
          {[...items, ...items].map((c, i) => (
            <div key={i} className="flex w-[260px] shrink-0 flex-col items-center rounded-[10px] border border-border bg-white px-6 py-10 text-center">
              {c.icon && (
                <div className="mb-5 flex size-16 items-center justify-center rounded-xl overflow-hidden">
                  <Image src={c.icon} alt="" width={100} height={100} unoptimized className="object-contain w-full h-full" />
                </div>
              )}
              <h3 className="font-heading text-base font-bold text-foreground">{c.title}</h3>
              {c.text && <p className="mt-2 text-xs leading-relaxed text-gray-500">{c.text}</p>}
            </div>
          ))}
        </MarqueeWrapper>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: React.ReactNode;
  description: string;
  reversed?: boolean;
  dark?: boolean;
}

export function SectionHeading({ label, title, description, reversed, dark }: SectionHeadingProps) {
  const labelColor = dark ? "text-white/50" : "text-primary";
  const lineColor = dark ? "bg-white/30" : "bg-primary";
  const titleColor = dark ? "text-white" : "text-primary";
  const descColor = dark ? "text-white/50" : "text-gray-500";

  const heading = (
    <div className={reversed ? "text-right" : ""}>
      <div className={`mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] ${labelColor} ${reversed ? "flex-row-reverse justify-start" : ""}`}>
        <span className={`block h-[2px] w-[22px] ${lineColor}`} />{label}
      </div>
      <h2 className={`font-heading text-[clamp(36px,5vw,66px)] font-[600] leading-none tracking-[-2px] ${titleColor}`}>
        {title}
      </h2>
    </div>
  );

  const desc = (
    <p className={`max-w-[320px] text-[15px] leading-[1.7] ${descColor} ${reversed ? "max-md:text-left md:text-left" : "max-md:text-left md:text-right"}`}>
      {description}
    </p>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-14 flex flex-wrap items-end justify-between gap-5 ${reversed ? "flex-row-reverse text-right" : ""}`}
    >
      {heading}
      {desc}
    </motion.div>
  );
}

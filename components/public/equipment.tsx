"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./animated-section";
import { SectionHeading } from "./section-heading";

const categories = ["All", "Biological", "Chemical", "Digital", "Physical"] as const;

const divisions = [
  {
    name: "DNA Analysis",
    category: "Biological",
    description: "Advanced genetic profiling and identification",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Toxicology",
    category: "Chemical",
    description: "Detection of drugs, poisons and chemical substances",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Digital Forensics",
    category: "Digital",
    description: "Cyber evidence recovery and analysis",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Ballistics",
    category: "Physical",
    description: "Firearm and ammunition examination",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Trace Evidence",
    category: "Physical",
    description: "Microscopic material and fiber analysis",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop",
  },
];

export function Equipment() {
  const [active, setActive] = useState<string>("All");

  const filtered = active === "All" ? divisions : divisions.filter((d) => d.category === active);

  return (
    <AnimatedSection>
    <section className="relative overflow-hidden py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Forensic Divisions & Equipment"
          subtitle="State-of-the-art laboratories equipped with cutting-edge technology across all forensic disciplines"
        />

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-6 py-2 text-sm font-medium tracking-wide transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((d, i) => (
              <motion.div
                key={d.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-sm font-semibold">{d.name}</h3>
                  {d.description && (
                    <p className="mt-1 text-xs text-muted-foreground">{d.description}</p>
                  )}
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

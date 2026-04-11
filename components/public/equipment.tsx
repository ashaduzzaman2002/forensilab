"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "./section-heading";

const categories = ["All", "Biological", "Chemical", "Digital", "Physical"] as const;

const divisions = [
  {
    slug: "dna-analysis",
    name: "DNA Analysis",
    category: "Biological",
    description: "Advanced genetic profiling and identification",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop",
  },
  {
    slug: "toxicology",
    name: "Toxicology",
    category: "Chemical",
    description: "Detection of drugs, poisons and chemical substances",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop",
  },
  {
    slug: "digital-forensics",
    name: "Digital Forensics",
    category: "Digital",
    description: "Cyber evidence recovery and analysis",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  },
  {
    slug: "ballistics",
    name: "Ballistics",
    category: "Physical",
    description: "Firearm and ammunition examination",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
  },
  {
    slug: "trace-evidence",
    name: "Trace Evidence",
    category: "Physical",
    description: "Microscopic material and fiber analysis",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop",
  },
  {
    slug: "document-examination",
    name: "Document Examination",
    category: "Physical",
    description: "Handwriting, forgery and document verification",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop",
  },
];

export function Equipment() {
  const [active, setActive] = useState<string>("All");

  const filtered = active === "All" ? divisions : divisions.filter((d) => d.category === active);

  return (
    <section className="relative overflow-hidden py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Forensic Divisions & Equipment"
          subtitle="State-of-the-art laboratories equipped with cutting-edge technology across all forensic disciplines"
        />

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
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
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <Link
              key={d.slug}
              href={`/services/${d.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold">{d.name}</h3>
                {d.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {d.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

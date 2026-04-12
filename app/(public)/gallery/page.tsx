"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/public/section-heading";
import { CalendarDays, ArrowRight } from "lucide-react";

const cases = [
  {
    id: "2023-FMG042",
    scene: "Living Room",
    date: "Mar 15, 2023 — 09:42 AM",
    image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2023-FMG078",
    scene: "Vehicle Interior",
    date: "Jun 22, 2023 — 02:15 PM",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2024-FMG003",
    scene: "Digital Device Lab",
    date: "Jan 08, 2024 — 11:30 AM",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2024-FMG019",
    scene: "Outdoor Crime Scene",
    date: "Feb 14, 2024 — 07:20 AM",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2024-FMG035",
    scene: "Toxicology Sample",
    date: "Apr 03, 2024 — 04:55 PM",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2024-FMG051",
    scene: "Document Forgery",
    date: "May 19, 2024 — 10:10 AM",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2024-FMG067",
    scene: "Ballistics Lab",
    date: "Jul 28, 2024 — 01:45 PM",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2024-FMG082",
    scene: "DNA Processing Unit",
    date: "Sep 11, 2024 — 03:30 PM",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop",
  },
];

export default function GalleryPage() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Grid pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.3'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Investigation Records"
          subtitle="Browse documented forensic case files and evidence records"
        />

        {/* Horizontal scroll carousel */}
        <div className="mt-10 -mx-6 px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-4 w-max">
            {cases.map((c) => (
              <div
                key={c.id}
                className="group w-[300px] shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.scene}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider text-[#2563EB]">
                    CASE_ID: {c.id}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold text-gray-900">{c.scene}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {c.date}
                  </div>
                  <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2563EB] transition-colors hover:text-[#1E40AF]">
                    View Details <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid view below */}
        <h3 className="mt-16 mb-8 text-center font-heading text-xl font-bold uppercase tracking-wide">All Records</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cases.map((c) => (
            <div
              key={c.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.scene}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider text-[#2563EB]">
                  {c.id}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-sm font-bold text-gray-900">{c.scene}</h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3" />
                  {c.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

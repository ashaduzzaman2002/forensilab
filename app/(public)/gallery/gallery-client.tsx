"use client";
import Image from "next/image";
import { SectionHeading } from "@/components/public/section-heading";
import { CalendarDays } from "lucide-react";

interface Item { _id?: string; caseId: string; scene: string; date: string; image: string; }

export function GalleryClient({ items }: { items: Item[] }) {
  if (items.length === 0) return <section className="py-24 text-center text-muted-foreground">No records yet.</section>;
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading title="Investigation Records" subtitle="Browse documented forensic case files and evidence records" />
        <div className="mt-10 -mx-6 px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-4 w-max">
            {items.map((c, i) => (
              <div key={i} className="group w-[300px] shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]">
                <div className="relative h-48 overflow-hidden">
                  {c.image && <Image src={c.image} alt={c.scene} fill unoptimized className="object-cover transition-transform duration-300 group-hover:scale-105" />}
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider text-[#2563EB]">CASE_ID: {c.caseId}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold text-gray-900">{c.scene}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="size-3.5" />{c.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h3 className="mt-16 mb-8 text-center font-heading text-xl font-bold uppercase tracking-wide">All Records</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((c, i) => (
            <div key={`g-${i}`} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]">
              <div className="relative h-44 overflow-hidden">
                {c.image && <Image src={c.image} alt={c.scene} fill unoptimized className="object-cover transition-transform duration-300 group-hover:scale-105" />}
                <div className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider text-[#2563EB]">{c.caseId}</div>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-sm font-bold text-gray-900">{c.scene}</h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="size-3" />{c.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

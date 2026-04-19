"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, SearchIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Service { _id: string; slug: string; title: string; description: string; thumbnail?: string; image?: string; icon?: string }

export function ServicesClient({ items }: { items: Service[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const perPage = isMobile ? 5 : 6;

  const filtered = items.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));
  const pages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div className="mb-8 relative max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search services..."
          className="w-full rounded-full border border-border bg-white pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {paged.map((s, i) => (
          <Link key={s._id} href={`/services/${s.slug}`}
            className="group flex flex-col overflow-hidden rounded-[10px] border border-border bg-white transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,87,255,.1)]"
          >
            <div className="relative flex h-[180px] items-center justify-center bg-[#E8F0FF] max-sm:hidden">
              {(s.thumbnail || s.image) ? (
                <Image src={(s.thumbnail || s.image)!} alt={s.title} fill unoptimized className="object-cover" />
              ) : s.icon ? (
                <div className="flex size-16 items-center justify-center rounded-[9px] bg-white/80 text-primary">
                  {s.icon.startsWith("<") ? (
                    <div className="[&>svg]:size-8" dangerouslySetInnerHTML={{ __html: s.icon }} />
                  ) : (
                    <img src={s.icon} alt="" className="size-8 object-contain" />
                  )}
                </div>
              ) : null}
              <span className="absolute right-3 top-3 font-heading text-[28px] font-[800] leading-none text-white/30">
                {String((page - 1) * perPage + i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-heading text-[17px] font-bold tracking-[-0.3px] text-foreground">{s.title}</h3>
              <p className="mt-[10px] flex-1 text-[13px] leading-[1.65] text-gray-500">{s.description}</p>
              <span className="mt-[18px] inline-flex items-center gap-[6px] text-[12px] font-semibold tracking-[0.02em] text-primary transition-[gap] duration-200 group-hover:gap-[10px]">
                Learn More <ArrowRight className="size-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-gray-500">No services found.</p>
      )}

      {pages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`size-9 rounded-full text-xs font-semibold transition ${p === page ? "bg-primary text-white" : "border border-border bg-white hover:bg-muted/50"}`}
            >{p}</button>
          ))}
        </div>
      )}
    </>
  );
}

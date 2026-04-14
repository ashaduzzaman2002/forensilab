import { getPageMetadata } from "@/lib/actions/seo";

export const revalidate = 60;

import { dbConnect } from "@/lib/db";
import { Service } from "@/lib/models/service";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export async function generateMetadata() { return getPageMetadata("services", { title: "Services — ForensiLabs", description: "Comprehensive forensic solutions powered by cutting-edge technology" }); }

export default async function ServicesPage() {
  await dbConnect();
  const services = await Service.find().sort({ order: 1 }).lean();
  const items = JSON.parse(JSON.stringify(services));

  return (
    <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="block h-[2px] w-[22px] bg-primary" />What We Do
          </div>
          <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
            Our Forensic<br />Services
          </h2>
        </div>
        <p className="max-w-[320px] text-[15px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
          Comprehensive forensic solutions powered by cutting-edge technology and expert analysis.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {items.map((s: any, i: number) => (
          <Link key={s._id} href={`/services/${s.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,87,255,.1)]"
          >
            <div className="relative flex h-[180px] items-center justify-center bg-[#E8F0FF]">
              {(s.thumbnail || s.image) ? (
                <Image src={s.thumbnail || s.image} alt={s.title} fill unoptimized className="object-cover" />
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
                {String(i + 1).padStart(2, "0")}
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
    </section>
  );
}

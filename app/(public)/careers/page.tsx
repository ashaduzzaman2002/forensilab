import { getPageMetadata } from "@/lib/actions/seo";
import { getActiveCareers } from "@/lib/actions/career";
import { MapPin, Clock, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/public/section-heading";

export const revalidate = 60;

export async function generateMetadata() { return getPageMetadata("careers", { title: "Careers — ForensiLabs", description: "Join our team of forensic science professionals" }); }

export default async function CareersPage() {
  const careers = await getActiveCareers();

  return (
    <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <SectionHeading
        label="Join Us"
        title={<>Career<br />Opportunities</>}
        description="Be part of a world-class team advancing forensic science and delivering justice."
      />

      {careers.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[10px] border border-border bg-[#F5F7FA] text-center">
          <Briefcase className="size-12 text-primary/30" />
          <h3 className="mt-5 font-heading text-2xl font-[800] tracking-[-1px] text-primary">No Openings Right Now</h3>
          <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-gray-500">
            We don&apos;t have any open positions at the moment. Check back soon or reach out to us directly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {careers.map((c: any) => (
            <Link key={c._id} href={`/careers/${c.slug}`} className="group flex flex-col overflow-hidden rounded-[10px] border border-border bg-white transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,87,255,.1)]">
              <div className="relative flex h-[180px] items-center justify-center" style={{ background: "linear-gradient(135deg,#0A1A40,#0057FF)" }}>
                {c.image && <Image src={c.image} alt={c.title} fill unoptimized className="object-cover" />}
                <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-white/15 px-[10px] py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[4px]">
                  {c.type}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-[17px] font-bold tracking-[-0.3px] text-foreground">{c.title}</h3>
                <p className="mt-[10px] flex-1 text-[13px] leading-[1.65] text-gray-500">{c.description}</p>
                <div className="mt-[18px] flex flex-wrap items-center gap-4 text-[12px] text-gray-500">
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{c.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{c.type}</span>
                </div>
                <span className="mt-[18px] inline-flex items-center gap-[6px] text-[12px] font-semibold tracking-[0.02em] text-primary transition-[gap] duration-200 group-hover:gap-[10px]">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

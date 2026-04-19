import { dbConnect } from "@/lib/db";
import { Career } from "@/lib/models/career";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/public/section-heading";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const item = await Career.findOne({ slug }).lean();
  if (!item) return {};
  const s = item as any;
  return { title: `${s.title} — Careers — ForensiLabs`, description: s.description };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const item = await Career.findOne({ slug, isActive: true }).lean();
  if (!item) notFound();
  const s = JSON.parse(JSON.stringify(item));

  return (
    <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <SectionHeading
        label={s.type}
        title={<>{s.title}</>}
        description={`${s.location} · ${s.type}`}
      />

      {s.applyLink && (
        <div className="mb-14 flex justify-end max-md:justify-start">
          <a href={s.applyLink} target="_blank" rel="noopener noreferrer" className="rounded bg-primary px-7 py-3 text-[13px] font-semibold text-white transition hover:-translate-y-px hover:bg-primary/90">
            Apply Now →
          </a>
        </div>
      )}

      {s.image && (
        <div className="relative mb-16 h-[360px] overflow-hidden rounded-[10px] border border-border max-md:h-[240px]">
          <Image src={s.image} alt={s.title} fill unoptimized className="object-cover" />
          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[4px]">
            {s.type}
          </span>
        </div>
      )}

      {s.content && (
        <div className="prose prose-sm prose-gray max-w-none break-words [&>h2]:font-heading [&>h2]:text-primary [&>h2]:font-[800] [&>h2]:tracking-[-1px]" dangerouslySetInnerHTML={{ __html: s.content }} />
      )}

      {s.requirements && (
        <div className="mt-12">
          <h3 className="font-heading text-xl font-bold text-primary">Requirements</h3>
          <ul className="mt-4 space-y-2">
            {s.requirements.split("\n").filter(Boolean).map((r: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.7] text-gray-500">
                <span className="mt-[9px] block size-1.5 shrink-0 rounded-full bg-primary" />{r}
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  );
}

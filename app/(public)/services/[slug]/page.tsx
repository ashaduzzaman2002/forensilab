import { dbConnect } from "@/lib/db";
import { Service } from "@/lib/models/service";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/public/section-heading";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const service = await Service.findOne({ slug }).lean();
  if (!service) return {};
  const s = service as any;
  return { title: s.metaTitle || s.title, description: s.metaDescription || s.description, keywords: s.metaKeywords || undefined };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const service = await Service.findOne({ slug }).lean();
  if (!service) notFound();
  const s = JSON.parse(JSON.stringify(service));

  return (
    <>
      {/* Hero */}
      <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
        <Link href="/services" className="mb-10 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-primary transition hover:gap-3">
          <ArrowLeft className="size-3.5" /> All Services
        </Link>

        <SectionHeading
          label="Service Detail"
          title={<>{s.title}</>}
          description={''}
        />

        {(s.thumbnail || s.image) && (
          <div className="relative mb-16 h-[360px] overflow-hidden rounded-[10px] border border-border max-md:h-[240px]">
            <Image src={s.thumbnail || s.image} alt={s.title} fill unoptimized className="object-cover" />
          </div>
        )}

        {s.content && (
          <div className="prose text-justify prose-sm prose-gray max-w-none [&_*]:!whitespace-normal [&>h2]:font-heading [&>h2]:text-primary [&>h2]:font-[800] [&>h2]:tracking-[-1px]" dangerouslySetInnerHTML={{ __html: s.content.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') }} />
        )}
      </section>

      {/* Details Grid */}
      {s.details?.length > 0 && (
        <section className="bg-[#F5F7FA] px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
          <SectionHeading
            label="Key Areas"
            title={<>What&apos;s Covered</>}
            description=""
          />

          <div className="grid grid-cols-4 gap-[2px] bg-border max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {s.details.map((d: string, i: number) => (
              <div key={i} className="group flex min-h-[140px] cursor-default flex-col justify-between bg-white p-7 transition-all duration-300 hover:bg-primary">
                <span className="font-heading text-[28px] font-[800] leading-none text-border transition-colors group-hover:text-white/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-sm font-medium text-foreground transition-colors group-hover:text-white/90">{d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white px-[60px] py-[80px] text-center max-md:px-6 max-md:py-[60px]">
        <Link href="/#request-quote" className="rounded-full bg-primary px-7 py-3 text-[13px] font-semibold text-white transition hover:-translate-y-px hover:bg-primary/90">
          Request a Quote →
        </Link>
      </section>
    </>
  );
}

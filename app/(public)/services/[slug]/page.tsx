import { dbConnect } from "@/lib/db";
import { Service } from "@/lib/models/service";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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

        <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="block h-[2px] w-[22px] bg-primary" />Service Detail
            </div>
            <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
              {s.title}
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
            {s.description}
          </p>
        </div>

        {(s.thumbnail || s.image) && (
          <div className="relative mb-16 h-[360px] overflow-hidden rounded-lg border border-border max-md:h-[240px]">
            <Image src={s.thumbnail || s.image} alt={s.title} fill unoptimized className="object-cover" />
          </div>
        )}

        {s.content && (
          <div className="prose prose-sm prose-gray max-w-none [&>h2]:font-heading [&>h2]:text-primary [&>h2]:font-[800] [&>h2]:tracking-[-1px]" dangerouslySetInnerHTML={{ __html: s.content }} />
        )}
      </section>

      {/* Details Grid */}
      {s.details?.length > 0 && (
        <section className="bg-[#F5F7FA] px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
          <div className="mb-14">
            <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="block h-[2px] w-[22px] bg-primary" />Key Areas
            </div>
            <h2 className="font-heading text-[clamp(28px,4vw,48px)] font-[800] leading-none tracking-[-2px] text-primary">
              What&apos;s Covered
            </h2>
          </div>

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
        <Link href="/#request-quote" className="rounded bg-primary px-7 py-3 text-[13px] font-semibold text-white transition hover:-translate-y-px hover:bg-primary/90">
          Request a Quote →
        </Link>
      </section>
    </>
  );
}

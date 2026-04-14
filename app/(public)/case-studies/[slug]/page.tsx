import { dbConnect } from "@/lib/db";
import { CaseStudy } from "@/lib/models/case-study";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const item = await CaseStudy.findOne({ slug }).lean();
  if (!item) return {};
  const s = item as any;
  return { title: s.metaTitle || s.title, description: s.metaDescription || s.description, keywords: s.metaKeywords || undefined };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const item = await CaseStudy.findOne({ slug }).lean();
  if (!item) notFound();
  const s = JSON.parse(JSON.stringify(item));

  return (
    <>
      {/* Hero */}
      <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
          <div>
            {s.tag && (
              <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                <span className="block h-[2px] w-[22px] bg-primary" />{s.tag}
              </div>
            )}
            <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
              {s.title}
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
            {s.description}
          </p>
        </div>

        {s.image && (
          <div className="relative mb-16 h-[360px] overflow-hidden rounded-lg border border-border max-md:h-[240px]">
            <Image src={s.image} alt={s.title} fill unoptimized className="object-cover" />
            {s.badge && (
              <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[4px]">
                {s.badge}
              </span>
            )}
          </div>
        )}

        {s.content && (
          <div className="prose prose-sm prose-gray max-w-none [&>h2]:font-heading [&>h2]:text-primary [&>h2]:font-[800] [&>h2]:tracking-[-1px]" dangerouslySetInnerHTML={{ __html: s.content }} />
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#F5F7FA] px-[60px] py-[80px] text-center max-md:px-6 max-md:py-[60px]">
        <Link href="/#request-quote" className="rounded bg-primary px-7 py-3 text-[13px] font-semibold text-white transition hover:-translate-y-px hover:bg-primary/90">
          Request a Quote →
        </Link>
      </section>
    </>
  );
}

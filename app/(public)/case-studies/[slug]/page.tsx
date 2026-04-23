import { dbConnect } from "@/lib/db";
import { CaseStudy } from "@/lib/models/case-study";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/public/section-heading";

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
        <SectionHeading
          label={s.tag || "Case Study"}
          title={<>{s.title}</>}
          description={''}
        />

        {s.image && (
          <div className="relative mb-16 h-[360px] overflow-hidden rounded-[10px] border border-border max-md:h-[240px]">
            <Image src={s.image} alt={s.title} fill unoptimized className="object-cover" />
            {s.badge && (
              <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[4px]">
                {s.badge}
              </span>
            )}
          </div>
        )}

        {s.content && (
          <div className="prose prose-sm prose-gray max-w-none [&_*]:!whitespace-normal [&>h2]:font-heading [&>h2]:text-primary [&>h2]:font-[800] [&>h2]:tracking-[-1px]" dangerouslySetInnerHTML={{ __html: s.content.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') }} />
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#F5F7FA] px-[60px] py-[80px] text-center max-md:px-6 max-md:py-[60px]">
        <Link href="/#request-quote" className="rounded-full bg-primary px-7 py-3 text-[13px] font-semibold text-white transition hover:-translate-y-px hover:bg-primary/90">
          Request a Quote →
        </Link>
      </section>
    </>
  );
}

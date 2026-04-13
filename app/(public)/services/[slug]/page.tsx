import { dbConnect } from "@/lib/db";
import { Service } from "@/lib/models/service";
import { SectionHeading } from "@/components/public/section-heading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const service = await Service.findOne({ slug }).lean();
  if (!service) notFound();
  const s = JSON.parse(JSON.stringify(service));

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Link href="/services" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
          <ArrowLeft className="size-4" /> Back to Services
        </Link>

        {(s.thumbnail || s.image) && (
          <div className="mb-12 h-64 w-full rounded-2xl bg-cover bg-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] md:h-80" style={{ backgroundImage: `url('${s.thumbnail || s.image}')` }} />
        )}

        <SectionHeading title={s.title} subtitle={s.description} />

        {s.content && (
          <div className="prose prose-sm prose-gray max-w-none mb-10" dangerouslySetInnerHTML={{ __html: s.content }} />
        )}

        {s.details?.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {s.details.map((d: string) => (
              <div key={d} className="flex items-start gap-3 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)]">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-[#2563EB]" />
                <span className="text-sm text-gray-700">{d}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link href="/#request-quote" className="inline-flex rounded-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:-translate-y-0.5">
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

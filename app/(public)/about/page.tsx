import { dbConnect } from "@/lib/db";
import { About } from "@/lib/models/about";
import Image from "next/image";

const fallback = {
  title: "Trusted Experts in Forensic & Digital Investigation",
  subtitle: "About Us",
  content: "<p>ForensiLabs is a premier forensic science laboratory dedicated to delivering accurate, reliable, and court-admissible results. With over a decade of experience, our team of certified analysts combines scientific rigor with cutting-edge technology.</p><p>From DNA profiling and toxicology to cyber forensics and ballistics, we provide comprehensive investigative support to law enforcement agencies, legal professionals, and corporate clients worldwide.</p>",
  image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1200&auto=format&fit=crop",
  highlights: ["Certified & Accredited Lab", "Advanced Technology", "Experienced Analysts", "Confidential & Secure"],
  stats: [{ value: "500+", label: "Cases Solved" }, { value: "10+", label: "Years Experience" }, { value: "50+", label: "Expert Analysts" }, { value: "99%", label: "Client Satisfaction" }],
};

export default async function AboutPage() {
  await dbConnect();
  const doc = await About.findOne().lean();
  const data = doc ? { ...fallback, ...JSON.parse(JSON.stringify(doc)) } : fallback;

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] lg:h-[520px]">
            <Image src={data.image} alt="ForensiLabs" fill unoptimized className="object-cover" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2563EB]">{data.subtitle}</span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{data.title}</h2>
            {data.content && <div className="mt-6 prose prose-sm prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: data.content }} />}
            {data.highlights?.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4">
                {data.highlights.map((h: string) => (
                  <div key={h} className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.1)]">
                    <span className="text-sm font-medium text-gray-800">{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {data.stats?.length > 0 && (
          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
            {data.stats.map((s: any) => (
              <div key={s.label} className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                <p className="font-heading text-3xl font-bold text-[#2563EB]">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

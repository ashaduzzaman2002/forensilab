import { getPageMetadata } from "@/lib/actions/seo";

export const revalidate = 60;

import { dbConnect } from "@/lib/db";
import { About } from "@/lib/models/about";
import { Team } from "@/lib/models/team";
import Image from "next/image";
import { Mail } from "lucide-react";

export async function generateMetadata() { return getPageMetadata("about", { title: "About — ForensiLabs", description: "Trusted experts in forensic and digital investigation" }); }

const fallback = {
  title: "Trusted Experts in Forensic & Digital Investigation",
  subtitle: "About Us",
  content: "<p>ForensiLabs is a premier forensic science laboratory dedicated to delivering accurate, reliable, and court-admissible results.</p>",
  image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1200&auto=format&fit=crop",
  highlights: ["Certified & Accredited Lab", "Advanced Technology", "Experienced Analysts", "Confidential & Secure"],
  stats: [{ value: "500+", label: "Cases Solved" }, { value: "10+", label: "Years Experience" }, { value: "50+", label: "Expert Analysts" }, { value: "99%", label: "Client Satisfaction" }],
};

export default async function AboutPage() {
  await dbConnect();
  const doc = await About.findOne().lean();
  const data = doc ? { ...fallback, ...JSON.parse(JSON.stringify(doc)) } : fallback;
  const team = JSON.parse(JSON.stringify(await Team.find().sort({ order: 1 }).lean()));

  return (
    <>
      {/* About Section */}
      <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="block h-[2px] w-[22px] bg-primary" />{data.subtitle}
            </div>
            <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
              About<br />ForensiLabs
            </h2>
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-[400px] overflow-hidden rounded-lg border border-border lg:h-[480px]">
            <Image src={data.image} alt="ForensiLabs" fill unoptimized className="object-cover" />
          </div>
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">{data.title}</h3>
            {data.content && <div className="mt-6 prose prose-sm prose-gray max-w-none text-gray-500" dangerouslySetInnerHTML={{ __html: data.content }} />}
            {data.highlights?.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-3">
                {data.highlights.map((h: string) => (
                  <div key={h} className="flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-3 transition-colors hover:border-primary">
                    <span className="text-sm font-medium text-foreground">{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {data.stats?.length > 0 && (
          <div className="mt-20 grid grid-cols-2 gap-[2px] bg-border md:grid-cols-4">
            {data.stats.map((s: any) => (
              <div key={s.label} className="bg-white py-8 text-center">
                <p className="font-heading text-[38px] font-[800] text-primary">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.06em] text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Team Section */}
      {team.length > 0 && (
        <section className="bg-[#F5F7FA] px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="mb-3.5 flex items-center gap-[9px] text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                <span className="block h-[2px] w-[22px] bg-primary" />Our People
              </div>
              <h2 className="font-heading text-[clamp(36px,5vw,66px)] font-[800] leading-none tracking-[-2px] text-primary">
                Meet Our<br />Experts
              </h2>
            </div>
            <p className="max-w-[320px] text-[15px] leading-[1.7] text-gray-500 max-md:text-left md:text-right">
              A world-class team of certified forensic professionals dedicated to delivering justice.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t: any) => (
              <div key={t._id} className="group overflow-hidden rounded-lg border border-border bg-white text-center transition-colors duration-300 hover:border-primary">
                {t.image && (
                  <div className="relative mx-auto mt-8 size-28 overflow-hidden rounded-full ring-4 ring-[#E8F0FF]">
                    <Image src={t.image} alt={t.name} fill unoptimized className="object-cover" />
                  </div>
                )}
                <div className="p-5 pt-4">
                  <h3 className="font-heading text-base font-bold text-foreground">{t.name}</h3>
                  <p className="mt-1 text-xs font-medium text-primary">{t.role}</p>
                  {t.description && <p className="mt-2 text-xs text-gray-500">{t.description}</p>}
                  <div className="mt-4 flex justify-center gap-2 pb-2">
                    {t.linkedin && (
                      <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="flex size-8 items-center justify-center rounded-full bg-[#E8F0FF] text-primary transition hover:bg-primary hover:text-white">
                        <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                    {t.email && (
                      <a href={`mailto:${t.email}`} className="flex size-8 items-center justify-center rounded-full bg-[#E8F0FF] text-primary transition hover:bg-primary hover:text-white"><Mail className="size-3.5" /></a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

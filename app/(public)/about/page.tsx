import { getPageMetadata } from "@/lib/actions/seo";

export const revalidate = 60;

import { dbConnect } from "@/lib/db";
import { About } from "@/lib/models/about";
import { Team } from "@/lib/models/team";
import Image from "next/image";
import { Mail } from "lucide-react";
import { SectionHeading } from "@/components/public/section-heading";

export async function generateMetadata() { return getPageMetadata("about", { title: "About — ForensiLabs", description: "Trusted experts in forensic and digital investigation" }); }

export default async function AboutPage() {
  await dbConnect();
  const doc = await About.findOne().lean();
  if (!doc) return <section className="px-[60px] py-[100px] text-center text-gray-500 max-md:px-6">No content yet.</section>;
  const data = JSON.parse(JSON.stringify(doc));
  const team = JSON.parse(JSON.stringify(await Team.find().sort({ order: 1 }).lean()));

  return (
    <>
      {/* About Section */}
      <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px] overflow-hidden">
        <SectionHeading
          label={data.subtitle}
          title={<>About<br />ForensiLabs</>}
          description=""
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {data.image && (
            <div className="relative h-[400px] overflow-hidden rounded-[10px] border border-border lg:h-[480px] max-md:h-[250px]">
              <Image src={data.image} alt="ForensiLabs" fill unoptimized className="object-cover" />
            </div>
          )}
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">{data.title}</h3>
            {data.content && <div className="mt-6 prose prose-sm prose-gray text-gray-500 max-w-none [&_*]:!whitespace-normal" dangerouslySetInnerHTML={{ __html: data.content.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') }} />}
            {data.highlights?.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                {data.highlights.map((h: string) => (
                  <div key={h} className="flex items-center gap-3 rounded-[10px] border border-border bg-white px-4 py-3 transition-colors hover:border-primary">
                    <span className="text-sm font-medium text-foreground">{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {data.stats?.length > 0 && (
          <div className="mt-20 grid grid-cols-2 gap-[2px] bg-border md:grid-cols-4 max-md:mt-12">
            {data.stats.map((s: any) => (
              <div key={s.label} className="bg-white py-8 text-center max-md:py-5">
                <p className="font-heading text-[38px] font-[800] text-primary max-md:text-[28px]">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.06em] text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Team Section */}
      {team.length > 0 && (
        <section className="bg-[#F5F7FA] px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
          <SectionHeading
            reversed
            label="Our People"
            title={<>Meet Our<br />Experts</>}
            description="A world-class team of certified forensic professionals dedicated to delivering justice."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-sm:hidden">
            {team.map((t: any) => (
              <div key={t._id} className="group overflow-hidden rounded-[10px] border border-border bg-white text-center transition-colors duration-300 hover:border-primary">
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

          {/* Mobile marquee */}
          <div className="relative overflow-hidden sm:hidden -mx-6">
            <div className="marquee-track flex gap-4 hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
              {[...team, ...team].map((t: any, i: number) => (
                <div key={i} className="w-[240px] shrink-0 overflow-hidden rounded-[10px] border border-border bg-white text-center">
                  {t.image && (
                    <div className="relative mx-auto mt-6 size-20 overflow-hidden rounded-full ring-4 ring-[#E8F0FF]">
                      <Image src={t.image} alt={t.name} fill unoptimized className="object-cover" />
                    </div>
                  )}
                  <div className="p-4 pt-3">
                    <h3 className="font-heading text-sm font-bold text-foreground">{t.name}</h3>
                    <p className="mt-1 text-xs font-medium text-primary">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

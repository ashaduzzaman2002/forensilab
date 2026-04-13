import Link from "next/link";
import { SectionHeading } from "./section-heading";
import { MotionCard } from "./motion-card";
import { AnimatedSection } from "./animated-section";

interface Item { slug: string; title: string; description: string; icon: string; }

export function CaseStudiesClient({ items }: { items: Item[] }) {
  return (
    <AnimatedSection>
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/60 to-blue-100/40" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.5'%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3Cline x1='0' y1='30' x2='60' y2='30'/%3E%3Cline x1='30' y1='0' x2='30' y2='60'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <SectionHeading title="Case Studies & Industry Insights" subtitle="Explore how our forensic expertise has delivered critical results across high-profile investigations" />
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((c, i) => (
              <MotionCard key={c.slug} index={i}>
                <div className="group flex flex-col justify-between rounded-2xl border border-white/60 bg-white/70 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1">
                  {c.icon && (
                    <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-blue-50">
                      {c.icon.startsWith("<") ? (
                        <div className="text-[#2563EB] [&>svg]:size-8" dangerouslySetInnerHTML={{ __html: c.icon }} />
                      ) : (
                        <img src={c.icon} alt="" className="size-8 object-contain transition duration-300 [filter:brightness(0)_saturate(100%)_invert(26%)_sepia(95%)_saturate(2500%)_hue-rotate(215deg)]" />
                      )}
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{c.description}</p>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary border-2 border-primary h-11 ml-auto px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-primary"
                  >
                    View Case Study
                  </Link>
                </div>
              </MotionCard>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/case-studies" className="inline-flex items-center gap-2 rounded-full border-2 border-[#2563EB] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white">
              View More
            </Link>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

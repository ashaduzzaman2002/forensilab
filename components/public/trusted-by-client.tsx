import { SectionHeading } from "./section-heading";
import { AnimatedSection } from "./animated-section";

interface Item { name: string; logo: string; link: string; }

export function TrustedByClient({ items }: { items: Item[] }) {
  const doubled = [...items, ...items];

  return (
    <AnimatedSection>
      <section className="relative overflow-hidden pb-24">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.5'%3E%3Cpath d='M10 50h30m10 0h30'/%3E%3Cpath d='M50 10v30m0 10v30'/%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10">
          <SectionHeading title="Trusted By" subtitle="Partnering with leading organizations in forensics, cybersecurity, and law enforcement" />
          <div className="mt-10 overflow-hidden">
            <div className="flex w-max gap-8 marquee-track">
              {doubled.map((item, i) => {
                const content = (
                  <div className="flex h-20 w-48 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)]">
                    {item.logo ? (
                      <img src={item.logo} alt={item.name} className="h-10 max-w-[140px] object-contain" />
                    ) : (
                      <span className="text-base font-bold tracking-wide text-gray-700">{item.name}</span>
                    )}
                  </div>
                );
                return item.link ? (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">{content}</a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

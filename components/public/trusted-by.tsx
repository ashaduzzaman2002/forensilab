import { SectionHeading } from "./section-heading";

const logos = [
  { name: "CipherTrace", color: "#2563EB" },
  { name: "Axiom Cyber", color: "#1E40AF" },
  { name: "NIST", color: "#111827" },
  { name: "Veritas", color: "#DC2626" },
  { name: "SecureLogix", color: "#059669" },
  { name: "Interpol Cyber", color: "#2563EB" },
  { name: "Meta", color: "#3B82F6" },
  { name: "Palantir", color: "#111827" },
];

const doubled = [...logos, ...logos];

export function TrustedBy() {
  return (
    <section className="relative overflow-hidden pb-24">
      {/* Circuit pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.5'%3E%3Cpath d='M10 50h30m10 0h30'/%3E%3Cpath d='M50 10v30m0 10v30'/%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='90' cy='50' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='50' cy='90' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        <SectionHeading
          title="Trusted By"
          subtitle="Partnering with leading organizations in forensics, cybersecurity, and law enforcement"
        />

        <div className="mt-10 overflow-hidden">
          <div className="flex w-max gap-8 marquee-track">
            {doubled.map((logo, i) => (
              <div
                key={i}
                className="flex h-20 w-48 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)]"
              >
                <span
                  className="text-base font-bold tracking-wide"
                  style={{ color: logo.color }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

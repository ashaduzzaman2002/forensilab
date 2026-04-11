import { SectionHeading } from "./section-heading";
import { ShieldCheck, Award, BadgeCheck, Globe } from "lucide-react";

const certifications = [
  {
    icon: <ShieldCheck className="size-10" />,
    title: "NABL Accredited",
    text: "National Accreditation Board for Testing and Calibration Laboratories",
  },
  {
    icon: <Award className="size-10" />,
    title: "ISO 17025 Certified",
    text: "International standard for laboratory competence",
  },
  {
    icon: <BadgeCheck className="size-10" />,
    title: "ASCLD/LAB Compliant",
    text: "American Society of Crime Laboratory Directors accreditation",
  },
  {
    icon: <Globe className="size-10" />,
    title: "ILAC Recognized",
    text: "International Laboratory Accreditation Cooperation member",
  },
];

export function Certifications() {
  return (
    <section className="relative overflow-hidden py-24 ">
      {/* Forensic line illustrations bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.6'%3E%3Ccircle cx='40' cy='20' r='6'/%3E%3Cline x1='40' y1='26' x2='40' y2='50'/%3E%3Ccircle cx='40' cy='56' r='4'/%3E%3Cline x1='20' y1='40' x2='60' y2='40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow dots */}
      <div className="absolute top-16 left-[12%] size-3 rounded-full bg-blue-400/25 blur-sm animate-pulse" />
      <div className="absolute bottom-20 right-[18%] size-2.5 rounded-full bg-blue-500/20 blur-sm animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 right-[8%] size-2 rounded-full bg-blue-400/30 blur-sm animate-pulse [animation-delay:2s]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Certifications & Standards"
          subtitle="Accredited by leading national and international forensic bodies"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <div
              key={c.title}
              className="group flex flex-col items-center rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md px-6 py-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]"
            >
              <div className="mb-5 flex size-16 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] transition-colors group-hover:bg-[#2563EB] group-hover:text-white">
                {c.icon}
              </div>
              <h3 className="font-heading text-base font-bold text-gray-900">
                {c.title}
              </h3>
              {c.text && (
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {c.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

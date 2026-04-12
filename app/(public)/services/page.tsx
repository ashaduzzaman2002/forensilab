import { SectionHeading } from "@/components/public/section-heading";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    slug: "dna-analysis",
    title: "DNA Analysis",
    description: "Advanced genetic profiling and individual identification",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <path d="M2 15c6.667-6 13.333 0 20-6" /><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" /><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" /><path d="M2 9c6.667 6 13.333 0 20 6" />
      </svg>
    ),
  },
  {
    slug: "cyber-forensics",
    title: "Cyber Forensics",
    description: "Digital evidence recovery and network intrusion analysis",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><path d="M7 8h2m2 0h4" /><path d="M7 11h8" />
      </svg>
    ),
  },
  {
    slug: "ballistics",
    title: "Ballistics Investigation",
    description: "Firearm discharge residue and projectile trajectory analysis",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    slug: "toxicology",
    title: "Toxicology Testing",
    description: "Detection of drugs, poisons and chemical substances",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <path d="M9 3h6v3H9z" /><path d="M8 6l-3 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2L16 6" /><path d="M7 15h10" />
      </svg>
    ),
  },
  {
    slug: "digital-evidence",
    title: "Digital Evidence Recovery",
    description: "Encrypted device data extraction and forensic imaging",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /><path d="M4 9h1m14 0h1M4 15h1m14 0h1M9 4v1m6-1v1M9 19v1m6-1v1" />
      </svg>
    ),
  },
  {
    slug: "fingerprint-analysis",
    title: "Fingerprint Analysis",
    description: "Latent print identification using chemical and digital enhancement",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <path d="M12 2a10 10 0 0 1 7.07 17.07" /><path d="M12 6a6 6 0 0 1 4.24 10.24" /><path d="M12 10a2 2 0 0 1 1.41 3.41" /><path d="M2 12h2" /><path d="M12 22v-2" />
      </svg>
    ),
  },
  {
    slug: "trace-evidence",
    title: "Trace Evidence",
    description: "Microscopic material, fiber and residue analysis",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><circle cx="11" cy="11" r="3" />
      </svg>
    ),
  },
  {
    slug: "document-examination",
    title: "Document Examination",
    description: "Handwriting analysis, forgery and document verification",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    slug: "crime-scene",
    title: "Crime Scene Investigation",
    description: "On-site evidence collection and scene reconstruction",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="M13 13l8 8" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Fingerprint pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.4'%3E%3Cellipse cx='60' cy='60' rx='15' ry='20'/%3E%3Cellipse cx='60' cy='60' rx='25' ry='33'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='46'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive forensic solutions powered by cutting-edge technology and expert analysis"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]"
            >
              <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] transition-all duration-300 group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-110">
                {s.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#2563EB] opacity-0 transition-opacity group-hover:opacity-100">
                Learn More <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

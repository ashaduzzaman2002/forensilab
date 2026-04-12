import Image from "next/image";
import { SectionHeading } from "@/components/public/section-heading";
import { Mail } from "lucide-react";

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Chief Forensic Officer",
    description: "20+ years in forensic pathology and crime scene analysis",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "James Carter",
    role: "Lead Ballistics Expert",
    description: "Firearm identification and trajectory reconstruction specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Toxicology Director",
    description: "Expert in drug screening and poison detection analysis",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Michael Torres",
    role: "Cyber Forensics Lead",
    description: "Digital evidence recovery and encrypted data specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Emily Zhang",
    role: "DNA Analysis Specialist",
    description: "Genetic profiling and STR analysis expert",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Robert Okafor",
    role: "Document Examiner",
    description: "Handwriting analysis and forgery detection specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. Lisa Nguyen",
    role: "Trace Evidence Analyst",
    description: "Microscopic material and fiber analysis expert",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "David Hernandez",
    role: "Crime Scene Investigator",
    description: "On-site evidence collection and scene reconstruction",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
  },
];

export default function TeamPage() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Grid pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.3'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Meet Our Experts"
          subtitle="A world-class team of certified forensic professionals dedicated to delivering justice"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <div
              key={t.name}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]"
            >
              {/* Image */}
              <div className="relative mx-auto mt-8 size-28 overflow-hidden rounded-full ring-4 ring-blue-50">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-5 pt-4">
                <h3 className="font-heading text-base font-bold text-gray-900">{t.name}</h3>
                <p className="mt-1 text-xs font-medium text-[#2563EB]">{t.role}</p>
                {t.description && (
                  <p className="mt-2 text-xs text-muted-foreground">{t.description}</p>
                )}

                {/* Social icons */}
                <div className="mt-4 flex justify-center gap-2 pb-2">
                  <a href="#" className="flex size-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition hover:bg-[#2563EB] hover:text-white">
                    <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="#" className="flex size-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition hover:bg-[#2563EB] hover:text-white">
                    <Mail className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

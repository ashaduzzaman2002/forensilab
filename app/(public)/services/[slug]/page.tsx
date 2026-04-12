import { SectionHeading } from "@/components/public/section-heading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const services: Record<string, { title: string; description: string; details: string[]; image: string }> = {
  "dna-analysis": {
    title: "DNA Analysis",
    description: "Advanced genetic profiling and individual identification using state-of-the-art sequencing technology.",
    details: [
      "STR (Short Tandem Repeat) profiling",
      "Mitochondrial DNA analysis",
      "Y-chromosome testing",
      "Familial DNA searching",
      "Degraded and touch DNA recovery",
      "Court-admissible reporting",
    ],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop",
  },
  "cyber-forensics": {
    title: "Cyber Forensics",
    description: "Digital evidence recovery and network intrusion analysis for cybercrime investigations.",
    details: [
      "Hard drive and SSD forensic imaging",
      "Mobile device data extraction",
      "Network traffic analysis",
      "Malware reverse engineering",
      "Email and social media forensics",
      "Cloud storage investigation",
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  },
  "ballistics": {
    title: "Ballistics Investigation",
    description: "Firearm discharge residue testing and projectile trajectory reconstruction.",
    details: [
      "Bullet and cartridge comparison",
      "Gunshot residue (GSR) analysis",
      "Trajectory reconstruction",
      "Firearm identification and classification",
      "Tool mark examination",
      "Distance determination testing",
    ],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
  },
  "toxicology": {
    title: "Toxicology Testing",
    description: "Detection and quantification of drugs, poisons and chemical substances in biological specimens.",
    details: [
      "Blood alcohol concentration testing",
      "Drug screening and confirmation",
      "Poison and heavy metal detection",
      "Post-mortem toxicology",
      "Workplace drug testing",
      "Pharmaceutical analysis",
    ],
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop",
  },
  "digital-evidence": {
    title: "Digital Evidence Recovery",
    description: "Encrypted device data extraction and forensic imaging for legal proceedings.",
    details: [
      "Deleted file recovery",
      "Encrypted volume decryption",
      "Forensic disk imaging",
      "Metadata analysis",
      "Database reconstruction",
      "Chain of custody documentation",
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  },
  "fingerprint-analysis": {
    title: "Fingerprint Analysis",
    description: "Latent print identification using chemical and digital enhancement techniques.",
    details: [
      "Latent print development",
      "AFIS database searching",
      "Chemical enhancement methods",
      "Digital print comparison",
      "Palm and footprint analysis",
      "Expert testimony support",
    ],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop",
  },
  "trace-evidence": {
    title: "Trace Evidence",
    description: "Microscopic material, fiber and residue analysis for forensic investigations.",
    details: [
      "Fiber and textile analysis",
      "Glass fragment comparison",
      "Paint chip examination",
      "Hair and soil analysis",
      "Gunshot residue detection",
      "Microscopic particle identification",
    ],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop",
  },
  "document-examination": {
    title: "Document Examination",
    description: "Handwriting analysis, forgery detection and document verification.",
    details: [
      "Handwriting comparison",
      "Signature verification",
      "Ink and paper analysis",
      "Altered document detection",
      "Typewriter and printer identification",
      "Indented writing recovery",
    ],
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop",
  },
  "crime-scene": {
    title: "Crime Scene Investigation",
    description: "On-site evidence collection, documentation and scene reconstruction.",
    details: [
      "Evidence collection and preservation",
      "Crime scene photography",
      "Bloodstain pattern analysis",
      "3D scene reconstruction",
      "Forensic mapping and sketching",
      "Chain of custody management",
    ],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
  },
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) notFound();

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back to Services
        </Link>

        {/* Hero image */}
        <div
          className="mb-12 h-64 w-full rounded-2xl bg-cover bg-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] md:h-80"
          style={{ backgroundImage: `url('${service.image}')` }}
        />

        <SectionHeading title={service.title} subtitle={service.description} />

        {/* Capabilities */}
        <div className="grid gap-4 sm:grid-cols-2">
          {service.details.map((d) => (
            <div
              key={d}
              className="flex items-start gap-3 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)]"
            >
              <span className="mt-1 size-2 shrink-0 rounded-full bg-[#2563EB]" />
              <span className="text-sm text-gray-700">{d}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/#request-quote"
            className="inline-flex rounded-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

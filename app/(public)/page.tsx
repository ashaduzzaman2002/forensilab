import { getPageMetadata } from "@/lib/actions/seo";

export const revalidate = 60;

import { Hero } from "@/components/public/hero";
import { Sectors } from "@/components/public/sectors";
import { Equipment } from "@/components/public/equipment";
import { CaseStudies } from "@/components/public/case-studies";
import { Testimonials } from "@/components/public/testimonials";
import { Certifications } from "@/components/public/certifications";
import { TrustedBy } from "@/components/public/trusted-by";
import { Locations } from "@/components/public/locations";
import { RequestQuote } from "@/components/public/request-quote";

export async function generateMetadata() { return getPageMetadata("home", { title: "ForensiLabs — Forensic Science Laboratory", description: "Empowering justice through scientific analysis" }); }

export default function HomePage() {
  return (
    <>
      <Hero />
      <Sectors />
      <Equipment />
      <CaseStudies />
      <Testimonials />
      <div className="relative bg-gradient-to-br from-white via-blue-50/60 to-blue-100/40">
        <div
          className="absolute inset-0 opacity-55 bg-repeat bg-center"
          style={{ backgroundImage: "url('/fingerprint.png')" }}
        />
        <div className="relative z-10">
          <Certifications />
          <TrustedBy />
        </div>
      </div>
      <Locations />
      <RequestQuote />
    </>
  );
}

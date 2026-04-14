import { getPageMetadata } from "@/lib/actions/seo";
import { Suspense } from "react";

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
import { Partnerships } from "@/components/public/partnerships";
import { HeroSkeleton, SectionSkeleton, CardGridSkeleton } from "@/components/public/skeletons";

export async function generateMetadata() { return getPageMetadata("home", { title: "ForensiLabs — Forensic Science Laboratory", description: "Empowering justice through scientific analysis" }); }

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}><Hero /></Suspense>
      <Suspense fallback={<SectionSkeleton rows={8} />}><Sectors /></Suspense>
      <Suspense fallback={<SectionSkeleton className="bg-[#F5F7FA]" rows={4} />}><Equipment /></Suspense>
      <Suspense fallback={<CardGridSkeleton count={6} />}><CaseStudies /></Suspense>
      <Suspense fallback={<SectionSkeleton className="bg-[#F5F7FA]" rows={3} />}><Testimonials /></Suspense>
      <div className="relative">
        <div className="absolute inset-0 opacity-55 bg-repeat bg-center" style={{ backgroundImage: "url('/fingerprint.png')" }} />
        <div className="relative z-10">
          <Suspense><Certifications /></Suspense>
          <Suspense><TrustedBy /></Suspense>
        </div>
      </div>
      <Suspense><Partnerships /></Suspense>
      <Suspense><Locations /></Suspense>
      <Suspense><RequestQuote /></Suspense>
    </>
  );
}

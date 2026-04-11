import { Hero } from "@/components/public/hero";
import { Equipment } from "@/components/public/equipment";
import { CaseStudies } from "@/components/public/case-studies";
import { Testimonials } from "@/components/public/testimonials";
import { Certifications } from "@/components/public/certifications";
import { TrustedBy } from "@/components/public/trusted-by";
import { Locations } from "@/components/public/locations";
import { RequestQuote } from "@/components/public/request-quote";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Equipment />
      <CaseStudies />
      <Testimonials />
      <Certifications />
      <TrustedBy />
      <Locations />
      <RequestQuote />
    </>
  );
}

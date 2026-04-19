import { getPageMetadata } from "@/lib/actions/seo";

export const revalidate = 60;

import { dbConnect } from "@/lib/db";
import { Service } from "@/lib/models/service";
import { SectionHeading } from "@/components/public/section-heading";
import { ServicesClient } from "./services-client";

export async function generateMetadata() { return getPageMetadata("services", { title: "Services — ForensiLabs", description: "Comprehensive forensic solutions powered by cutting-edge technology" }); }

export default async function ServicesPage() {
  await dbConnect();
  const services = await Service.find().sort({ order: 1 }).lean();
  const items = JSON.parse(JSON.stringify(services));

  return (
    <section className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <SectionHeading
        label="What We Do"
        title={<>Our Forensic<br />Services</>}
        description="Comprehensive forensic solutions powered by cutting-edge technology and expert analysis."
      />
      <ServicesClient items={items} />
    </section>
  );
}

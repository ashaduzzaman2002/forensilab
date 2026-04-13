import { getPageMetadata } from "@/lib/actions/seo";
import { dbConnect } from "@/lib/db";
import { Service } from "@/lib/models/service";

export async function generateMetadata() { return getPageMetadata("services", { title: "Services — ForensiLabs", description: "Comprehensive forensic solutions powered by cutting-edge technology" }); }
import { SectionHeading } from "@/components/public/section-heading";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ServicesPage() {
  await dbConnect();
  const services = await Service.find().sort({ order: 1 }).lean();
  const items = JSON.parse(JSON.stringify(services));

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.4'%3E%3Cellipse cx='60' cy='60' rx='15' ry='20'/%3E%3Cellipse cx='60' cy='60' rx='25' ry='33'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='46'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading title="Our Services" subtitle="Comprehensive forensic solutions powered by cutting-edge technology and expert analysis" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s: any) => (
            <Link
              key={s._id}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]"
            >
              {s.icon && (
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-blue-50 overflow-hidden transition-all duration-300 group-hover:bg-[#2563EB] group-hover:scale-110">
                  {s.icon.startsWith("<") ? (
                    <div className="text-[#2563EB] group-hover:text-white [&>svg]:size-8" dangerouslySetInnerHTML={{ __html: s.icon }} />
                  ) : (
                    <img src={s.icon} alt="" className="size-8 object-contain transition duration-300 [filter:brightness(0)_saturate(100%)_invert(26%)_sepia(95%)_saturate(2500%)_hue-rotate(215deg)] group-hover:[filter:brightness(0)_invert(1)_brightness(100)]" />
                  )}
                </div>
              )}
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

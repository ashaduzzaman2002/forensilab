import { dbConnect } from "@/lib/db";
import { Location } from "@/lib/models/location";
import { SectionHeading } from "./section-heading";
import { MotionCard } from "./motion-card";
import { AnimatedSection } from "./animated-section";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

export async function Locations() {
  await dbConnect();
  const hq = await Location.findOne({ isHeadquarters: true }).lean();
  if (!hq) return null;
  const loc = JSON.parse(JSON.stringify(hq));
  const mapsQuery = encodeURIComponent(loc.address);
  const embedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  return (
    <AnimatedSection>
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Locate Us" subtitle="Visit our state-of-the-art forensic laboratory" />
          <div className="grid gap-8 lg:grid-cols-2">
            <MotionCard index={0}>
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                {loc.mapEmbed ? (
                  <div className="h-80 w-full lg:h-full lg:min-h-[380px] [&>iframe]:h-full [&>iframe]:w-full" dangerouslySetInnerHTML={{ __html: loc.mapEmbed }} />
                ) : (
                  <iframe src={embedUrl} className="h-80 w-full lg:h-full lg:min-h-[380px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={loc.name} />
                )}
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-md px-4 py-2 text-xs font-semibold text-[#2563EB] shadow-md transition hover:bg-white">
                  Get Directions <ExternalLink className="size-3" />
                </a>
              </div>
            </MotionCard>
            <MotionCard index={1}>
              <div className="flex flex-col gap-8">
                <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                  <h3 className="font-heading text-lg font-bold text-gray-900">{loc.name}</h3>
                  <div className="mt-4 flex items-start gap-3 text-sm text-gray-600">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-[#2563EB]" />
                    <span>{loc.address}</span>
                  </div>
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#1E40AF]">
                    Get Directions <ExternalLink className="size-3" />
                  </a>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                  <h3 className="font-heading text-lg font-bold text-gray-900">Contact Information</h3>
                  <div className="mt-4 space-y-4">
                    {loc.phone && (
                      <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-[#2563EB]">
                        <Phone className="size-5 shrink-0 text-[#2563EB]" /> {loc.phone}
                      </a>
                    )}
                    {loc.email && (
                      <a href={`mailto:${loc.email}`} className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-[#2563EB]">
                        <Mail className="size-5 shrink-0 text-[#2563EB]" /> {loc.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </MotionCard>
          </div>
          <div className="mt-12 text-center">
            <Link href="/locations" className="inline-flex items-center gap-2 rounded-full border-2 border-[#2563EB] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white">
              View All Locations
            </Link>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

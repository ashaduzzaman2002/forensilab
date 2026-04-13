import { dbConnect } from "@/lib/db";
import { Location } from "@/lib/models/location";
import { SectionHeading } from "@/components/public/section-heading";
import { MapPin, Phone, Mail, ExternalLink, StarIcon } from "lucide-react";

export default async function LocationsPage() {
  await dbConnect();
  const docs = await Location.find().sort({ order: 1 }).lean();
  const locations = JSON.parse(JSON.stringify(docs));

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title="Our Locations" subtitle="Find a ForensiLabs facility near you" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc: any) => {
            const mapsQuery = encodeURIComponent(loc.address);
            const embedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
            return (
              <div key={loc._id} className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
                {loc.mapEmbed ? (
                  <div className="h-48 w-full [&>iframe]:h-full [&>iframe]:w-full" dangerouslySetInnerHTML={{ __html: loc.mapEmbed }} />
                ) : (
                  <iframe src={embedUrl} className="h-48 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={loc.name} />
                )}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-base font-bold text-gray-900">{loc.name}</h3>
                    {loc.isHeadquarters && <StarIcon className="size-3.5 fill-amber-400 text-amber-400" />}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
                    <span>{loc.address}</span>
                  </div>
                  {loc.phone && (
                    <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB]">
                      <Phone className="size-4 shrink-0 text-[#2563EB]" /> {loc.phone}
                    </a>
                  )}
                  {loc.email && (
                    <a href={`mailto:${loc.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB]">
                      <Mail className="size-4 shrink-0 text-[#2563EB]" /> {loc.email}
                    </a>
                  )}
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#1E40AF]">
                    Directions <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { dbConnect } from "@/lib/db";
import { Location } from "@/lib/models/location";
import { MapPin, Phone, Mail, ExternalLink, StarIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { MarqueeWrapper } from "./marquee-wrapper";

export async function Locations() {
  await dbConnect();
  const docs = await Location.find().sort({ order: 1 }).lean();
  const locations = JSON.parse(JSON.stringify(docs));
  if (locations.length === 0) return null;

  return (
    <section id="locations" className="bg-white px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <SectionHeading
        label="Our Offices"
        title={<>Locate Us</>}
        description="Visit our state-of-the-art forensic laboratories across India."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc: any) => {
          const mapsQuery = encodeURIComponent(loc.address);
          const embedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
          return (
            <div key={loc._id} className="overflow-hidden rounded-[10px] border border-border bg-white transition-colors duration-300 hover:border-primary">
              {loc.mapEmbed ? (
                <div className="h-48 w-full pointer-events-none [&>iframe]:h-full [&>iframe]:w-full" dangerouslySetInnerHTML={{ __html: loc.mapEmbed }} />
              ) : (
                <iframe src={embedUrl} className="h-48 w-full pointer-events-none" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={loc.name} />
              )}
              <div className="space-y-3 p-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-base font-bold text-foreground">{loc.name}</h3>
                  {loc.isHeadquarters && <StarIcon className="size-3.5 fill-amber-400 text-amber-400" />}
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-500">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{loc.address}</span>
                </div>
                {loc.phone && (
                  <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
                    <Phone className="size-4 shrink-0 text-primary" /> {loc.phone}
                  </a>
                )}
                {loc.email && (
                  <a href={`mailto:${loc.email}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
                    <Mail className="size-4 shrink-0 text-primary" /> {loc.email}
                  </a>
                )}
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.02em] text-primary transition-[gap] duration-200 hover:gap-[10px]">
                  Get Directions <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

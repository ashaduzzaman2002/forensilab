import { SectionHeading } from "./section-heading";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const address = "123 Lab Street, Science City, CA 90210";
const phone = "+1 (555) 000-0000";
const email = "info@forensilabs.com";
const mapsQuery = encodeURIComponent(address);
const embedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

export function Locations() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Locate Us"
          subtitle="Visit our state-of-the-art forensic laboratory"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <iframe
              src={embedUrl}
              className="h-80 w-full lg:h-full lg:min-h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ForensiLabs Location"
            />
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-md px-4 py-2 text-xs font-semibold text-[#2563EB] shadow-md transition hover:bg-white"
            >
              Get Directions <ExternalLink className="size-3" />
            </a>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-8">
            {/* Address */}
            <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <h3 className="font-heading text-lg font-bold text-gray-900">Our Address</h3>
              <div className="mt-4 flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="mt-0.5 size-5 shrink-0 text-[#2563EB]" />
                <span>{address}</span>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#1E40AF]"
              >
                Get Directions <ExternalLink className="size-3" />
              </a>
            </div>

            {/* Contact */}
            <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <h3 className="font-heading text-lg font-bold text-gray-900">Contact Information</h3>
              <div className="mt-4 space-y-4">
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-[#2563EB]">
                  <Phone className="size-5 shrink-0 text-[#2563EB]" />
                  {phone}
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-[#2563EB]">
                  <Mail className="size-5 shrink-0 text-[#2563EB]" />
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

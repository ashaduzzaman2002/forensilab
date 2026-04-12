"use client";

import { SectionHeading } from "@/components/public/section-heading";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const contactInfo = [
  { icon: <MapPin className="size-5" />, label: "Address", value: "123 Lab Street, Science City, CA 90210" },
  { icon: <Phone className="size-5" />, label: "Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
  { icon: <Mail className="size-5" />, label: "Email", value: "info@forensilabs.com", href: "mailto:info@forensilabs.com" },
  { icon: <Clock className="size-5" />, label: "Working Hours", value: "Mon – Fri: 9:00 AM – 6:00 PM" },
];

export default function ContactUsPage() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.4'%3E%3Cellipse cx='60' cy='60' rx='15' ry='20'/%3E%3Cellipse cx='60' cy='60' rx='25' ry='33'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='46'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Contact Us"
          subtitle="Get in touch with our forensic experts for inquiries, consultations, or support"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact form */}
          <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:p-10">
            <h3 className="font-heading text-lg font-bold text-gray-900">Send Us a Message</h3>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1E40AF] py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)]"
              >
                <Send className="size-4" /> Send Message
              </button>
            </form>
          </div>

          {/* Info + Map */}
          <div className="flex flex-col gap-6">
            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.1)]"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                    {c.icon}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-1 block text-sm font-medium text-gray-900 transition hover:text-[#2563EB]">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-gray-900">{c.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="flex-1 overflow-hidden rounded-2xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent("123 Lab Street, Science City, CA 90210")}&output=embed`}
                className="h-full min-h-[280px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ForensiLabs Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

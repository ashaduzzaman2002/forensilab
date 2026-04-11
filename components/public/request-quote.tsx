"use client";

import { SectionHeading } from "./section-heading";
import { User, ChevronDown, ShieldCheck } from "lucide-react";

const services = [
  "DNA Analysis",
  "Toxicology",
  "Digital Forensics",
  "Ballistics",
  "Trace Evidence",
  "Document Examination",
  "Other",
];

export function RequestQuote() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-white via-blue-50/60 to-blue-100/40">
      {/* Fingerprint pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232563EB' stroke-width='0.4'%3E%3Cellipse cx='60' cy='60' rx='15' ry='20'/%3E%3Cellipse cx='60' cy='60' rx='25' ry='33'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='46'/%3E%3Cellipse cx='60' cy='60' rx='45' ry='56'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <SectionHeading
          title="Request a Quote"
          subtitle="Tell us about your requirements and we'll get back to you within 24 hours"
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:p-10"
        >
          {/* Name */}
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Your full name"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-inner outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
          </div>

          {/* Service select */}
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Select Service or Product</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-10 text-sm shadow-inner outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20">
                <option value="">Choose a service...</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Requirement */}
          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Requirement</label>
            <textarea
              rows={4}
              placeholder="Describe your requirement..."
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1E40AF] py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
          >
            Submit Request
          </button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" />
            Your information is securely processed.
          </p>
        </form>
      </div>
    </section>
  );
}

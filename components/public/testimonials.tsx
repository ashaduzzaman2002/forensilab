"use client";

import { SectionHeading } from "./section-heading";
import { CheckCircle } from "lucide-react";
import { AnimatedSection } from "./animated-section";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Chief Forensic Officer, National Crime Lab",
    text: "ForensiLabs delivered exceptional DNA analysis results that were instrumental in closing a high-profile case. Their precision is unmatched.",
  },
  {
    name: "James Carter",
    role: "Senior Detective, Metro PD",
    text: "The ballistics team provided critical evidence within 48 hours. Their turnaround time and accuracy exceeded all expectations.",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Director, Toxicology Institute",
    text: "We've partnered with ForensiLabs for three years. Their chemical analysis capabilities and professionalism set the industry standard.",
  },
  {
    name: "Michael Torres",
    role: "Cybercrime Unit Lead, FBI",
    text: "Their digital forensics division recovered encrypted data that other labs couldn't. Truly cutting-edge technology and expertise.",
  },
  {
    name: "Emily Zhang",
    role: "Legal Counsel, Morrison & Associates",
    text: "Court-admissible reports, clear documentation, and expert testimony support. ForensiLabs is our go-to forensic partner.",
  },
  {
    name: "Robert Okafor",
    role: "Lab Manager, State Forensic Services",
    text: "The trace evidence analysis was thorough and delivered ahead of schedule. Their team communicates clearly at every step.",
  },
];

// Double the array for seamless infinite loop
const doubled = [...testimonials, ...testimonials];

export function Testimonials() {
  return (
    <AnimatedSection>
    <section className="relative overflow-hidden pt-24 pb-14 bg-white">
      {/* Floating glow dots */}
      <div className="absolute top-20 left-[10%] size-3 rounded-full bg-blue-400/30 blur-sm animate-pulse" />
      <div className="absolute top-40 right-[15%] size-2 rounded-full bg-blue-500/25 blur-sm animate-pulse [animation-delay:1s]" />
      <div className="absolute bottom-32 left-[25%] size-2.5 rounded-full bg-blue-400/20 blur-sm animate-pulse [animation-delay:2s]" />
      <div className="absolute bottom-20 right-[30%] size-2 rounded-full bg-blue-500/30 blur-sm animate-pulse [animation-delay:0.5s]" />
      <div className="absolute top-1/2 left-[60%] size-3 rounded-full bg-blue-400/20 blur-sm animate-pulse [animation-delay:1.5s]" />

      <div className="relative z-10">
        <SectionHeading
          title="Client Testimonials"
          subtitle="Trusted feedback from industry partners"
        />

        {/* Marquee carousel */}
        <div className="mt-10 overflow-hidden px-6">
          <div className="flex w-max gap-8 marquee-track">
            {doubled.map((t, i) => (
              <div
                key={i}
                className="w-[340px] shrink-0 rounded-2xl border mb-10 border-white/60 bg-white/70 backdrop-blur-md p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(37,99,235,0.1)]"
              >
                <p className="text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[#2563EB]">
                  <CheckCircle className="size-3.5" />
                  <span className="text-xs font-medium">Verified Client</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </AnimatedSection>
  );
}

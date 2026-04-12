"use client";

import { SectionHeading } from "./section-heading";
import { CheckCircle } from "lucide-react";
import { AnimatedSection } from "./animated-section";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  const doubled = [...testimonials, ...testimonials];

  return (
    <AnimatedSection>
      <section className="relative overflow-hidden pt-24 pb-14 bg-white">
        <div className="absolute top-20 left-[10%] size-3 rounded-full bg-blue-400/30 blur-sm animate-pulse" />
        <div className="absolute top-40 right-[15%] size-2 rounded-full bg-blue-500/25 blur-sm animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-32 left-[25%] size-2.5 rounded-full bg-blue-400/20 blur-sm animate-pulse [animation-delay:2s]" />
        <div className="absolute bottom-20 right-[30%] size-2 rounded-full bg-blue-500/30 blur-sm animate-pulse [animation-delay:0.5s]" />
        <div className="absolute top-1/2 left-[60%] size-3 rounded-full bg-blue-400/20 blur-sm animate-pulse [animation-delay:1.5s]" />

        <div className="relative z-10">
          <SectionHeading title="Client Testimonials" subtitle="Trusted feedback from industry partners" />

          <div className="mt-10 overflow-hidden px-6">
            <div className="flex w-max gap-8 marquee-track">
              {doubled.map((t, i) => (
                <div
                  key={i}
                  className="w-[340px] shrink-0 rounded-2xl border mb-10 border-white/60 bg-white/70 backdrop-blur-md p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(37,99,235,0.1)]"
                >
                  <p className="text-sm leading-relaxed text-gray-600">&ldquo;{t.text}&rdquo;</p>
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

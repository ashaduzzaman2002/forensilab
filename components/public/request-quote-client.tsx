"use client";

import { useTransition, useRef } from "react";
import { submitQuoteRequest } from "@/lib/actions/quote-request";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const services = ["Forensic Services", "Corporate Investigation", "Insurance Investigation", "Background Verification", "Training Programs", "Other"];

interface Contact { phone: string; email: string; website: string; address: string }

export function RequestQuoteClient({ contact }: { contact: Contact }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitQuoteRequest(formData);
      if (res.success) { toast.success("Quote request submitted!"); formRef.current?.reset(); }
    });
  }

  const inputClass = "w-full bg-white/[0.06] border border-white/10 rounded px-[14px] py-[11px] text-[13px] text-white outline-none placeholder:text-white/20 focus:border-primary font-sans";
  const labelClass = "block text-[11px] font-medium text-white/40 tracking-[0.06em] uppercase mb-[7px]";

  return (
    <section id="contact" className="bg-[#111] px-[60px] py-[100px] max-md:px-6 max-md:py-[72px]">
      <div className="grid gap-[72px] lg:grid-cols-2 items-center">
        <div>
          <h2 className="font-heading text-[clamp(36px,4vw,58px)] font-[800] leading-[1.05] tracking-[-1.5px] text-white">
            Get in<br /><span className="text-[#3378FF]">Touch</span><br />With Us
          </h2>
          <p className="mt-5 text-[15px] leading-[1.7] text-white/50 max-w-[400px]">
            Reach out to discuss your forensic needs. We respond within 24 hours and offer tailored solutions.
          </p>
          <div className="mt-9 flex flex-col gap-[14px]">
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-[14px] text-[14px] text-white/70 transition hover:text-white">
                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[15px]">📞</span>
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-[14px] text-[14px] text-white/70 transition hover:text-white">
                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[15px]">✉️</span>
                {contact.email}
              </a>
            )}
            {contact.website && (
              <a href={`https://${contact.website.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[14px] text-[14px] text-white/70 transition hover:text-white">
                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[15px]">🌐</span>
                {contact.website}
              </a>
            )}
            {contact.address && (
              <span className="flex items-center gap-[14px] text-[14px] text-white/70">
                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[15px]">📍</span>
                {contact.address}
              </span>
            )}
          </div>
        </div>

        <form ref={formRef} action={handleSubmit} className="rounded-[10px] border border-white/[0.08] bg-white/[0.04] p-11 max-md:p-7">
          <div className="font-heading text-[18px] font-bold text-white mb-7">Request a Quote</div>
          <div className="grid grid-cols-2 gap-[14px] mb-[14px] max-sm:grid-cols-1">
            <div>
              <label className={labelClass}>Name</label>
              <input name="name" type="text" required placeholder="Your full name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input name="email" type="email" required placeholder="your@email.com" className={inputClass} />
            </div>
          </div>
          <div className="mb-[14px]">
            <label className={labelClass}>Phone</label>
            <input name="phone" type="tel" required placeholder="+91 98765 43210" className={inputClass} />
          </div>
          <div className="mb-[14px]">
            <label className={labelClass}>Service</label>
            <select name="service" required className={`${inputClass} appearance-none`} style={{ colorScheme: "dark" }}>
              <option value="">Choose a service...</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="mb-[14px]">
            <label className={labelClass}>Requirement</label>
            <textarea name="requirement" rows={4} required placeholder="Describe your requirements..." className={`${inputClass} resize-y min-h-[90px]`} />
          </div>
          <button type="submit" disabled={isPending}
            className="mt-[6px] w-full rounded bg-primary py-[13px] text-[13px] font-semibold tracking-[0.04em] text-white transition hover:bg-[#3378FF] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Submit Request →
          </button>
        </form>
      </div>
    </section>
  );
}

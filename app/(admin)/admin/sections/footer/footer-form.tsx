"use client";

import { useState, useTransition } from "react";
import { updateFooter } from "@/lib/actions/footer";
import { toast } from "sonner";
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";

interface FooterData {
  description: string; phone: string; email: string; address: string;
  quickLinks: { label: string; href: string }[];
  socialLinks: { facebook: string; twitter: string; linkedin: string; instagram: string };
}

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

const defaultData: FooterData = {
  description: "Trusted forensic science laboratory delivering accurate and reliable results.",
  phone: "+1 (555) 000-0000", email: "info@forensilabs.com", address: "123 Lab Street, Science City",
  quickLinks: [{ label: "About Us", href: "/about" }, { label: "Services", href: "/services" }, { label: "Case Studies", href: "/#case-studies" }],
  socialLinks: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
};

export function FooterForm({ footer }: { footer: FooterData | null }) {
  const data = footer || defaultData;
  const [isPending, startTransition] = useTransition();
  const [links, setLinks] = useState(data.quickLinks || []);
  const [social, setSocial] = useState(data.socialLinks || { facebook: "", twitter: "", linkedin: "", instagram: "" });

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateFooter({
        description: formData.get("description") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        quickLinks: links.filter(l => l.label && l.href),
        socialLinks: social,
      });
      if (res.success) toast.success("Footer updated");
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Info */}
        <div className={`${cardClass} p-6 space-y-5`}>
          <div className="flex items-center gap-2 mb-2"><h3 className="text-sm font-semibold">Contact Info</h3></div>
          <div><label className={labelClass}>Description</label><textarea name="description" defaultValue={data.description} rows={2} className={`${inputClass} resize-none`} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Phone</label><input name="phone" defaultValue={data.phone} className={inputClass} /></div>
            <div><label className={labelClass}>Email</label><input name="email" defaultValue={data.email} className={inputClass} /></div>
          </div>
          <div><label className={labelClass}>Address</label><input name="address" defaultValue={data.address} className={inputClass} /></div>
        </div>

        {/* Social Links */}
        <div className={`${cardClass} p-6 space-y-5`}>
          <h3 className="text-sm font-semibold">Social Links</h3>
          {(["facebook", "twitter", "linkedin", "instagram"] as const).map((key) => (
            <div key={key}>
              <label className={labelClass}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input value={social[key]} onChange={(e) => setSocial({ ...social, [key]: e.target.value })} className={inputClass} placeholder="https://..." />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className={`${cardClass} p-6 space-y-4`}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Quick Links</h3>
          <button type="button" onClick={() => setLinks([...links, { label: "", href: "" }])} className="text-xs text-primary font-semibold flex items-center gap-1"><PlusIcon className="size-3" /> Add</button>
        </div>
        {links.map((l, i) => (
          <div key={i} className="flex gap-3 items-center">
            <input value={l.label} onChange={(e) => { const n = [...links]; n[i].label = e.target.value; setLinks(n); }} className={inputClass} placeholder="Label" />
            <input value={l.href} onChange={(e) => { const n = [...links]; n[i].href = e.target.value; setLinks(n); }} className={inputClass} placeholder="/about" />
            <button type="button" onClick={() => setLinks(links.filter((_, j) => j !== i))} className="text-destructive shrink-0"><Trash2Icon className="size-3.5" /></button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">
          {isPending && <Loader2Icon className="size-4 animate-spin" />} Save Changes
        </button>
      </div>
    </form>
  );
}

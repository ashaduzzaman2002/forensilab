"use client";

import { useState, useTransition } from "react";
import { updateSeo } from "@/lib/actions/seo";
import { toast } from "sonner";
import { Loader2Icon, ChevronDownIcon, CheckIcon } from "lucide-react";

interface Page { page: string; label: string; path: string; }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

export function SeoForm({ pages, seoMap }: { pages: Page[]; seoMap: Record<string, any> }) {
  const [active, setActive] = useState(pages[0].page);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const current = seoMap[active] || {};

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateSeo(active, {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        keywords: formData.get("keywords") as string,
        ogImage: formData.get("ogImage") as string,
      });
      if (res.success) {
        toast.success(`SEO updated for ${pages.find(p => p.page === active)?.label}`);
        setSaved({ ...saved, [active]: true });
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Page selector */}
      <div className={`${cardClass} p-4 space-y-1 lg:col-span-1`}>
        <p className={`${labelClass} px-3 mb-3`}>Pages</p>
        {pages.map((p) => (
          <button
            key={p.page}
            onClick={() => setActive(p.page)}
            className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${active === p.page ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-muted/50"}`}
          >
            <span>{p.label}</span>
            <span className="flex items-center gap-1">
              {seoMap[p.page] && <CheckIcon className="size-3 text-green-500" />}
              {active === p.page && <ChevronDownIcon className="size-3 rotate-[-90deg]" />}
            </span>
          </button>
        ))}
      </div>

      {/* SEO form */}
      <form key={active} action={handleSubmit} className={`${cardClass} p-6 space-y-5 lg:col-span-3`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">{pages.find(p => p.page === active)?.label} — SEO</h3>
          <span className="text-xs text-muted-foreground">{pages.find(p => p.page === active)?.path}</span>
        </div>
        <div>
          <label className={labelClass}>Page Title</label>
          <input name="title" defaultValue={current.title || ""} className={inputClass} placeholder="e.g. ForensiLabs — Forensic Science Laboratory" />
        </div>
        <div>
          <label className={labelClass}>Meta Description</label>
          <textarea name="description" defaultValue={current.description || ""} rows={3} className={`${inputClass} resize-none`} placeholder="Brief description for search engines (150-160 chars)" />
        </div>
        <div>
          <label className={labelClass}>Keywords</label>
          <input name="keywords" defaultValue={current.keywords || ""} className={inputClass} placeholder="forensic, laboratory, DNA analysis, toxicology" />
        </div>
        <div>
          <label className={labelClass}>OG Image URL</label>
          <input name="ogImage" defaultValue={current.ogImage || ""} className={inputClass} placeholder="https://..." />
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">
            {isPending && <Loader2Icon className="size-4 animate-spin" />} Save
          </button>
        </div>
      </form>
    </div>
  );
}

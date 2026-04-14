"use client";

import { useState, useTransition } from "react";
import { updateHero } from "@/lib/actions/hero";
import { toast } from "sonner";
import { Loader2Icon, TypeIcon, MousePointerClickIcon, BarChart3Icon, Plus, Trash2 } from "lucide-react";

interface Stat { value: string; label: string }

interface HeroData {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  stats: Stat[];
}

export function HeroForm({ hero }: { hero: HeroData | null }) {
  const [isPending, startTransition] = useTransition();
  const [stats, setStats] = useState<Stat[]>(hero?.stats || []);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateHero(formData);
      if (res.success) toast.success("Hero updated");
    });
  }

  const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";
  const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Text Content */}
      <div className={cardClass}>
        <div className="flex items-center gap-2 border-b border-border/30 px-6 py-3">
          <TypeIcon className="size-4 text-primary" />
          <h3 className="text-sm font-semibold">Text Content</h3>
        </div>
        <div className="space-y-5 p-6">
          <div>
            <label className={labelClass}>Badge Text</label>
            <input name="badge" defaultValue={hero?.badge || ""} className={inputClass} placeholder="e.g. DPIIT Recognized · ISO 9001:2015 Certified" />
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div>
              <label className={labelClass}>Heading Line 1</label>
              <input name="headingLine1" defaultValue={hero?.headingLine1 || ""} className={inputClass} required placeholder="Forensic" />
            </div>
            <div>
              <label className={labelClass}>Heading Line 2 (Accent)</label>
              <input name="headingLine2" defaultValue={hero?.headingLine2 || ""} className={inputClass} required placeholder="Solutions" />
            </div>
            <div>
              <label className={labelClass}>Heading Line 3</label>
              <input name="headingLine3" defaultValue={hero?.headingLine3 || ""} className={inputClass} placeholder="& Lab Services" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" defaultValue={hero?.description || ""} className={`${inputClass} min-h-[80px] resize-y`} required placeholder="Empowering justice through scientific analysis..." />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* CTA Buttons */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 border-b border-border/30 px-6 py-3">
            <MousePointerClickIcon className="size-4 text-primary" />
            <h3 className="text-sm font-semibold">Call to Action</h3>
          </div>
          <div className="space-y-5 p-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Primary Button</p>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelClass}>Text</label><input name="primaryBtnText" defaultValue={hero?.primaryBtnText || ""} className={inputClass} required /></div>
                <div><label className={labelClass}>Link</label><input name="primaryBtnLink" defaultValue={hero?.primaryBtnLink || ""} className={inputClass} required /></div>
              </div>
            </div>
            <div className="border-t border-border/30 pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Secondary Button</p>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelClass}>Text</label><input name="secondaryBtnText" defaultValue={hero?.secondaryBtnText || ""} className={inputClass} required /></div>
                <div><label className={labelClass}>Link</label><input name="secondaryBtnLink" defaultValue={hero?.secondaryBtnLink || ""} className={inputClass} required /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={cardClass}>
          <div className="flex items-center justify-between border-b border-border/30 px-6 py-3">
            <div className="flex items-center gap-2">
              <BarChart3Icon className="size-4 text-primary" />
              <h3 className="text-sm font-semibold">Stats</h3>
            </div>
            <button type="button" onClick={() => setStats([...stats, { value: "", label: "" }])}
              className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition hover:bg-primary/20"
            >
              <Plus className="size-3" /> Add
            </button>
          </div>
          <div className="space-y-3 p-6">
            {stats.length === 0 && <p className="text-sm text-muted-foreground">No stats yet. Click Add to create one.</p>}
            {stats.map((s, i) => (
              <div key={i} className="flex items-end gap-3">
                <div className="flex-1">
                  {i === 0 && <label className={labelClass}>Value</label>}
                  <input name="statValue" defaultValue={s.value} className={inputClass} placeholder="12+" required />
                </div>
                <div className="flex-[2]">
                  {i === 0 && <label className={labelClass}>Label</label>}
                  <input name="statLabel" defaultValue={s.label} className={inputClass} placeholder="Corporate Clients" required />
                </div>
                <button type="button" onClick={() => setStats(stats.filter((_, j) => j !== i))}
                  className="mb-0.5 rounded-md p-2 text-destructive/60 transition hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending && <Loader2Icon className="size-4 animate-spin" />}
          Save Changes
        </button>
      </div>
    </form>
  );
}

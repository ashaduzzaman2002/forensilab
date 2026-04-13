"use client";

import { useTransition } from "react";
import { createLocation, updateLocation } from "@/lib/actions/location";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

interface Data { _id: string; name: string; address: string; phone: string; email: string; isHeadquarters: boolean; }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

export function LocationForm({ location }: { location?: Data | null }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isEdit = !!location;

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = isEdit ? await updateLocation(location!._id, formData) : await createLocation(formData);
      if (res.success) { toast.success(isEdit ? "Updated" : "Created"); router.push("/admin/pages/home/locations"); }
    });
  }

  return (
    <form action={handleSubmit} className={`${cardClass} max-w-2xl space-y-5 p-6`}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" defaultValue={location?.name || ""} className={inputClass} required placeholder="e.g. Main Laboratory" />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input name="email" defaultValue={location?.email || ""} className={inputClass} placeholder="info@forensilabs.com" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Address</label>
        <textarea name="address" defaultValue={location?.address || ""} rows={2} className={`${inputClass} resize-none`} required />
      </div>
      <div>
        <label className={labelClass}>Map Embed Code</label>
        <textarea name="mapEmbed" defaultValue={location?.mapEmbed || ""} rows={3} className={`${inputClass} resize-none font-mono text-xs`} placeholder='Paste Google Maps embed <iframe> code here' />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Phone</label>
          <input name="phone" defaultValue={location?.phone || ""} className={inputClass} placeholder="+1 (555) 000-0000" />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isHeadquarters" defaultChecked={location?.isHeadquarters || false} className="size-4 rounded border-border accent-primary" />
            <span className="text-sm font-medium">Headquarters</span>
          </label>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">
          {isPending && <Loader2Icon className="size-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Create"}
        </button>
        <button type="button" onClick={() => router.push("/admin/pages/home/locations")} className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50">Cancel</button>
      </div>
    </form>
  );
}

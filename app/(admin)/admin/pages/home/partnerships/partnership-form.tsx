"use client";

import { useTransition } from "react";
import { createPartnership, updatePartnership } from "@/lib/actions/partnership";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

interface Data { _id: string; name: string; subtitle: string; type: string }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

export function PartnershipForm({ partnership }: { partnership?: Data | null }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isEdit = !!partnership;

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = isEdit ? await updatePartnership(partnership!._id, formData) : await createPartnership(formData);
      if (res.success) { toast.success(isEdit ? "Updated" : "Created"); router.push("/admin/pages/home/partnerships"); }
    });
  }

  return (
    <form action={handleSubmit} className={`${cardClass} max-w-xl space-y-5 p-6`}>
      <div>
        <label className={labelClass}>Name</label>
        <input name="name" defaultValue={partnership?.name || ""} className={inputClass} required placeholder="Adamas University" />
      </div>
      <div>
        <label className={labelClass}>Subtitle</label>
        <input name="subtitle" defaultValue={partnership?.subtitle || ""} className={inputClass} placeholder="e.g. UGC Recognised" />
      </div>
      <div>
        <label className={labelClass}>Type</label>
        <select name="type" defaultValue={partnership?.type || "mou"} className={inputClass}>
          <option value="mou">MOU</option>
          <option value="moa">MOA</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">
          {isPending && <Loader2Icon className="size-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Create"}
        </button>
        <button type="button" onClick={() => router.push("/admin/pages/home/partnerships")} className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50">Cancel</button>
      </div>
    </form>
  );
}

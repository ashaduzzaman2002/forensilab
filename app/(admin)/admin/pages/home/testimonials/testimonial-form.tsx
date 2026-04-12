"use client";

import { useTransition } from "react";
import { createTestimonial, updateTestimonial } from "@/lib/actions/testimonial";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

interface Props {
  testimonial?: { _id: string; name: string; role: string; text: string } | null;
}

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

export function TestimonialForm({ testimonial }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isEdit = !!testimonial;

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = isEdit
        ? await updateTestimonial(testimonial!._id, formData)
        : await createTestimonial(formData);
      if (res.success) {
        toast.success(isEdit ? "Testimonial updated" : "Testimonial added");
        router.push("/admin/pages/home/testimonials");
      }
    });
  }

  return (
    <form action={handleSubmit} className={`${cardClass} max-w-2xl space-y-5 p-6`}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" defaultValue={testimonial?.name || ""} className={inputClass} required placeholder="e.g. Dr. Sarah Mitchell" />
        </div>
        <div>
          <label className={labelClass}>Role</label>
          <input name="role" defaultValue={testimonial?.role || ""} className={inputClass} required placeholder="e.g. Chief Forensic Officer" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Testimonial</label>
        <textarea name="text" defaultValue={testimonial?.text || ""} rows={4} className={`${inputClass} resize-none`} required placeholder="What did they say..." />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending && <Loader2Icon className="size-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Add Testimonial"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/pages/home/testimonials")}
          className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

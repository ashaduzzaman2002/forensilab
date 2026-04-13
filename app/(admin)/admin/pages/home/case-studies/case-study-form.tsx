"use client";

import { useRef, useState, useTransition } from "react";
import { createCaseStudy, updateCaseStudy, getCaseStudyUploadUrl } from "@/lib/actions/case-study";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon, ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";

interface Data { _id: string; slug: string; title: string; description: string; icon: string; }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

async function uploadFile(file: File) {
  const { url, key } = await getCaseStudyUploadUrl(file.name, file.type);
  await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  return { key };
}

export function CaseStudyForm({ caseStudy }: { caseStudy?: Data | null }) {
  const [isPending, startTransition] = useTransition();
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState(caseStudy?.icon || "");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [slug, setSlug] = useState(caseStudy?.slug || "");
  const isEdit = !!caseStudy;

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isEdit) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const iconUpload = iconFile ? await uploadFile(iconFile) : undefined;
        const payload = {
          slug: formData.get("slug") as string,
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          icon: iconUpload,
          metaTitle: formData.get("metaTitle") as string,
          metaDescription: formData.get("metaDescription") as string,
          metaKeywords: formData.get("metaKeywords") as string,
        };
        const res = isEdit ? await updateCaseStudy(caseStudy!._id, payload) : await createCaseStudy(payload);
        if (res.success) { toast.success(isEdit ? "Updated" : "Created"); router.push("/admin/pages/home/case-studies"); }
      } catch { toast.error("Something went wrong"); }
    });
  }

  return (
    <form action={handleSubmit} className="grid gap-6 lg:grid-cols-3 max-w-4xl">
      <div className={`${cardClass} space-y-5 p-6 lg:col-span-2`}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input name="title" defaultValue={caseStudy?.title || ""} className={inputClass} required onChange={onTitleChange} />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} required placeholder="e.g. fingerprint-analysis" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" defaultValue={caseStudy?.description || ""} rows={3} className={`${inputClass} resize-none`} required />
        </div>
        <div className="border-t border-border/30 pt-5 mt-5 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">SEO Settings</h4>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Meta Title</label><input name="metaTitle" defaultValue={(caseStudy as any)?.metaTitle || ""} className={inputClass} /></div>
            <div><label className={labelClass}>Meta Keywords</label><input name="metaKeywords" defaultValue={(caseStudy as any)?.metaKeywords || ""} className={inputClass} /></div>
          </div>
          <div><label className={labelClass}>Meta Description</label><textarea name="metaDescription" defaultValue={(caseStudy as any)?.metaDescription || ""} rows={2} className={`${inputClass} resize-none`} /></div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">
            {isPending && <Loader2Icon className="size-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Create"}
          </button>
          <button type="button" onClick={() => router.push("/admin/pages/home/case-studies")} className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50">Cancel</button>
        </div>
      </div>

      <div className={`${cardClass} p-6 space-y-3`}>
        <label className={labelClass}>Icon</label>
        <div onClick={() => fileRef.current?.click()} className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40">
          {iconPreview ? (
            <>
              <Image src={iconPreview} alt="Icon" fill unoptimized className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">Replace</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted-foreground"><ImageIcon className="size-5" /><p className="text-xs">Upload</p></div>
          )}
        </div>
        {iconPreview && (
          <button type="button" onClick={() => { setIconFile(null); setIconPreview(""); }} className="inline-flex items-center gap-1 text-xs text-destructive hover:underline">
            <XIcon className="size-3" /> Remove
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setIconFile(f); setIconPreview(URL.createObjectURL(f)); } }} className="hidden" />
      </div>
    </form>
  );
}

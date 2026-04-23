"use client";

import { useRef, useState, useTransition } from "react";
import { createCaseStudy, updateCaseStudy, getCaseStudyUploadUrl } from "@/lib/actions/case-study";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon, ImageIcon, XIcon, FileIcon, UploadIcon } from "lucide-react";
import Image from "next/image";

interface Data { _id: string; slug: string; tag: string; badge: string; title: string; description: string; image: string; gradient: string; file?: string; fileName?: string }

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(caseStudy?.image || "");
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docName, setDocName] = useState(caseStudy?.fileName || "");
  const [removeFile, setRemoveFile] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [slug, setSlug] = useState(caseStudy?.slug || "");
  const isEdit = !!caseStudy;

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isEdit) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const imageUpload = imageFile ? await uploadFile(imageFile) : undefined;
        const fileUpload = docFile ? { ...(await uploadFile(docFile)), name: docFile.name } : undefined;
        const payload = {
          slug: formData.get("slug") as string, tag: formData.get("tag") as string, badge: formData.get("badge") as string,
          title: formData.get("title") as string, description: formData.get("description") as string, gradient: "",
          image: imageUpload, file: fileUpload, removeFile,
        };
        const res = isEdit ? await updateCaseStudy(caseStudy!._id, payload) : await createCaseStudy(payload);
        if (res.success) { toast.success(isEdit ? "Updated" : "Created"); router.push("/admin/pages/home/case-studies"); }
      } catch { toast.error("Something went wrong"); }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className={`${cardClass} space-y-5 p-6 lg:col-span-2`}>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Title</label><input name="title" defaultValue={caseStudy?.title || ""} className={inputClass} required onChange={onTitleChange} /></div>
            <div><label className={labelClass}>Slug</label><input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Tag</label><input name="tag" defaultValue={caseStudy?.tag || ""} className={inputClass} placeholder="e.g. Trace Evidence" /></div>
            <div><label className={labelClass}>Badge</label><input name="badge" defaultValue={caseStudy?.badge || ""} className={inputClass} placeholder="e.g. Fingerprint" /></div>
          </div>
          <div><label className={labelClass}>Short Description</label><textarea name="description" defaultValue={caseStudy?.description || ""} rows={3} className={`${inputClass} resize-none`} required /></div>

          {/* File Upload */}
          <div>
            <label className={labelClass}>Case Study File (PDF, DOC, PNG, JPEG)</label>
            <div onClick={() => docRef.current?.click()} className="mt-1 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/30 px-4 py-4 transition hover:border-primary/40">
              {docName ? (
                <><FileIcon className="size-5 text-primary" /><span className="flex-1 truncate text-sm font-medium">{docName}</span></>
              ) : (
                <><UploadIcon className="size-5 text-muted-foreground" /><span className="text-sm text-muted-foreground">Click to upload file</span></>
              )}
            </div>
            {docName && (
              <button type="button" onClick={() => { setDocFile(null); setDocName(""); setRemoveFile(true); }} className="mt-2 inline-flex items-center gap-1 text-xs text-destructive hover:underline">
                <XIcon className="size-3" /> Remove file
              </button>
            )}
            <input ref={docRef} type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setDocFile(f); setDocName(f.name); setRemoveFile(false); } }} className="hidden" />
          </div>
        </div>

        <div className={`${cardClass} p-6 space-y-3`}>
          <label className={labelClass}>Cover Image</label>
          <div onClick={() => imageRef.current?.click()} className="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40">
            {preview ? (<><Image src={preview} alt="Cover" fill unoptimized className="object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30"><span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">Replace</span></div></>) : (<div className="flex flex-col items-center gap-1 text-muted-foreground"><ImageIcon className="size-5" /><p className="text-xs">Upload</p></div>)}
          </div>
          {preview && <button type="button" onClick={() => { setImageFile(null); setPreview(""); }} className="inline-flex items-center gap-1 text-xs text-destructive hover:underline"><XIcon className="size-3" /> Remove</button>}
          <input ref={imageRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setPreview(URL.createObjectURL(f)); } }} className="hidden" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">{isPending && <Loader2Icon className="size-4 animate-spin" />}{isEdit ? "Save Changes" : "Create"}</button>
        <button type="button" onClick={() => router.push("/admin/pages/home/case-studies")} className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50">Cancel</button>
      </div>
    </form>
  );
}

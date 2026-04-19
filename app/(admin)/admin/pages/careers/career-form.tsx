"use client";

import { useRef, useState, useTransition } from "react";
import { createCareer, updateCareer, getCareerUploadUrl } from "@/lib/actions/career";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon, ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

interface Data { _id: string; slug: string; title: string; location: string; type: string; description: string; content: string; requirements: string; applyLink: string; isActive: boolean; image: string }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const quillModules = { toolbar: [[{ header: [2, 3, false] }], ["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link"], ["clean"]] };

async function uploadFile(file: File) {
  const { url, key } = await getCareerUploadUrl(file.name, file.type);
  await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  return { key };
}

export function CareerForm({ career }: { career?: Data | null }) {
  const [isPending, startTransition] = useTransition();
  const [isActive, setIsActive] = useState(career?.isActive ?? true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(career?.image || "");
  const [content, setContent] = useState(career?.content || "");
  const [slug, setSlug] = useState(career?.slug || "");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isEdit = !!career;

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isEdit) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const imageUpload = imageFile ? await uploadFile(imageFile) : undefined;
        const payload = {
          slug: formData.get("slug") as string,
          title: formData.get("title") as string,
          location: formData.get("location") as string,
          type: formData.get("type") as string,
          description: formData.get("description") as string,
          content,
          requirements: formData.get("requirements") as string,
          applyLink: formData.get("applyLink") as string,
          isActive,
          image: imageUpload,
        };
        const res = isEdit ? await updateCareer(career!._id, payload) : await createCareer(payload);
        if (res.success) { toast.success(isEdit ? "Updated" : "Created"); router.push("/admin/pages/careers"); }
      } catch { toast.error("Something went wrong"); }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className={`${cardClass} space-y-5 p-6 lg:col-span-2`}>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Job Title</label><input name="title" defaultValue={career?.title || ""} className={inputClass} required onChange={onTitleChange} /></div>
            <div><label className={labelClass}>Slug</label><input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Location</label><input name="location" defaultValue={career?.location || ""} className={inputClass} required placeholder="e.g. Mumbai, India" /></div>
            <div>
              <label className={labelClass}>Type</label>
              <select name="type" defaultValue={career?.type || "Full-time"} className={`${inputClass} appearance-none`}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>
          <div><label className={labelClass}>Short Description</label><textarea name="description" defaultValue={career?.description || ""} rows={3} className={`${inputClass} resize-none`} required /></div>
          <div>
            <label className={labelClass}>Detailed Content</label>
            <div className="mt-2 [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:border-border [&_.ql-toolbar]:border-border [&_.ql-editor]:min-h-[200px]">
              <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} />
            </div>
          </div>
          <div><label className={labelClass}>Requirements</label><textarea name="requirements" defaultValue={career?.requirements || ""} rows={4} className={`${inputClass} resize-none`} placeholder="One requirement per line" /></div>
          <div><label className={labelClass}>Apply Link</label><input name="applyLink" defaultValue={career?.applyLink || ""} className={inputClass} placeholder="https://forms.google.com/..." /></div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="size-4 rounded border-border accent-primary" />
              <span className="text-sm font-medium">Active listing</span>
            </label>
          </div>
        </div>

        <div className={`${cardClass} p-6 space-y-3`}>
          <label className={labelClass}>Thumbnail Image</label>
          <div onClick={() => fileRef.current?.click()} className="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40">
            {preview ? (<><Image src={preview} alt="Thumbnail" fill unoptimized className="object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30"><span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">Replace</span></div></>) : (<div className="flex flex-col items-center gap-1 text-muted-foreground"><ImageIcon className="size-5" /><p className="text-xs">Upload</p></div>)}
          </div>
          {preview && <button type="button" onClick={() => { setImageFile(null); setPreview(""); }} className="inline-flex items-center gap-1 text-xs text-destructive hover:underline"><XIcon className="size-3" /> Remove</button>}
          <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setPreview(URL.createObjectURL(f)); } }} className="hidden" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">{isPending && <Loader2Icon className="size-4 animate-spin" />}{isEdit ? "Save Changes" : "Create"}</button>
        <button type="button" onClick={() => router.push("/admin/pages/careers")} className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50">Cancel</button>
      </div>
    </form>
  );
}

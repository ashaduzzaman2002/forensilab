"use client";

import { useRef, useState, useTransition } from "react";
import { createService, updateService, getServiceUploadUrl } from "@/lib/actions/service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon, ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

interface ServiceData {
  _id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  thumbnail: string;
  content: string;
  details: string[];
}

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

function ImagePicker({ label, preview, onFile, onClear, aspect = "video" }: {
  label: string; preview: string; onFile: (f: File) => void; onClear: () => void; aspect?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>
      <div
        onClick={() => ref.current?.click()}
        className={`group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40 ${aspect === "square" ? "aspect-square" : "aspect-video"}`}
      >
        {preview ? (
          <>
            <Image src={preview} alt={label} fill unoptimized className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
              <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">Replace</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <ImageIcon className="size-5" />
            <p className="text-xs">Upload</p>
          </div>
        )}
      </div>
      {preview && (
        <button type="button" onClick={(e) => { e.stopPropagation(); onClear(); }} className="inline-flex items-center gap-1 text-xs text-destructive hover:underline">
          <XIcon className="size-3" /> Remove
        </button>
      )}
      <input ref={ref} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} className="hidden" />
    </div>
  );
}

async function uploadFile(file: File): Promise<{ key: string }> {
  const { url, key } = await getServiceUploadUrl(file.name, file.type);
  await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  return { key };
}

export function ServiceForm({ service }: { service?: ServiceData | null }) {
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState(service?.content || "");
  const router = useRouter();
  const isEdit = !!service;
  const [slug, setSlug] = useState(service?.slug || "");

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isEdit) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  }

  // File state: null = no change, File = new file, "remove" = clear
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);

  const [iconPreview, setIconPreview] = useState(service?.icon || "");
  const [thumbPreview, setThumbPreview] = useState(service?.thumbnail || "");

  function pickFile(setFile: (f: File | null) => void, setPreview: (s: string) => void) {
    return (file: File) => {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    };
  }

  function clearFile(setFile: (f: File | null) => void, setPreview: (s: string) => void) {
    return () => { setFile(null); setPreview(""); };
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const [iconUpload, thumbUpload] = await Promise.all([
          iconFile ? uploadFile(iconFile) : null,
          thumbFile ? uploadFile(thumbFile) : null,
        ]);

        const payload = {
          slug: formData.get("slug") as string,
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          content,
          details: (formData.get("details") as string || "").split("\n").map(d => d.trim()).filter(Boolean),
          icon: iconUpload || undefined,
          thumbnail: thumbUpload || undefined,
        };

        const res = isEdit
          ? await updateService(service!._id, payload)
          : await createService(payload);

        if (res.success) {
          toast.success(isEdit ? "Service updated" : "Service created");
          router.push("/admin/pages/services");
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: text fields */}
        <div className={`${cardClass} space-y-5 p-6 lg:col-span-2`}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title</label>
              <input name="title" defaultValue={service?.title || ""} className={inputClass} required onChange={onTitleChange} />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} required placeholder="e.g. dna-analysis" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Short Description</label>
            <textarea name="description" defaultValue={service?.description || ""} rows={2} className={`${inputClass} resize-none`} required />
          </div>
          <div>
            <label className={labelClass}>Detailed Description</label>
            <div className="mt-2 [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:border-border [&_.ql-toolbar]:border-border [&_.ql-editor]:min-h-[200px]">
              <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} />
            </div>
          </div>
        </div>

        {/* Right: image uploads */}
        <div className={`${cardClass} space-y-5 p-6`}>
          <ImagePicker label="Icon" preview={iconPreview} onFile={pickFile(setIconFile, setIconPreview)} onClear={clearFile(setIconFile, setIconPreview)} aspect="square" />
          <ImagePicker label="Thumbnail" preview={thumbPreview} onFile={pickFile(setThumbFile, setThumbPreview)} onClear={clearFile(setThumbFile, setThumbPreview)} />
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending && <Loader2Icon className="size-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Create Service"}
        </button>
        <button type="button" onClick={() => router.push("/admin/pages/services")} className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50">
          Cancel
        </button>
      </div>
    </form>
  );
}

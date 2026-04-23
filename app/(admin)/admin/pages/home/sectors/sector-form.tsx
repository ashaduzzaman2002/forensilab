"use client";

import { useRef, useState, useTransition } from "react";
import { createSector, updateSector, getSectorUploadUrl } from "@/lib/actions/sector";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon, ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";

interface SectorData { _id: string; image: string; name: string; description: string }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

async function uploadFile(file: File) {
  const { url, key } = await getSectorUploadUrl(file.name, file.type);
  await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  return { key };
}

export function SectorForm({ sector }: { sector?: SectorData | null }) {
  const [isPending, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(sector?.image || "");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isEdit = !!sector;

  function handleSubmit(fd: FormData) {
    startTransition(async () => {
      try {
        const imageUpload = imageFile ? await uploadFile(imageFile) : undefined;
        const payload = { name: fd.get("name") as string, description: fd.get("description") as string, image: imageUpload };
        const res = isEdit ? await updateSector(sector!._id, payload) : await createSector(payload);
        if (res.success) { toast.success(isEdit ? "Updated" : "Created"); router.push("/admin/pages/home/sectors"); router.refresh(); }
      } catch { toast.error("Something went wrong"); }
    });
  }

  return (
    <form action={handleSubmit} className={`${cardClass} max-w-xl space-y-5 p-6`}>
      <div>
        <label className={labelClass}>Icon Image</label>
        <div className="flex items-center gap-4">
          <div onClick={() => fileRef.current?.click()}
            className="group relative flex size-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40"
          >
            {preview ? (
              <Image src={preview} alt="Icon" fill unoptimized className="object-cover" />
            ) : (
              <ImageIcon className="size-5 text-muted-foreground" />
            )}
          </div>
          {preview && (
            <button type="button" onClick={() => { setImageFile(null); setPreview(""); }} className="inline-flex items-center gap-1 text-xs text-destructive hover:underline">
              <XIcon className="size-3" /> Remove
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setPreview(URL.createObjectURL(f)); } }} className="hidden" />
      </div>
      <div>
        <label className={labelClass}>Name</label>
        <input name="name" defaultValue={sector?.name || ""} className={inputClass} required placeholder="Banking & Finance" />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" defaultValue={sector?.description || ""} rows={3} className={`${inputClass} resize-none`} placeholder="Brief description..." />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">
          {isPending && <Loader2Icon className="size-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Create"}
        </button>
        <button type="button" onClick={() => router.push("/admin/pages/home/sectors")} className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50">Cancel</button>
      </div>
    </form>
  );
}

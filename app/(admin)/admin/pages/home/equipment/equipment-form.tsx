"use client";

import { useRef, useState, useTransition } from "react";
import { createEquipment, updateEquipment, getEquipmentUploadUrl } from "@/lib/actions/equipment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon, ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";

interface EquipmentData { _id: string; badge: string; name: string; category: string; description: string; image: string }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

async function uploadFile(file: File) {
  const { url, key } = await getEquipmentUploadUrl(file.name, file.type);
  await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  return { key };
}

export function EquipmentForm({ equipment }: { equipment?: EquipmentData | null }) {
  const [isPending, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(equipment?.image || "");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isEdit = !!equipment;

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const imageUpload = imageFile ? await uploadFile(imageFile) : undefined;
        const payload = {
          badge: formData.get("badge") as string,
          name: formData.get("name") as string,
          category: formData.get("category") as string,
          description: formData.get("description") as string,
          image: imageUpload,
        };
        const res = isEdit ? await updateEquipment(equipment!._id, payload) : await createEquipment(payload);
        if (res.success) { toast.success(isEdit ? "Updated" : "Created"); router.push("/admin/pages/home/equipment"); }
      } catch { toast.error("Something went wrong"); }
    });
  }

  return (
    <form action={handleSubmit} className="grid gap-6 lg:grid-cols-3 max-w-4xl">
      <div className={`${cardClass} space-y-5 p-6 lg:col-span-2`}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Name</label>
            <input name="name" defaultValue={equipment?.name || ""} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <input name="category" defaultValue={equipment?.category || ""} className={inputClass} required placeholder="e.g. Imaging, Lab Equipment" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Badge</label>
          <input name="badge" defaultValue={equipment?.badge || ""} className={inputClass} placeholder="e.g. Microscopy" />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" defaultValue={equipment?.description || ""} rows={3} className={`${inputClass} resize-none`} />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">
            {isPending && <Loader2Icon className="size-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Create"}
          </button>
          <button type="button" onClick={() => router.push("/admin/pages/home/equipment")} className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50">Cancel</button>
        </div>
      </div>

      <div className={`${cardClass} p-6 space-y-3`}>
        <label className={labelClass}>Image</label>
        <div onClick={() => fileRef.current?.click()} className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40">
          {preview ? (
            <>
              <Image src={preview} alt="Equipment" fill unoptimized className="object-cover" />
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
          <button type="button" onClick={() => { setImageFile(null); setPreview(""); }} className="inline-flex items-center gap-1 text-xs text-destructive hover:underline">
            <XIcon className="size-3" /> Remove
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setPreview(URL.createObjectURL(f)); } }} className="hidden" />
      </div>
    </form>
  );
}

"use client";

import { useRef, useState, useTransition } from "react";
import { createPartnership, updatePartnership, getPartnershipUploadUrl } from "@/lib/actions/partnership";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon, ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";

interface Data { _id: string; name: string; subtitle: string; type: string; image: string }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

async function uploadFile(file: File) {
  const { url, key } = await getPartnershipUploadUrl(file.name, file.type);
  await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  return { key };
}

export function PartnershipForm({ partnership }: { partnership?: Data | null }) {
  const [isPending, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(partnership?.image || "");
  const [removeImage, setRemoveImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isEdit = !!partnership;

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const imageUpload = imageFile ? await uploadFile(imageFile) : undefined;
        const payload = {
          name: formData.get("name") as string,
          subtitle: formData.get("subtitle") as string,
          type: formData.get("type") as string,
          image: imageUpload,
          removeImage,
        };
        const res = isEdit ? await updatePartnership(partnership!._id, payload) : await createPartnership(payload);
        if (res.success) { toast.success(isEdit ? "Updated" : "Created"); router.push("/admin/pages/home/partnerships"); }
      } catch { toast.error("Something went wrong"); }
    });
  }

  return (
    <form action={handleSubmit} className="grid gap-6 lg:grid-cols-3 max-w-4xl">
      <div className={`${cardClass} space-y-5 p-6 lg:col-span-2`}>
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
      </div>
      <div className={`${cardClass} p-6 space-y-3`}>
        <label className={labelClass}>Image (optional)</label>
        <div onClick={() => fileRef.current?.click()} className="group relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40">
          {imagePreview ? (
            <>
              <Image src={imagePreview} alt="Preview" fill unoptimized className="object-contain p-4" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">Replace</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted-foreground"><ImageIcon className="size-5" /><p className="text-xs">Upload image</p></div>
          )}
        </div>
        {imagePreview && (
          <button type="button" onClick={() => { setImageFile(null); setImagePreview(""); setRemoveImage(true); }} className="inline-flex items-center gap-1 text-xs text-destructive hover:underline">
            <XIcon className="size-3" /> Remove
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); setRemoveImage(false); } }} className="hidden" />
      </div>
    </form>
  );
}

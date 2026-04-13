"use client";
import { useRef, useState, useTransition } from "react";
import { createTeamMember, updateTeamMember, getTeamUploadUrl } from "@/lib/actions/team";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon, ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";

interface Data { _id: string; name: string; role: string; description: string; image: string; email: string; linkedin: string; }
const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

async function uploadFile(file: File) { const { url, key } = await getTeamUploadUrl(file.name, file.type); await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } }); return { key }; }

export function TeamForm({ member }: { member?: Data | null }) {
  const [isPending, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(member?.image || "");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isEdit = !!member;

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const imageUpload = imageFile ? await uploadFile(imageFile) : undefined;
        const payload = { name: formData.get("name") as string, role: formData.get("role") as string, description: formData.get("description") as string, email: formData.get("email") as string, linkedin: formData.get("linkedin") as string, image: imageUpload };
        const res = isEdit ? await updateTeamMember(member!._id, payload) : await createTeamMember(payload);
        if (res.success) { toast.success(isEdit ? "Updated" : "Created"); router.push("/admin/pages/team"); }
      } catch { toast.error("Something went wrong"); }
    });
  }

  return (
    <form action={handleSubmit} className="grid gap-6 lg:grid-cols-3 max-w-4xl">
      <div className={`${cardClass} space-y-5 p-6 lg:col-span-2`}>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Name</label><input name="name" defaultValue={member?.name || ""} className={inputClass} required /></div>
          <div><label className={labelClass}>Role</label><input name="role" defaultValue={member?.role || ""} className={inputClass} required /></div>
        </div>
        <div><label className={labelClass}>Description</label><textarea name="description" defaultValue={member?.description || ""} rows={3} className={`${inputClass} resize-none`} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Email</label><input name="email" defaultValue={member?.email || ""} className={inputClass} /></div>
          <div><label className={labelClass}>LinkedIn URL</label><input name="linkedin" defaultValue={member?.linkedin || ""} className={inputClass} placeholder="https://linkedin.com/in/..." /></div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">{isPending && <Loader2Icon className="size-4 animate-spin" />}{isEdit ? "Save Changes" : "Create"}</button>
          <button type="button" onClick={() => router.push("/admin/pages/team")} className="rounded-lg border px-6 py-2.5 text-sm font-semibold transition hover:bg-muted/50">Cancel</button>
        </div>
      </div>
      <div className={`${cardClass} p-6 space-y-3`}>
        <label className={labelClass}>Photo</label>
        <div onClick={() => fileRef.current?.click()} className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-full mx-auto w-40 border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40">
          {preview ? (<><Image src={preview} alt="Photo" fill unoptimized className="object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30 rounded-full"><span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">Replace</span></div></>) : (<div className="flex flex-col items-center gap-1 text-muted-foreground"><ImageIcon className="size-5" /><p className="text-xs">Upload</p></div>)}
        </div>
        {preview && <div className="text-center"><button type="button" onClick={() => { setImageFile(null); setPreview(""); }} className="inline-flex items-center gap-1 text-xs text-destructive hover:underline"><XIcon className="size-3" /> Remove</button></div>}
        <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setPreview(URL.createObjectURL(f)); } }} className="hidden" />
      </div>
    </form>
  );
}

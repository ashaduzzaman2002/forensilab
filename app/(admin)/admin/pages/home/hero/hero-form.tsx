"use client";

import { useRef, useState, useTransition } from "react";
import { updateHero, getHeroBgUploadUrl, saveHeroBgImage } from "@/lib/actions/hero";
import { toast } from "sonner";
import Image from "next/image";
import { ImageIcon, Loader2Icon, UploadCloudIcon, TypeIcon, MousePointerClickIcon } from "lucide-react";

interface HeroData {
  heading: string;
  subheading: string;
  subtitle: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  bgImage: string;
}

export function HeroForm({ hero }: { hero: HeroData | null }) {
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(hero?.bgImage || "");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateHero(formData);
      if (res.success) toast.success("Hero updated");
    });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url, key } = await getHeroBgUploadUrl(file.name, file.type);
      await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
      const res = await saveHeroBgImage(key);
      if (res.success) {
        setPreview(res.url);
        console.log("Hero bg image URL:", res.url);
        toast.success("Background image updated");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";
  const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Background Image — full width hero preview */}
      <div className={`${cardClass} overflow-hidden`}>
        <div className="flex items-center gap-2 border-b border-border/30 px-6 py-3">
          <UploadCloudIcon className="size-4 text-primary" />
          <h3 className="text-sm font-semibold">Background Image</h3>
        </div>
        <div className="p-6">
          <div
            onClick={() => fileRef.current?.click()}
            className="group relative flex aspect-[21/9] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40 hover:bg-primary/5"
          >
            {preview ? (
              <>
                <Image src={preview} alt="Hero bg" fill unoptimized className="object-cover transition group-hover:scale-[1.02]" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                  <span className="rounded-lg bg-white/90 px-4 py-2 text-xs font-semibold text-foreground opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">
                    Click to replace
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="rounded-full bg-primary/10 p-3">
                  <ImageIcon className="size-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Click to upload background image</p>
                <p className="text-xs">Recommended: 1920×900px or wider</p>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2 shadow-lg">
                  <Loader2Icon className="size-4 animate-spin text-primary" />
                  <span className="text-sm font-medium">Uploading…</span>
                </div>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Text Content */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 border-b border-border/30 px-6 py-3">
            <TypeIcon className="size-4 text-primary" />
            <h3 className="text-sm font-semibold">Text Content</h3>
          </div>
          <div className="space-y-5 p-6">
            <div>
              <label className={labelClass}>Heading Line 1</label>
              <input name="heading" defaultValue={hero?.heading || ""} className={inputClass} required placeholder="e.g. FORENSIC SOLUTIONS" />
            </div>
            <div>
              <label className={labelClass}>Heading Line 2</label>
              <input name="subheading" defaultValue={hero?.subheading || ""} className={inputClass} required placeholder="e.g. AND LAB SERVICES" />
            </div>
            <div>
              <label className={labelClass}>Subtitle</label>
              <input name="subtitle" defaultValue={hero?.subtitle || ""} className={inputClass} required placeholder="e.g. Empowering justice through scientific analysis" />
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 border-b border-border/30 px-6 py-3">
            <MousePointerClickIcon className="size-4 text-primary" />
            <h3 className="text-sm font-semibold">Call to Action</h3>
          </div>
          <div className="space-y-5 p-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Primary Button</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Text</label>
                  <input name="primaryBtnText" defaultValue={hero?.primaryBtnText || ""} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Link</label>
                  <input name="primaryBtnLink" defaultValue={hero?.primaryBtnLink || ""} className={inputClass} required />
                </div>
              </div>
            </div>
            <div className="border-t border-border/30 pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Secondary Button</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Text</label>
                  <input name="secondaryBtnText" defaultValue={hero?.secondaryBtnText || ""} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Link</label>
                  <input name="secondaryBtnLink" defaultValue={hero?.secondaryBtnLink || ""} className={inputClass} required />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50"
        >
          {isPending && <Loader2Icon className="size-4 animate-spin" />}
          Save Changes
        </button>
      </div>
    </form>
  );
}

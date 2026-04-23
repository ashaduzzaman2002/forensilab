"use client";
import { useRef, useState, useTransition } from "react";
import { updateAbout, getAboutUploadUrl } from "@/lib/actions/about";
import { toast } from "sonner";
import { Loader2Icon, ImageIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

interface Section { title: string; content: string; image: string }
interface AboutData { subtitle: string; whoWeAre: Section; whatWeDo: Section; others: Section; highlights: string[]; stats: { value: string; label: string }[] }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const quillModules = { toolbar: [[{ header: [2, 3, false] }], ["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link"], ["clean"]] };

async function uploadFile(file: File) {
  const { url, key } = await getAboutUploadUrl(file.name, file.type);
  await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
  return { key };
}

function SectionEditor({ label, section, content, onContentChange, imageFile, imagePreview, onImageChange }: {
  label: string; section: Section; content: string; onContentChange: (v: string) => void;
  imageFile: File | null; imagePreview: string; onImageChange: (f: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className={`${cardClass} p-6 space-y-5`}>
      <h3 className="text-sm font-bold text-primary">{label}</h3>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div><label className={labelClass}>Title</label><input name={`${label}-title`} defaultValue={section.title} className={inputClass} /></div>
          <div>
            <label className={labelClass}>Content</label>
            <div className="mt-2 [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:border-border [&_.ql-toolbar]:border-border [&_.ql-editor]:min-h-[120px]">
              <ReactQuill theme="snow" value={content} onChange={onContentChange} modules={quillModules} />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <label className={labelClass}>Image</label>
          <div onClick={() => fileRef.current?.click()} className="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition hover:border-primary/40">
            {imagePreview ? (
              <><Image src={imagePreview} alt={label} fill unoptimized className="object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30"><span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">Replace</span></div></>
            ) : (
              <div className="flex flex-col items-center gap-1 text-muted-foreground"><ImageIcon className="size-5" /><p className="text-xs">Upload</p></div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) onImageChange(f); }} className="hidden" />
        </div>
      </div>
    </div>
  );
}

export function AboutForm({ about }: { about: AboutData | null }) {
  const [isPending, startTransition] = useTransition();
  const empty = { title: "", content: "", image: "" };

  const [whoContent, setWhoContent] = useState(about?.whoWeAre?.content || "");
  const [whatContent, setWhatContent] = useState(about?.whatWeDo?.content || "");
  const [othersContent, setOthersContent] = useState(about?.others?.content || "");

  const [whoImg, setWhoImg] = useState<File | null>(null);
  const [whatImg, setWhatImg] = useState<File | null>(null);
  const [othersImg, setOthersImg] = useState<File | null>(null);

  const [whoPrev, setWhoPrev] = useState(about?.whoWeAre?.image || "");
  const [whatPrev, setWhatPrev] = useState(about?.whatWeDo?.image || "");
  const [othersPrev, setOthersPrev] = useState(about?.others?.image || "");

  const [stats, setStats] = useState(about?.stats || [{ value: "", label: "" }]);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const [whoUpload, whatUpload, othersUpload] = await Promise.all([
          whoImg ? uploadFile(whoImg) : undefined,
          whatImg ? uploadFile(whatImg) : undefined,
          othersImg ? uploadFile(othersImg) : undefined,
        ]);
        const highlights = (formData.get("highlights") as string || "").split("\n").map(h => h.trim()).filter(Boolean);
        await updateAbout({
          subtitle: formData.get("subtitle") as string,
          whoWeAre: { title: formData.get("Who We Are-title") as string, content: whoContent, image: whoUpload },
          whatWeDo: { title: formData.get("What We Do-title") as string, content: whatContent, image: whatUpload },
          others: { title: formData.get("Others-title") as string, content: othersContent, image: othersUpload },
          highlights, stats: stats.filter(s => s.value && s.label),
        });
        toast.success("About page updated");
      } catch { toast.error("Something went wrong"); }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className={`${cardClass} p-6`}>
        <label className={labelClass}>Subtitle</label>
        <input name="subtitle" defaultValue={about?.subtitle || ""} className={inputClass} />
      </div>

      <SectionEditor label="Who We Are" section={about?.whoWeAre || empty} content={whoContent} onContentChange={setWhoContent} imageFile={whoImg} imagePreview={whoPrev} onImageChange={(f) => { setWhoImg(f); setWhoPrev(URL.createObjectURL(f)); }} />
      <SectionEditor label="What We Do" section={about?.whatWeDo || empty} content={whatContent} onContentChange={setWhatContent} imageFile={whatImg} imagePreview={whatPrev} onImageChange={(f) => { setWhatImg(f); setWhatPrev(URL.createObjectURL(f)); }} />
      <SectionEditor label="Others" section={about?.others || empty} content={othersContent} onContentChange={setOthersContent} imageFile={othersImg} imagePreview={othersPrev} onImageChange={(f) => { setOthersImg(f); setOthersPrev(URL.createObjectURL(f)); }} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`${cardClass} p-6`}>
          <label className={labelClass}>Highlights (one per line)</label>
          <textarea name="highlights" defaultValue={about?.highlights?.join("\n") || ""} rows={4} className={`${inputClass} resize-none`} placeholder={"Certified & Accredited Lab\nAdvanced Technology"} />
        </div>
        <div className={`${cardClass} p-6 space-y-3`}>
          <div className="flex items-center justify-between"><label className={labelClass}>Stats</label><button type="button" onClick={() => setStats([...stats, { value: "", label: "" }])} className="text-xs text-primary font-semibold flex items-center gap-1"><PlusIcon className="size-3" /> Add</button></div>
          {stats.map((s, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={s.value} onChange={(e) => { const n = [...stats]; n[i].value = e.target.value; setStats(n); }} className={`${inputClass} w-20`} placeholder="500+" />
              <input value={s.label} onChange={(e) => { const n = [...stats]; n[i].label = e.target.value; setStats(n); }} className={inputClass} placeholder="Cases Solved" />
              <button type="button" onClick={() => setStats(stats.filter((_, j) => j !== i))} className="text-destructive shrink-0"><Trash2Icon className="size-3.5" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50">
          {isPending && <Loader2Icon className="size-4 animate-spin" />} Save Changes
        </button>
      </div>
    </form>
  );
}

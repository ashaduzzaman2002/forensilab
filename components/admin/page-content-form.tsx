"use client";

import { useState, useTransition } from "react";
import { updatePageContent } from "@/lib/actions/page-content";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const quillModules = { toolbar: [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link"], ["clean"]] };

export function PageContentForm({ slug, data }: { slug: string; data: { title: string; content: string } | null }) {
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState(data?.content || "");

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updatePageContent(slug, formData.get("title") as string, content);
      if (res.success) toast.success("Saved");
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-4xl">
      <div className={`${cardClass} p-6 space-y-5`}>
        <div><label className={labelClass}>Title</label><input name="title" defaultValue={data?.title || ""} className={inputClass} required /></div>
        <div>
          <label className={labelClass}>Content</label>
          <div className="mt-2 [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:border-border [&_.ql-toolbar]:border-border [&_.ql-editor]:min-h-[300px]">
            <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} />
          </div>
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

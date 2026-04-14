"use client";

import { useTransition } from "react";
import { deleteCaseStudy } from "@/lib/actions/case-study";
import { toast } from "sonner";
import Link from "next/link";
import { PlusIcon, Trash2Icon, PencilIcon, BookOpenIcon } from "lucide-react";

interface Item { _id: string; slug: string; tag?: string; badge?: string; title: string; description: string; gradient?: string }
const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";

export function CaseStudyList({ items }: { items: Item[] }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this case study?")) return;
    startTransition(async () => {
      const res = await deleteCaseStudy(id);
      if (res.success) { toast.success("Deleted"); window.location.reload(); }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/pages/home/case-studies/add" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90">
          <PlusIcon className="size-4" /> Add Case Study
        </Link>
      </div>
      {items.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}>
          <BookOpenIcon className="mx-auto size-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No case studies yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className={`${cardClass} overflow-hidden`}>
              <div className="h-24 w-full" style={{ background: item.gradient || "linear-gradient(135deg,#0A1A40,#0057FF)" }}>
                {item.badge && (
                  <span className="m-2 inline-block rounded-full border border-white/25 bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase text-white">{item.badge}</span>
                )}
              </div>
              <div className="p-5">
                {item.tag && <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">{item.tag}</div>}
                <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="mt-3 flex gap-2">
                  <Link href={`/admin/pages/home/case-studies/${item._id}/edit`} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-muted/50">
                    <PencilIcon className="size-3" /> Edit
                  </Link>
                  <button onClick={() => handleDelete(item._id)} disabled={isPending} className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10 disabled:opacity-50">
                    <Trash2Icon className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

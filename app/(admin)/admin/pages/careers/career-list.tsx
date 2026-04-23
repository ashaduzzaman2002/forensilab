"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCareer } from "@/lib/actions/career";
import { toast } from "sonner";
import Link from "next/link";
import { PlusIcon, Trash2Icon, PencilIcon, BriefcaseIcon } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Item { _id: string; title: string; location: string; type: string; description: string; isActive: boolean }
const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";

export function CareerList({ items }: { items: Item[] }) {
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  function handleDelete() {
    if (!deleteId) return;
    startTransition(async () => {
      const res = await deleteCareer(deleteId);
      setDeleteId(null);
      if (res.success) { toast.success("Deleted"); router.refresh(); }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/pages/careers/add" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90">
          <PlusIcon className="size-4" /> Add Career
        </Link>
      </div>
      {items.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}>
          <BriefcaseIcon className="mx-auto size-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No career listings yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className={`${cardClass} overflow-hidden`}>
              <div className="h-24 w-full" style={{ background: "linear-gradient(135deg,#0A1A40,#0057FF)" }}>
                <span className="m-2 inline-block rounded-full border border-white/25 bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase text-white">{item.type}</span>
              </div>
              <div className="p-5">
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                  {!item.isActive && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-500">Inactive</span>}
                </div>
                <p className="text-xs text-muted-foreground">{item.location}</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="mt-3 flex gap-2">
                  <Link href={`/admin/pages/careers/${item._id}/edit`} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-muted/50">
                    <PencilIcon className="size-3" /> Edit
                  </Link>
                  <button onClick={() => setDeleteId(item._id)} disabled={isPending} className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10 disabled:opacity-50">
                    <Trash2Icon className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Career</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this career listing? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending} variant="destructive">{isPending ? "Deleting..." : "Delete"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCertification } from "@/lib/actions/certification";
import { toast } from "sonner";
import Link from "next/link";
import { PlusIcon, Trash2Icon, PencilIcon, ShieldCheckIcon } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Item { _id: string; title: string; text: string; icon: string; }
const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";

export function CertificationList({ items }: { items: Item[] }) {
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  function handleDelete() {
    if (!deleteId) return;
    startTransition(async () => {
      const res = await deleteCertification(deleteId);
      setDeleteId(null);
      if (res.success) { toast.success("Deleted"); router.refresh(); }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/pages/home/certifications/add" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90">
          <PlusIcon className="size-4" /> Add Certification
        </Link>
      </div>
      {items.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}>
          <ShieldCheckIcon className="mx-auto size-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No certifications yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className={`${cardClass} p-5 text-center`}>
              <h3 className="font-heading text-sm font-semibold text-gray-900">{item.title}</h3>
              {item.text && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.text}</p>}
              <div className="mt-3 flex justify-center gap-2">
                <Link href={`/admin/pages/home/certifications/${item._id}/edit`} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-muted/50">
                  <PencilIcon className="size-3" /> Edit
                </Link>
                <button onClick={() => setDeleteId(item._id)} disabled={isPending} className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10 disabled:opacity-50">
                  <Trash2Icon className="size-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certification</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this certification? This action cannot be undone.</AlertDialogDescription>
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

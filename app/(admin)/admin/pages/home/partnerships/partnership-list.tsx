"use client";

import { useTransition } from "react";
import { deletePartnership } from "@/lib/actions/partnership";
import { toast } from "sonner";
import Link from "next/link";
import { PlusIcon, Trash2Icon, PencilIcon, HandshakeIcon } from "lucide-react";

interface Item { _id: string; name: string; subtitle: string; type: string }
const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";

export function PartnershipList({ items }: { items: Item[] }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    startTransition(async () => {
      const res = await deletePartnership(id);
      if (res.success) { toast.success("Deleted"); window.location.reload(); }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/pages/home/partnerships/add" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90">
          <PlusIcon className="size-4" /> Add Partnership
        </Link>
      </div>
      {items.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}>
          <HandshakeIcon className="mx-auto size-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No partnerships yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className={`${cardClass} p-5`}>
              <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${item.type === "mou" ? "bg-[#E8F0FF] text-primary" : "bg-[#FEF3C7] text-[#92400E]"}`}>{item.type}</span>
              <h3 className="mt-2 text-sm font-semibold">{item.name}</h3>
              {item.subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{item.subtitle}</p>}
              <div className="mt-3 flex gap-2">
                <Link href={`/admin/pages/home/partnerships/${item._id}/edit`} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-muted/50">
                  <PencilIcon className="size-3" /> Edit
                </Link>
                <button onClick={() => handleDelete(item._id)} disabled={isPending} className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10 disabled:opacity-50">
                  <Trash2Icon className="size-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useTransition } from "react";
import { deleteSector } from "@/lib/actions/sector";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { PlusIcon, Trash2Icon, PencilIcon, LayoutGridIcon } from "lucide-react";

interface Item { _id: string; image: string; name: string; description: string }

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";

export function SectorList({ items }: { items: Item[] }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this sector?")) return;
    startTransition(async () => {
      const res = await deleteSector(id);
      if (res.success) { toast.success("Deleted"); window.location.reload(); }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/pages/home/sectors/add" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90">
          <PlusIcon className="size-4" /> Add Sector
        </Link>
      </div>

      {items.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}>
          <LayoutGridIcon className="mx-auto size-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No sectors yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className={`${cardClass} p-5`}>
              <div className="flex items-start justify-between">
                <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-lg bg-[#E8F0FF]">
                  {item.image ? <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" /> : <LayoutGridIcon className="size-4 text-primary" />}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold">{item.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              <div className="mt-3 flex gap-2">
                <Link href={`/admin/pages/home/sectors/${item._id}/edit`} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-muted/50">
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

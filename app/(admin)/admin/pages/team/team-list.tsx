"use client";
import { useTransition } from "react";
import { deleteTeamMember } from "@/lib/actions/team";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { PlusIcon, Trash2Icon, PencilIcon, UsersIcon } from "lucide-react";

interface Item { _id: string; name: string; role: string; description: string; image: string; email: string; linkedin: string; }
const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";

export function TeamList({ items }: { items: Item[] }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete(id: string) { if (!confirm("Delete?")) return; startTransition(async () => { const r = await deleteTeamMember(id); if (r.success) { toast.success("Deleted"); window.location.reload(); } }); }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/pages/team/add" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90"><PlusIcon className="size-4" /> Add Member</Link>
      </div>
      {items.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}><UsersIcon className="mx-auto size-8 text-muted-foreground/40" /><p className="mt-3 text-sm text-muted-foreground">No team members yet.</p></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className={`${cardClass} overflow-hidden text-center`}>
              {item.image && <div className="relative mx-auto mt-6 size-20 overflow-hidden rounded-full"><Image src={item.image} alt={item.name} fill unoptimized className="object-cover" /></div>}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                <p className="mt-0.5 text-xs text-primary font-medium">{item.role}</p>
                <div className="mt-3 flex justify-center gap-2">
                  <Link href={`/admin/pages/team/${item._id}/edit`} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-muted/50"><PencilIcon className="size-3" /> Edit</Link>
                  <button onClick={() => handleDelete(item._id)} disabled={isPending} className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10 disabled:opacity-50"><Trash2Icon className="size-3" /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

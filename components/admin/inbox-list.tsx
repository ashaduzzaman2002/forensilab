"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchIcon, Trash2Icon, CircleDotIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface Column { key: string; label: string; }

interface Props {
  items: any[];
  columns: Column[];
  total: number;
  pages: number;
  page: number;
  basePath: string;
  deleteAction: (id: string) => Promise<{ success: boolean }>;
}

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";

export function InboxList({ items, columns, total, pages, page, basePath, deleteAction }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function navigate(params: Record<string, string>) {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => { if (v) sp.set(k, v); else sp.delete(k); });
    if (params.search !== undefined || params.filter !== undefined) sp.delete("page");
    router.push(`${basePath}?${sp.toString()}`);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    startTransition(async () => { const r = await deleteAction(id); if (r.success) { toast.success("Deleted"); router.refresh(); } });
  }

  const currentFilter = searchParams.get("filter") || "";
  const currentSearch = searchParams.get("search") || "";

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            defaultValue={currentSearch}
            placeholder="Search..."
            onKeyDown={(e) => { if (e.key === "Enter") navigate({ search: (e.target as HTMLInputElement).value }); }}
            className="w-full rounded-lg border border-border bg-white pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {["", "unread", "read"].map((f) => (
          <button key={f} onClick={() => navigate({ filter: f })} className={`rounded-lg px-4 py-2.5 text-xs font-semibold transition ${currentFilter === f ? "bg-primary text-white" : "border border-border bg-white hover:bg-muted/50"}`}>
            {f === "" ? "All" : f === "unread" ? "Unread" : "Read"}
          </button>
        ))}
        <span className="flex items-center text-xs text-muted-foreground">{total} total</span>
      </div>

      {/* Table */}
      {items.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}><p className="text-sm text-muted-foreground">No submissions found.</p></div>
      ) : (
        <div className={`${cardClass} overflow-hidden`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-8"></th>
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="px-4 py-3 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className={`border-b border-border/20 transition hover:bg-muted/20 ${!item.isRead ? "bg-primary/[0.03]" : ""}`}>
                  <td className="px-4 py-3">{!item.isRead && <CircleDotIcon className="size-3 text-primary" />}</td>
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">
                      <Link href={`${basePath}/${item._id}`} className="hover:text-primary transition">
                        <span className={!item.isRead ? "font-semibold" : ""}>{item[c.key]}</span>
                      </Link>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(item._id)} disabled={isPending} className="text-destructive hover:text-destructive/80 disabled:opacity-50"><Trash2Icon className="size-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => navigate({ page: String(p) })} className={`size-9 rounded-lg text-xs font-semibold transition ${p === page ? "bg-primary text-white" : "border border-border bg-white hover:bg-muted/50"}`}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}

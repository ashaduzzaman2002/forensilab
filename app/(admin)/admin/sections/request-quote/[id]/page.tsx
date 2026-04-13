import { notFound } from "next/navigation";
import { getQuoteRequestById, markQuoteAsRead } from "@/lib/actions/quote-request";
import { PageHeader } from "@/components/admin/page-header";
import { MessageSquareQuoteIcon } from "lucide-react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const cardClass = "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]";
const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getQuoteRequestById(id);
  if (!item) notFound();

  if (!item.isRead) await markQuoteAsRead(id);

  return (
    <>
      <PageHeader title="Quote Request" description={`From ${item.name}`} icon={MessageSquareQuoteIcon} />
      <Link href="/admin/sections/request-quote" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
        <ArrowLeftIcon className="size-4" /> Back to all requests
      </Link>
      <div className={`${cardClass} max-w-2xl p-6 space-y-5`}>
        <div className="grid grid-cols-2 gap-4">
          <div><p className={labelClass}>Name</p><p className="mt-1 text-sm font-medium">{item.name}</p></div>
          <div><p className={labelClass}>Email</p><p className="mt-1 text-sm font-medium"><a href={`mailto:${item.email}`} className="text-primary hover:underline">{item.email}</a></p></div>
        </div>
        <div><p className={labelClass}>Service</p><p className="mt-1 text-sm font-medium">{item.service}</p></div>
        <div><p className={labelClass}>Requirement</p><p className="mt-1 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{item.requirement}</p></div>
        <div className="border-t border-border/30 pt-4">
          <p className="text-xs text-muted-foreground">Submitted on {new Date(item.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}

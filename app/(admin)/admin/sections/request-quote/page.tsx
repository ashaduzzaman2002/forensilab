import { getQuoteRequests, deleteQuoteRequest } from "@/lib/actions/quote-request";
import { PageHeader } from "@/components/admin/page-header";
import { MessageSquareQuoteIcon } from "lucide-react";
import { InboxList } from "@/components/admin/inbox-list";

export default async function AdminQuotesPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; filter?: string }> }) {
  const sp = await searchParams;
  const data = await getQuoteRequests({ page: Number(sp.page) || 1, search: sp.search, filter: sp.filter });

  return (
    <>
      <PageHeader title="Quote Requests" description="View and manage quote request submissions." icon={MessageSquareQuoteIcon} />
      <InboxList
        items={data.items}
        columns={[{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "service", label: "Service" }]}
        total={data.total}
        pages={data.pages}
        page={data.page}
        basePath="/admin/sections/request-quote"
        deleteAction={deleteQuoteRequest}
      />
    </>
  );
}

import { getPageContent } from "@/lib/actions/page-content";
import { PageHeader } from "@/components/admin/page-header";
import { FileTextIcon } from "lucide-react";
import { PageContentForm } from "@/components/admin/page-content-form";

export default async function AdminTermsPage() {
  const data = await getPageContent("terms-of-service");
  return (
    <>
      <PageHeader title="Terms of Service" description="Edit the terms of service page." icon={FileTextIcon} />
      <PageContentForm slug="terms-of-service" data={data} />
    </>
  );
}

import { getPageContent } from "@/lib/actions/page-content";
import { PageHeader } from "@/components/admin/page-header";
import { FileTextIcon } from "lucide-react";
import { PageContentForm } from "@/components/admin/page-content-form";

export default async function AdminPrivacyPolicyPage() {
  const data = await getPageContent("privacy-policy");
  return (
    <>
      <PageHeader title="Privacy Policy" description="Edit the privacy policy page." icon={FileTextIcon} />
      <PageContentForm slug="privacy-policy" data={data} />
    </>
  );
}

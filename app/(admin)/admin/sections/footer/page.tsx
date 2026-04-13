import { getFooter } from "@/lib/actions/footer";
import { PageHeader } from "@/components/admin/page-header";
import { PanelBottomIcon } from "lucide-react";
import { FooterForm } from "./footer-form";

export default async function AdminFooterPage() {
  const footer = await getFooter();
  return (
    <>
      <PageHeader title="Footer" description="Edit footer links, contact info, and social media." icon={PanelBottomIcon} />
      <FooterForm footer={footer} />
    </>
  );
}

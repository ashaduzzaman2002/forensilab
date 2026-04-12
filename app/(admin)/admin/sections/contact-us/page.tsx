import { PageHeader } from "@/components/admin/page-header";
import { MailIcon } from "lucide-react";

export default function AdminContactUsPage() {
  return (
    <>
      <PageHeader title="Contact Us" description="Manage contact form submissions and settings." icon={MailIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Contact Us management coming soon.</p>
      </div>
    </>
  );
}

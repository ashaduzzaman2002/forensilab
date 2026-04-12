import { PageHeader } from "@/components/admin/page-header";
import { BriefcaseIcon } from "lucide-react";

export default function AdminServicesPage() {
  return (
    <>
      <PageHeader title="Services" description="Add, edit, or remove service offerings." icon={BriefcaseIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Services management coming soon.</p>
      </div>
    </>
  );
}

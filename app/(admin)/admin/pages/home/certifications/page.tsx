import { PageHeader } from "@/components/admin/page-header";
import { ShieldCheckIcon } from "lucide-react";

export default function AdminCertificationsSection() {
  return (
    <>
      <PageHeader title="Certifications" description="Manage accreditation and certification badges." icon={ShieldCheckIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Certifications editor coming soon.</p>
      </div>
    </>
  );
}

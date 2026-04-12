import { PageHeader } from "@/components/admin/page-header";
import { BuildingIcon } from "lucide-react";

export default function AdminTrustedBySection() {
  return (
    <>
      <PageHeader title="Trusted By" description="Manage partner and client logos." icon={BuildingIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Trusted By editor coming soon.</p>
      </div>
    </>
  );
}

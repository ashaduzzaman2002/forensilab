import { PageHeader } from "@/components/admin/page-header";
import { MapPinIcon } from "lucide-react";

export default function AdminLocationsSection() {
  return (
    <>
      <PageHeader title="Locations" description="Manage lab locations and addresses." icon={MapPinIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Locations editor coming soon.</p>
      </div>
    </>
  );
}

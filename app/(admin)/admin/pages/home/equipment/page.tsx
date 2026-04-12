import { PageHeader } from "@/components/admin/page-header";
import { BuildingIcon } from "lucide-react";

export default function AdminEquipmentSection() {
  return (
    <>
      <PageHeader title="Equipment & Departments" description="Manage lab equipment and department listings." icon={BuildingIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Equipment editor coming soon.</p>
      </div>
    </>
  );
}

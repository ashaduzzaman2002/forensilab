import { getEquipments } from "@/lib/actions/equipment";
import { PageHeader } from "@/components/admin/page-header";
import { WrenchIcon } from "lucide-react";
import { EquipmentList } from "./equipment-list";

export default async function AdminEquipmentPage() {
  const items = await getEquipments();
  return (
    <>
      <PageHeader title="Equipment & Departments" description="Manage lab equipment and department listings." icon={WrenchIcon} />
      <EquipmentList items={items} />
    </>
  );
}

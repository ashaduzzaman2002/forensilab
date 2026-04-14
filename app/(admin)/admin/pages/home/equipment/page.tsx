import { getEquipments } from "@/lib/actions/equipment";
import { PageHeader } from "@/components/admin/page-header";
import { WrenchIcon } from "lucide-react";
import { EquipmentList } from "./equipment-list";

export default async function AdminEquipmentPage() {
  const items = await getEquipments();
  return (
    <>
      <PageHeader title="Glimpses to Laboratory" description="Manage lab equipment shown in the Glimpses section." icon={WrenchIcon} />
      <EquipmentList items={items} />
    </>
  );
}

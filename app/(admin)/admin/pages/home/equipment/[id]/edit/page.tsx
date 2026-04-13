import { notFound } from "next/navigation";
import { getEquipmentById } from "@/lib/actions/equipment";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { EquipmentForm } from "../../equipment-form";

export default async function EditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const equipment = await getEquipmentById(id);
  if (!equipment) notFound();

  return (
    <>
      <PageHeader title="Edit Equipment" description={`Editing "${equipment.name}"`} icon={PencilIcon} />
      <EquipmentForm equipment={equipment} />
    </>
  );
}

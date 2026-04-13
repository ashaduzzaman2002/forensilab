import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { EquipmentForm } from "../equipment-form";

export default function AddEquipmentPage() {
  return (
    <>
      <PageHeader title="Add Equipment" description="Add a new lab equipment or department." icon={PlusIcon} />
      <EquipmentForm />
    </>
  );
}

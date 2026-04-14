import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { SectorForm } from "../sector-form";

export default function AddSectorPage() {
  return (
    <>
      <PageHeader title="Add Sector" description="Add a new sector." icon={PlusIcon} />
      <SectorForm />
    </>
  );
}

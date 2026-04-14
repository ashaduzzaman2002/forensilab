import { notFound } from "next/navigation";
import { getSectorById } from "@/lib/actions/sector";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { SectorForm } from "../../sector-form";

export default async function EditSectorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sector = await getSectorById(id);
  if (!sector) notFound();

  return (
    <>
      <PageHeader title="Edit Sector" description={`Editing "${sector.name}"`} icon={PencilIcon} />
      <SectorForm sector={sector} />
    </>
  );
}

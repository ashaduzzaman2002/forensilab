import { notFound } from "next/navigation";
import { getPartnershipById } from "@/lib/actions/partnership";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { PartnershipForm } from "../../partnership-form";

export default async function EditPartnershipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partnership = await getPartnershipById(id);
  if (!partnership) notFound();

  return (
    <>
      <PageHeader title="Edit Partnership" description={`Editing "${partnership.name}"`} icon={PencilIcon} />
      <PartnershipForm partnership={partnership} />
    </>
  );
}

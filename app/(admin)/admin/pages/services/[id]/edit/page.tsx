import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/actions/service";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { ServiceForm } from "../../service-form";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

  return (
    <>
      <PageHeader title="Edit Service" description={`Editing "${service.title}"`} icon={PencilIcon} />
      <ServiceForm service={service} />
    </>
  );
}

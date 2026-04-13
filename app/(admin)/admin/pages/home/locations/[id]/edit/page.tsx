import { notFound } from "next/navigation";
import { getLocationById } from "@/lib/actions/location";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { LocationForm } from "../../location-form";

export default async function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const location = await getLocationById(id);
  if (!location) notFound();

  return (
    <>
      <PageHeader title="Edit Location" description={`Editing "${location.name}"`} icon={PencilIcon} />
      <LocationForm location={location} />
    </>
  );
}

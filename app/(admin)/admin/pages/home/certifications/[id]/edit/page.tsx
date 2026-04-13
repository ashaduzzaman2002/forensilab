import { notFound } from "next/navigation";
import { getCertificationById } from "@/lib/actions/certification";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { CertificationForm } from "../../certification-form";

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certification = await getCertificationById(id);
  if (!certification) notFound();

  return (
    <>
      <PageHeader title="Edit Certification" description={`Editing "${certification.title}"`} icon={PencilIcon} />
      <CertificationForm certification={certification} />
    </>
  );
}

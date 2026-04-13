import { notFound } from "next/navigation";
import { getTrustedByById } from "@/lib/actions/trusted-by";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { TrustedByForm } from "../../trusted-by-form";

export default async function EditTrustedByPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await getTrustedByById(id);
  if (!partner) notFound();

  return (
    <>
      <PageHeader title="Edit Partner" description={`Editing "${partner.name}"`} icon={PencilIcon} />
      <TrustedByForm partner={partner} />
    </>
  );
}

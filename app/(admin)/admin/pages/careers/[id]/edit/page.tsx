import { notFound } from "next/navigation";
import { getCareerById } from "@/lib/actions/career";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { CareerForm } from "../../career-form";

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const career = await getCareerById(id);
  if (!career) notFound();

  return (
    <>
      <PageHeader title="Edit Career" description={`Editing "${career.title}"`} icon={PencilIcon} />
      <CareerForm career={career} />
    </>
  );
}

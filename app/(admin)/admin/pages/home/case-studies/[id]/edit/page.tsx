import { notFound } from "next/navigation";
import { getCaseStudyById } from "@/lib/actions/case-study";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { CaseStudyForm } from "../../case-study-form";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caseStudy = await getCaseStudyById(id);
  if (!caseStudy) notFound();

  return (
    <>
      <PageHeader title="Edit Case Study" description={`Editing "${caseStudy.title}"`} icon={PencilIcon} />
      <CaseStudyForm caseStudy={caseStudy} />
    </>
  );
}

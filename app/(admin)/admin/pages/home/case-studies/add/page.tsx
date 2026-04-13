import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { CaseStudyForm } from "../case-study-form";

export default function AddCaseStudyPage() {
  return (
    <>
      <PageHeader title="Add Case Study" description="Create a new case study." icon={PlusIcon} />
      <CaseStudyForm />
    </>
  );
}

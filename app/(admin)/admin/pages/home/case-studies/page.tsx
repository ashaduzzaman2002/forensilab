import { getCaseStudies } from "@/lib/actions/case-study";
import { PageHeader } from "@/components/admin/page-header";
import { BookOpenIcon } from "lucide-react";
import { CaseStudyList } from "./case-study-list";

export default async function AdminCaseStudiesPage() {
  const items = await getCaseStudies();
  return (
    <>
      <PageHeader title="Case Studies" description="Add and manage forensic case studies." icon={BookOpenIcon} />
      <CaseStudyList items={items} />
    </>
  );
}

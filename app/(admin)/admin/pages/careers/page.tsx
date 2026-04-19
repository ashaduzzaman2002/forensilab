import { getCareers } from "@/lib/actions/career";
import { PageHeader } from "@/components/admin/page-header";
import { BriefcaseIcon } from "lucide-react";
import { CareerList } from "./career-list";

export default async function AdminCareersPage() {
  const items = await getCareers();
  return (
    <>
      <PageHeader title="Careers" description="Manage job openings and career listings." icon={BriefcaseIcon} />
      <CareerList items={items} />
    </>
  );
}

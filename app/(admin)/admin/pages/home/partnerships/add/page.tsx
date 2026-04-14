import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { PartnershipForm } from "../partnership-form";

export default function AddPartnershipPage() {
  return (
    <>
      <PageHeader title="Add Partnership" description="Add a new MOU or MOA." icon={PlusIcon} />
      <PartnershipForm />
    </>
  );
}

import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { CertificationForm } from "../certification-form";

export default function AddCertificationPage() {
  return (
    <>
      <PageHeader title="Add Certification" description="Add a new certification or accreditation." icon={PlusIcon} />
      <CertificationForm />
    </>
  );
}

import { getCertifications } from "@/lib/actions/certification";
import { PageHeader } from "@/components/admin/page-header";
import { ShieldCheckIcon } from "lucide-react";
import { CertificationList } from "./certification-list";

export default async function AdminCertificationsPage() {
  const items = await getCertifications();
  return (
    <>
      <PageHeader title="Certifications" description="Manage accreditation and certification badges." icon={ShieldCheckIcon} />
      <CertificationList items={items} />
    </>
  );
}

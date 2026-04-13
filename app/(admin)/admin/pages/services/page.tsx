import { getServices } from "@/lib/actions/service";
import { PageHeader } from "@/components/admin/page-header";
import { BriefcaseIcon } from "lucide-react";
import { ServicesList } from "./services-list";

export default async function AdminServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader title="Services" description="Add, edit, or remove service offerings." icon={BriefcaseIcon} />
      <ServicesList services={services} />
    </>
  );
}

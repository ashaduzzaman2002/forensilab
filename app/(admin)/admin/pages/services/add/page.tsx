import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { ServiceForm } from "../service-form";

export default function AddServicePage() {
  return (
    <>
      <PageHeader title="Add Service" description="Create a new service offering." icon={PlusIcon} />
      <ServiceForm />
    </>
  );
}

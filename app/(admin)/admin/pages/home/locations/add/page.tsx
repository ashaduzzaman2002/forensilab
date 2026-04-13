import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { LocationForm } from "../location-form";

export default function AddLocationPage() {
  return (
    <>
      <PageHeader title="Add Location" description="Add a new lab location." icon={PlusIcon} />
      <LocationForm />
    </>
  );
}

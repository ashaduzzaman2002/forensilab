import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { CareerForm } from "../career-form";

export default function AddCareerPage() {
  return (
    <>
      <PageHeader title="Add Career" description="Create a new job listing." icon={PlusIcon} />
      <CareerForm />
    </>
  );
}

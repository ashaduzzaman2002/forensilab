import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { TrustedByForm } from "../trusted-by-form";

export default function AddTrustedByPage() {
  return (
    <>
      <PageHeader title="Add Partner" description="Add a new trusted partner." icon={PlusIcon} />
      <TrustedByForm />
    </>
  );
}

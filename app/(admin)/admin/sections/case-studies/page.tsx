import { PageHeader } from "@/components/admin/page-header";
import { FileTextIcon } from "lucide-react";

export default function AdminCaseStudiesSection() {
  return (
    <>
      <PageHeader title="Case Studies" description="Add and manage forensic case studies." icon={FileTextIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Case studies editor coming soon.</p>
      </div>
    </>
  );
}

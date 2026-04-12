import { PageHeader } from "@/components/admin/page-header";
import { InfoIcon } from "lucide-react";

export default function AdminAboutPage() {
  return (
    <>
      <PageHeader title="About" description="Edit the about page content." icon={InfoIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">About page management coming soon.</p>
      </div>
    </>
  );
}

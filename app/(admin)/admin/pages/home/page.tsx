import { PageHeader } from "@/components/admin/page-header";
import { HomeIcon } from "lucide-react";

export default function AdminHomePage() {
  return (
    <>
      <PageHeader title="Home Page" description="Manage your homepage content and layout." icon={HomeIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Home page content management coming soon.</p>
      </div>
    </>
  );
}

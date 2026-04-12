import { PageHeader } from "@/components/admin/page-header";
import { PanelBottomIcon } from "lucide-react";

export default function AdminFooterPage() {
  return (
    <>
      <PageHeader title="Footer" description="Edit footer links, contact info, and social media." icon={PanelBottomIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Footer management coming soon.</p>
      </div>
    </>
  );
}

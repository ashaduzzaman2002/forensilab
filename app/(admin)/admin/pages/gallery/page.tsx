import { PageHeader } from "@/components/admin/page-header";
import { ImageIcon } from "lucide-react";

export default function AdminGalleryPage() {
  return (
    <>
      <PageHeader title="Gallery" description="Upload and manage gallery images." icon={ImageIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Gallery management coming soon.</p>
      </div>
    </>
  );
}

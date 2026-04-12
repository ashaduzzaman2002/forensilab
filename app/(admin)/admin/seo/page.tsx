import { PageHeader } from "@/components/admin/page-header";
import { SearchIcon } from "lucide-react";

export default function SeoPage() {
  return (
    <>
      <PageHeader title="SEO Management" description="Configure meta tags, titles, and search optimization." icon={SearchIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">SEO management coming soon.</p>
      </div>
    </>
  );
}

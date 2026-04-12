import { PageHeader } from "@/components/admin/page-header";
import { SparklesIcon } from "lucide-react";

export default function AdminHeroSection() {
  return (
    <>
      <PageHeader title="Hero Section" description="Edit the hero banner, headline, and call-to-action." icon={SparklesIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Hero section editor coming soon.</p>
      </div>
    </>
  );
}

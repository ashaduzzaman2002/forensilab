import { PageHeader } from "@/components/admin/page-header";
import { MessageSquareIcon } from "lucide-react";

export default function AdminTestimonialsSection() {
  return (
    <>
      <PageHeader title="Testimonials" description="Manage client testimonials and reviews." icon={MessageSquareIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Testimonials editor coming soon.</p>
      </div>
    </>
  );
}

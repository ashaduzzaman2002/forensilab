import { PageHeader } from "@/components/admin/page-header";
import { UsersIcon } from "lucide-react";

export default function AdminTeamPage() {
  return (
    <>
      <PageHeader title="Team" description="Manage team members and profiles." icon={UsersIcon} />
      <div className="rounded-xl border border-dashed border-white/60 bg-white/60 backdrop-blur-md p-12 text-center shadow-sm">
        <p className="text-muted-foreground">Team management coming soon.</p>
      </div>
    </>
  );
}

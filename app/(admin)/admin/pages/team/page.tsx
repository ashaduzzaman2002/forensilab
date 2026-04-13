import { getTeamMembers } from "@/lib/actions/team";
import { PageHeader } from "@/components/admin/page-header";
import { UsersIcon } from "lucide-react";
import { TeamList } from "./team-list";

export default async function AdminTeamPage() {
  const items = await getTeamMembers();
  return (<><PageHeader title="Team" description="Manage team members and profiles." icon={UsersIcon} /><TeamList items={items} /></>);
}

import { notFound } from "next/navigation";
import { getTeamMemberById } from "@/lib/actions/team";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { TeamForm } from "../../team-form";
export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const member = await getTeamMemberById(id); if (!member) notFound();
  return (<><PageHeader title="Edit Member" description={`Editing "${member.name}"`} icon={PencilIcon} /><TeamForm member={member} /></>);
}

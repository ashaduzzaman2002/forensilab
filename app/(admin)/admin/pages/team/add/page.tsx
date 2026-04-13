import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { TeamForm } from "../team-form";
export default function AddTeamPage() { return (<><PageHeader title="Add Member" description="Add a new team member." icon={PlusIcon} /><TeamForm /></>); }

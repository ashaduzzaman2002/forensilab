import { getAbout } from "@/lib/actions/about";
import { PageHeader } from "@/components/admin/page-header";
import { InfoIcon } from "lucide-react";
import { AboutForm } from "./about-form";

export default async function AdminAboutPage() {
  const about = await getAbout();
  return (<><PageHeader title="About" description="Edit the about page content." icon={InfoIcon} /><AboutForm about={about} /></>);
}

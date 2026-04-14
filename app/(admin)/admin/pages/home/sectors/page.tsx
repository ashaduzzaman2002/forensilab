import { getSectors } from "@/lib/actions/sector";
import { PageHeader } from "@/components/admin/page-header";
import { LayoutGridIcon } from "lucide-react";
import { SectorList } from "./sector-list";

export default async function AdminSectorsPage() {
  const items = await getSectors();
  return (
    <>
      <PageHeader title="Sectors We Serve" description="Manage the sectors displayed on the homepage." icon={LayoutGridIcon} />
      <SectorList items={items} />
    </>
  );
}

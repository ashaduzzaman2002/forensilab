import { getPartnerships } from "@/lib/actions/partnership";
import { PageHeader } from "@/components/admin/page-header";
import { HandshakeIcon } from "lucide-react";
import { PartnershipList } from "./partnership-list";

export default async function AdminPartnershipsPage() {
  const items = await getPartnerships();
  return (
    <>
      <PageHeader title="MOUs & MOAs" description="Manage academic partnerships." icon={HandshakeIcon} />
      <PartnershipList items={items} />
    </>
  );
}

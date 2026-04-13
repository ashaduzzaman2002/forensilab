import { getTrustedBys } from "@/lib/actions/trusted-by";
import { PageHeader } from "@/components/admin/page-header";
import { BuildingIcon } from "lucide-react";
import { TrustedByList } from "./trusted-by-list";

export default async function AdminTrustedByPage() {
  const items = await getTrustedBys();
  return (
    <>
      <PageHeader title="Trusted By" description="Manage partner and client logos." icon={BuildingIcon} />
      <TrustedByList items={items} />
    </>
  );
}

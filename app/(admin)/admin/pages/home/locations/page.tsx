import { getLocations } from "@/lib/actions/location";
import { PageHeader } from "@/components/admin/page-header";
import { MapPinIcon } from "lucide-react";
import { LocationList } from "./location-list";

export default async function AdminLocationsPage() {
  const items = await getLocations();
  return (
    <>
      <PageHeader title="Locations" description="Manage lab locations and addresses." icon={MapPinIcon} />
      <LocationList items={items} />
    </>
  );
}

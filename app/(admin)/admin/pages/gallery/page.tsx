import { getGalleryItems } from "@/lib/actions/gallery";
import { PageHeader } from "@/components/admin/page-header";
import { ImageIcon } from "lucide-react";
import { GalleryList } from "./gallery-list";

export default async function AdminGalleryPage() {
  const items = await getGalleryItems();
  return (<><PageHeader title="Gallery" description="Upload and manage gallery images." icon={ImageIcon} /><GalleryList items={items} /></>);
}

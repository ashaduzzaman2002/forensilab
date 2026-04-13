import { notFound } from "next/navigation";
import { getGalleryItemById } from "@/lib/actions/gallery";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { GalleryForm } from "../../gallery-form";
export default async function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const item = await getGalleryItemById(id); if (!item) notFound();
  return (<><PageHeader title="Edit Record" description={`Editing "${item.scene}"`} icon={PencilIcon} /><GalleryForm item={item} /></>);
}

import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { GalleryForm } from "../gallery-form";
export default function AddGalleryPage() { return (<><PageHeader title="Add Record" description="Add a new gallery record." icon={PlusIcon} /><GalleryForm /></>); }

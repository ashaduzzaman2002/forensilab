import { getPageMetadata } from "@/lib/actions/seo";
import { dbConnect } from "@/lib/db";
import { Gallery } from "@/lib/models/gallery";
import { GalleryClient } from "./gallery-client";

export async function generateMetadata() { return getPageMetadata("gallery", { title: "Gallery — ForensiLabs", description: "Browse documented forensic case files and evidence records" }); }

export default async function GalleryPage() {
  await dbConnect();
  const docs = await Gallery.find().sort({ order: 1 }).lean();
  const items = JSON.parse(JSON.stringify(docs));
  return <GalleryClient items={items} />;
}

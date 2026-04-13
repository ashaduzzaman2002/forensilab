import { dbConnect } from "@/lib/db";
import { Gallery } from "@/lib/models/gallery";
import { GalleryClient } from "./gallery-client";

export default async function GalleryPage() {
  await dbConnect();
  const docs = await Gallery.find().sort({ order: 1 }).lean();
  const items = JSON.parse(JSON.stringify(docs));
  return <GalleryClient items={items} />;
}

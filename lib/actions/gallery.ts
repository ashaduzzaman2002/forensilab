"use server";
import { dbConnect } from "@/lib/db";
import { Gallery } from "@/lib/models/gallery";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/gallery", "/admin/pages/gallery"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getGalleryItems() { await dbConnect(); return JSON.parse(JSON.stringify(await Gallery.find().sort({ order: 1 }).lean())); }
export async function getGalleryItemById(id: string) { await dbConnect(); const i = await Gallery.findById(id).lean(); return i ? JSON.parse(JSON.stringify(i)) : null; }
export async function getGalleryUploadUrl(fileName: string, contentType: string) { const key = `gallery-${Date.now()}-${fileName}`; return { url: await getUploadUrl(key, contentType), key }; }

export async function createGalleryItem(data: { title: string; description: string; image?: { key: string } | null }) {
  await dbConnect(); const count = await Gallery.countDocuments();
  await Gallery.create({ title: data.title, description: data.description, image: data.image?.key ? getFileUrl(data.image.key) : "", order: count });
  revalidate(); return { success: true };
}

export async function updateGalleryItem(id: string, data: { title: string; description: string; image?: { key: string } | null }) {
  await dbConnect(); const existing = await Gallery.findById(id); let image = existing?.image || "";
  if (data.image?.key) { if (image?.includes(".amazonaws.com/")) { try { const k = image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} } image = getFileUrl(data.image.key); }
  await Gallery.findByIdAndUpdate(id, { title: data.title, description: data.description, image });
  revalidate(); return { success: true };
}

export async function deleteGalleryItem(id: string) {
  await dbConnect(); const item = await Gallery.findById(id);
  if (item?.image?.includes(".amazonaws.com/")) { try { const k = item.image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
  await Gallery.findByIdAndDelete(id); revalidate(); return { success: true };
}

"use server";

import { dbConnect } from "@/lib/db";
import { Sector } from "@/lib/models/sector";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/", "/admin/pages/home/sectors"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getSectors() {
  await dbConnect();
  const items = await Sector.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getSectorById(id: string) {
  await dbConnect();
  const item = await Sector.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getSectorUploadUrl(fileName: string, contentType: string) {
  const key = `sectors-${Date.now()}-${fileName}`;
  const url = await getUploadUrl(key, contentType);
  return { url, key };
}

export async function createSector(data: { name: string; description: string; image?: { key: string } | null }) {
  await dbConnect();
  const count = await Sector.countDocuments();
  await Sector.create({
    image: data.image?.key ? getFileUrl(data.image.key) : "",
    name: data.name,
    description: data.description,
    order: count,
  });
  revalidate();
  return { success: true };
}

export async function updateSector(id: string, data: { name: string; description: string; image?: { key: string } | null }) {
  await dbConnect();
  const existing = await Sector.findById(id);
  let image = existing?.image || "";
  if (data.image?.key) {
    if (image?.includes(".amazonaws.com/")) {
      try { const k = image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
    }
    image = getFileUrl(data.image.key);
  }
  await Sector.findByIdAndUpdate(id, { name: data.name, description: data.description, image });
  revalidate();
  return { success: true };
}

export async function deleteSector(id: string) {
  await dbConnect();
  const item = await Sector.findById(id);
  if (item?.image?.includes(".amazonaws.com/")) {
    try { const k = item.image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
  }
  await Sector.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}

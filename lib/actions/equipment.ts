"use server";

import { dbConnect } from "@/lib/db";
import { Equipment } from "@/lib/models/equipment";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/", "/admin/pages/home/equipment"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getEquipments() {
  await dbConnect();
  const items = await Equipment.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getEquipmentById(id: string) {
  await dbConnect();
  const item = await Equipment.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getEquipmentUploadUrl(fileName: string, contentType: string) {
  const key = `equipment-${Date.now()}-${fileName}`;
  const url = await getUploadUrl(key, contentType);
  return { url, key };
}

export async function createEquipment(data: {
  name: string; category: string; description: string; image?: { key: string } | null;
}) {
  await dbConnect();
  const count = await Equipment.countDocuments();
  await Equipment.create({
    name: data.name, category: data.category, description: data.description,
    image: data.image?.key ? getFileUrl(data.image.key) : "",
    order: count,
  });
  revalidate();
  return { success: true };
}

export async function updateEquipment(id: string, data: {
  name: string; category: string; description: string; image?: { key: string } | null;
}) {
  await dbConnect();
  const existing = await Equipment.findById(id);
  let image = existing?.image || "";
  if (data.image?.key) {
    if (image?.includes(".amazonaws.com/")) {
      try { const k = image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
    }
    image = getFileUrl(data.image.key);
  }
  await Equipment.findByIdAndUpdate(id, {
    name: data.name, category: data.category, description: data.description, image,
  });
  revalidate();
  return { success: true };
}

export async function deleteEquipment(id: string) {
  await dbConnect();
  const item = await Equipment.findById(id);
  if (item?.image?.includes(".amazonaws.com/")) {
    try { const k = item.image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
  }
  await Equipment.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}

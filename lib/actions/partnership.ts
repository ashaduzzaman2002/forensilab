"use server";

import { dbConnect } from "@/lib/db";
import { Partnership } from "@/lib/models/partnership";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/", "/admin/pages/home/partnerships"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getPartnerships() {
  await dbConnect();
  return JSON.parse(JSON.stringify(await Partnership.find().sort({ order: 1 }).lean()));
}

export async function getPartnershipById(id: string) {
  await dbConnect();
  const item = await Partnership.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getPartnershipUploadUrl(fileName: string, contentType: string) {
  const key = `partnerships-${Date.now()}-${fileName}`;
  return { url: await getUploadUrl(key, contentType), key };
}

export async function createPartnership(data: { name: string; subtitle: string; type: string; image?: { key: string } | null }) {
  await dbConnect();
  const count = await Partnership.countDocuments();
  await Partnership.create({
    name: data.name, subtitle: data.subtitle, type: data.type,
    image: data.image?.key ? getFileUrl(data.image.key) : "",
    order: count,
  });
  revalidate();
  return { success: true };
}

export async function updatePartnership(id: string, data: { name: string; subtitle: string; type: string; image?: { key: string } | null; removeImage?: boolean }) {
  await dbConnect();
  const existing = await Partnership.findById(id);
  let image = existing?.image || "";
  if (data.removeImage) {
    if (image?.includes(".amazonaws.com/")) { try { const k = image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
    image = "";
  } else if (data.image?.key) {
    if (image?.includes(".amazonaws.com/")) { try { const k = image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
    image = getFileUrl(data.image.key);
  }
  await Partnership.findByIdAndUpdate(id, { name: data.name, subtitle: data.subtitle, type: data.type, image });
  revalidate();
  return { success: true };
}

export async function deletePartnership(id: string) {
  await dbConnect();
  const item = await Partnership.findById(id);
  if (item?.image?.includes(".amazonaws.com/")) { try { const k = item.image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
  await Partnership.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}

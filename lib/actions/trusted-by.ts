"use server";

import { dbConnect } from "@/lib/db";
import { TrustedBy } from "@/lib/models/trusted-by";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/", "/admin/pages/home/trusted-by"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getTrustedBys() {
  await dbConnect();
  return JSON.parse(JSON.stringify(await TrustedBy.find().sort({ order: 1 }).lean()));
}

export async function getTrustedByById(id: string) {
  await dbConnect();
  const item = await TrustedBy.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getTrustedByUploadUrl(fileName: string, contentType: string) {
  const key = `trustedby-${Date.now()}-${fileName}`;
  return { url: await getUploadUrl(key, contentType), key };
}

export async function createTrustedBy(data: { name: string; link: string; logo?: { key: string } | null }) {
  await dbConnect();
  const count = await TrustedBy.countDocuments();
  await TrustedBy.create({ name: data.name, link: data.link, logo: data.logo?.key ? getFileUrl(data.logo.key) : "", order: count });
  revalidate();
  return { success: true };
}

export async function updateTrustedBy(id: string, data: { name: string; link: string; logo?: { key: string } | null }) {
  await dbConnect();
  const existing = await TrustedBy.findById(id);
  let logo = existing?.logo || "";
  if (data.logo?.key) {
    if (logo?.includes(".amazonaws.com/")) { try { const k = logo.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
    logo = getFileUrl(data.logo.key);
  }
  await TrustedBy.findByIdAndUpdate(id, { name: data.name, link: data.link, logo });
  revalidate();
  return { success: true };
}

export async function deleteTrustedBy(id: string) {
  await dbConnect();
  const item = await TrustedBy.findById(id);
  if (item?.logo?.includes(".amazonaws.com/")) { try { const k = item.logo.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
  await TrustedBy.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}

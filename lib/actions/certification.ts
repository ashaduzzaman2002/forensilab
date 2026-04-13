"use server";

import { dbConnect } from "@/lib/db";
import { Certification } from "@/lib/models/certification";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/", "/admin/pages/home/certifications"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getCertifications() {
  await dbConnect();
  return JSON.parse(JSON.stringify(await Certification.find().sort({ order: 1 }).lean()));
}

export async function getCertificationById(id: string) {
  await dbConnect();
  const item = await Certification.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getCertUploadUrl(fileName: string, contentType: string) {
  const key = `certs-${Date.now()}-${fileName}`;
  return { url: await getUploadUrl(key, contentType), key };
}

export async function createCertification(data: { title: string; text: string; icon?: { key: string } | null }) {
  await dbConnect();
  const count = await Certification.countDocuments();
  await Certification.create({ title: data.title, text: data.text, icon: data.icon?.key ? getFileUrl(data.icon.key) : "", order: count });
  revalidate();
  return { success: true };
}

export async function updateCertification(id: string, data: { title: string; text: string; icon?: { key: string } | null }) {
  await dbConnect();
  const existing = await Certification.findById(id);
  let icon = existing?.icon || "";
  if (data.icon?.key) {
    if (icon?.includes(".amazonaws.com/")) { try { const k = icon.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
    icon = getFileUrl(data.icon.key);
  }
  await Certification.findByIdAndUpdate(id, { title: data.title, text: data.text, icon });
  revalidate();
  return { success: true };
}

export async function deleteCertification(id: string) {
  await dbConnect();
  const item = await Certification.findById(id);
  if (item?.icon?.includes(".amazonaws.com/")) { try { const k = item.icon.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
  await Certification.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}

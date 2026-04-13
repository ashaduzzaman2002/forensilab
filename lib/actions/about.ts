"use server";
import { dbConnect } from "@/lib/db";
import { About } from "@/lib/models/about";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/about", "/admin/pages/about"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getAbout() { await dbConnect(); const doc = await About.findOne().lean(); return doc ? JSON.parse(JSON.stringify(doc)) : null; }

export async function updateAbout(data: { title: string; subtitle: string; content: string; highlights: string[]; stats: { value: string; label: string }[] }) {
  await dbConnect();
  await About.findOneAndUpdate({}, data, { upsert: true });
  revalidate(); return { success: true };
}

export async function getAboutUploadUrl(fileName: string, contentType: string) { const key = `about-${Date.now()}-${fileName}`; return { url: await getUploadUrl(key, contentType), key }; }

export async function saveAboutImage(key: string) {
  await dbConnect(); const about = await About.findOne();
  if (about?.image?.includes(".amazonaws.com/")) { try { const k = about.image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
  const fileUrl = getFileUrl(key);
  await About.findOneAndUpdate({}, { image: fileUrl }, { upsert: true });
  revalidate(); return { success: true, url: fileUrl };
}

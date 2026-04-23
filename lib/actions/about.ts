"use server";
import { dbConnect } from "@/lib/db";
import { About } from "@/lib/models/about";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/about", "/admin/pages/about"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getAbout() {
  await dbConnect();
  const doc = await About.findOne().lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function getAboutUploadUrl(fileName: string, contentType: string) {
  const key = `about-${Date.now()}-${fileName}`;
  return { url: await getUploadUrl(key, contentType), key };
}

interface SectionData { title: string; content: string; image?: { key: string } | null }

export async function updateAbout(data: {
  subtitle: string;
  whoWeAre: SectionData; whatWeDo: SectionData; others: SectionData;
  stats: { value: string; label: string }[];
}) {
  await dbConnect();
  const existing = await About.findOne();

  function resolveImage(newImg: { key: string } | null | undefined, oldImg: string | undefined) {
    if (newImg?.key) {
      if (oldImg?.includes(".amazonaws.com/")) { try { const k = oldImg.split(".amazonaws.com/")[1]; if (k) deleteFile(k); } catch {} }
      return getFileUrl(newImg.key);
    }
    return oldImg || "";
  }

  const update = {
    subtitle: data.subtitle,
    whoWeAre: { title: data.whoWeAre.title, content: data.whoWeAre.content, image: resolveImage(data.whoWeAre.image, existing?.whoWeAre?.image) },
    whatWeDo: { title: data.whatWeDo.title, content: data.whatWeDo.content, image: resolveImage(data.whatWeDo.image, existing?.whatWeDo?.image) },
    others: { title: data.others.title, content: data.others.content, image: resolveImage(data.others.image, existing?.others?.image) },
    stats: data.stats.filter(s => s.value && s.label),
  };

  await About.findOneAndUpdate({}, update, { upsert: true });
  revalidate();
  return { success: true };
}

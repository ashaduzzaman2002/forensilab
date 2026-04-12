"use server";

import { dbConnect } from "@/lib/db";
import { Hero } from "@/lib/models/hero";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

export async function getHero() {
  await dbConnect();
  const hero = await Hero.findOne().lean();
  console.log("Hero from DB:", hero);
  return hero ? JSON.parse(JSON.stringify(hero)) : null;
}

export async function updateHero(formData: FormData) {
  await dbConnect();

  const data = {
    heading: formData.get("heading") as string,
    subheading: formData.get("subheading") as string,
    subtitle: formData.get("subtitle") as string,
    primaryBtnText: formData.get("primaryBtnText") as string,
    primaryBtnLink: formData.get("primaryBtnLink") as string,
    secondaryBtnText: formData.get("secondaryBtnText") as string,
    secondaryBtnLink: formData.get("secondaryBtnLink") as string,
  };

  await Hero.findOneAndUpdate({}, data, { upsert: true });
  revalidatePath("/");
  revalidatePath("/admin/pages/home/hero");
  return { success: true };
}

export async function getHeroBgUploadUrl(fileName: string, contentType: string) {
  const key = `hero-${Date.now()}-${fileName}`;
  const url = await getUploadUrl(key, contentType);
  return { url, key };
}

export async function saveHeroBgImage(key: string) {
  await dbConnect();
  const hero = await Hero.findOne();
  if (hero?.bgImage) {
    try {
      const oldKey = hero.bgImage.split(".amazonaws.com/")[1];
      if (oldKey) await deleteFile(oldKey);
    } catch {}
  }
  const fileUrl = getFileUrl(key);
  console.log("Saving hero bgImage to DB:", fileUrl);
  await Hero.findOneAndUpdate({}, { bgImage: fileUrl }, { upsert: true });
  revalidatePath("/");
  revalidatePath("/admin/pages/home/hero");
  return { success: true, url: fileUrl };
}

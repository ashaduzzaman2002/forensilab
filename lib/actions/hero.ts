"use server";

import { dbConnect } from "@/lib/db";
import { Hero } from "@/lib/models/hero";
import { revalidatePath } from "next/cache";

export async function getHero() {
  await dbConnect();
  const hero = await Hero.findOne().lean();
  return hero ? JSON.parse(JSON.stringify(hero)) : null;
}

export async function updateHero(formData: FormData) {
  await dbConnect();

  const statsValues = formData.getAll("statValue") as string[];
  const statsLabels = formData.getAll("statLabel") as string[];
  const stats = statsValues
    .map((value, i) => ({ value, label: statsLabels[i] || "" }))
    .filter((s) => s.value && s.label);

  const data = {
    badge: formData.get("badge") as string,
    headingLine1: formData.get("headingLine1") as string,
    headingLine2: formData.get("headingLine2") as string,
    headingLine3: formData.get("headingLine3") as string,
    description: formData.get("description") as string,
    primaryBtnText: formData.get("primaryBtnText") as string,
    primaryBtnLink: formData.get("primaryBtnLink") as string,
    secondaryBtnText: formData.get("secondaryBtnText") as string,
    secondaryBtnLink: formData.get("secondaryBtnLink") as string,
    stats,
  };

  await Hero.findOneAndUpdate({}, data, { upsert: true });
  revalidatePath("/");
  revalidatePath("/admin/pages/home/hero");
  return { success: true };
}

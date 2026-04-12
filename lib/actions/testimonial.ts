"use server";

import { dbConnect } from "@/lib/db";
import { Testimonial } from "@/lib/models/testimonial";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  await dbConnect();
  const items = await Testimonial.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getTestimonialById(id: string) {
  await dbConnect();
  const item = await Testimonial.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function createTestimonial(formData: FormData) {
  await dbConnect();
  const count = await Testimonial.countDocuments();
  await Testimonial.create({
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    text: formData.get("text") as string,
    order: count,
  });
  revalidatePath("/");
  revalidatePath("/admin/pages/home/testimonials");
  return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
  await dbConnect();
  await Testimonial.findByIdAndUpdate(id, {
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    text: formData.get("text") as string,
  });
  revalidatePath("/");
  revalidatePath("/admin/pages/home/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await dbConnect();
  await Testimonial.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin/pages/home/testimonials");
  return { success: true };
}

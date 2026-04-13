"use server";

import { dbConnect } from "@/lib/db";
import { Location } from "@/lib/models/location";
import { revalidatePath } from "next/cache";

const paths = ["/", "/locations", "/admin/pages/home/locations"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getLocations() {
  await dbConnect();
  return JSON.parse(JSON.stringify(await Location.find().sort({ order: 1 }).lean()));
}

export async function getLocationById(id: string) {
  await dbConnect();
  const item = await Location.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getHeadquarters() {
  await dbConnect();
  const hq = await Location.findOne({ isHeadquarters: true }).lean();
  return hq ? JSON.parse(JSON.stringify(hq)) : null;
}

export async function createLocation(formData: FormData) {
  await dbConnect();
  const count = await Location.countDocuments();
  await Location.create({
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string || "",
    email: formData.get("email") as string || "",
    mapEmbed: formData.get("mapEmbed") as string || "",
    isHeadquarters: formData.get("isHeadquarters") === "on",
    order: count,
  });
  revalidate();
  return { success: true };
}

export async function updateLocation(id: string, formData: FormData) {
  await dbConnect();
  await Location.findByIdAndUpdate(id, {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string || "",
    email: formData.get("email") as string || "",
    mapEmbed: formData.get("mapEmbed") as string || "",
    isHeadquarters: formData.get("isHeadquarters") === "on",
  });
  revalidate();
  return { success: true };
}

export async function deleteLocation(id: string) {
  await dbConnect();
  await Location.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}

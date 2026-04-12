"use server";

import { createSession, deleteSession } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { Admin } from "@/lib/models/admin";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await dbConnect();
  const admin = await Admin.findOne({ email });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return { error: "Invalid email or password" };
  }

  await createSession();
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}

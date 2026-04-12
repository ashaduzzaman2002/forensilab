import { dbConnect } from "../lib/db";
import { Admin } from "../lib/models/admin";
import bcrypt from "bcryptjs";

async function seed() {
  await dbConnect();

  const email = "admin@forensilabs.com";
  const password = "admin123";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists, skipping seed.");
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 12);
  await Admin.create({ email, password: hashed });

  console.log(`Admin seeded: ${email}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Footer } from "../lib/models/footer";

async function seed() {
  await dbConnect();
  const existing = await Footer.findOne();
  if (existing) { console.log("Footer already exists, skipping."); process.exit(0); }
  await Footer.create({
    description: "Trusted forensic science laboratory delivering accurate and reliable results.",
    phone: "+1 (555) 000-0000", email: "info@forensilabs.com", address: "123 Lab Street, Science City",
    quickLinks: [{ label: "About Us", href: "/about" }, { label: "Services", href: "/services" }, { label: "Case Studies", href: "/#case-studies" }, { label: "Careers", href: "/careers" }],
    socialLinks: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
  });
  console.log("Footer seeded."); process.exit(0);
}
seed().catch((e) => { console.error("Seed failed:", e); process.exit(1); });

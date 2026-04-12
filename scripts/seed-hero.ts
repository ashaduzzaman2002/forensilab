import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Hero } from "../lib/models/hero";

async function seed() {
  await dbConnect();

  const existing = await Hero.findOne();
  if (existing) {
    console.log("Hero already exists, skipping seed.");
    process.exit(0);
  }

  await Hero.create({
    heading: "FORENSIC SOLUTIONS",
    subheading: "AND LAB SERVICES",
    subtitle: "Empowering justice through scientific analysis",
    primaryBtnText: "Explore Services",
    primaryBtnLink: "/services",
    secondaryBtnText: "Download Catalog",
    secondaryBtnLink: "#",
    bgImage: "",
  });

  console.log("Hero section seeded.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

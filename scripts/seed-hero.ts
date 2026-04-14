import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Hero } from "../lib/models/hero";

async function seed() {
  await dbConnect();
  await Hero.deleteMany({});
  await Hero.create({
    badge: "DPIIT Recognized · ISO 9001:2015 Certified",
    headingLine1: "Forensic",
    headingLine2: "Solutions",
    headingLine3: "& Lab Services",
    description: "Empowering justice through scientific analysis. A multidisciplinary forensic agency delivering precise, court-admissible results.",
    primaryBtnText: "Explore Lab →",
    primaryBtnLink: "/gallery",
    secondaryBtnText: "Request a Quote",
    secondaryBtnLink: "#contact",
    stats: [
      { value: "12+", label: "Corporate Clients" },
      { value: "4", label: "University MOUs" },
      { value: "3", label: "City Offices" },
    ],
  });
  console.log("Hero section seeded.");
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });

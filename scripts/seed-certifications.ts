import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Certification } from "../lib/models/certification";

const data = [
  { title: "NABL Accredited", text: "National Accreditation Board for Testing and Calibration Laboratories", order: 0 },
  { title: "ISO 17025 Certified", text: "International standard for laboratory competence", order: 1 },
  { title: "ASCLD/LAB Compliant", text: "American Society of Crime Laboratory Directors accreditation", order: 2 },
  { title: "ILAC Recognized", text: "International Laboratory Accreditation Cooperation member", order: 3 },
];

async function seed() {
  await dbConnect();
  const count = await Certification.countDocuments();
  if (count > 0) { console.log(`${count} certifications exist, skipping.`); process.exit(0); }
  await Certification.insertMany(data);
  console.log(`${data.length} certifications seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });

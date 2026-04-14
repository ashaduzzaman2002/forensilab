import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Sector } from "../lib/models/sector";

const data = [
  { icon: "🏦", name: "Banking & Finance", description: "Fraud detection, document forgery analysis, and signature verification for banks.", order: 0 },
  { icon: "🛡️", name: "Insurance", description: "Claim investigation, evidence analysis, and expert testimony support for insurers.", order: 1 },
  { icon: "⚖️", name: "Legal & Judiciary", description: "Court-admissible forensic reports and expert witness services for lawyers.", order: 2 },
  { icon: "👮", name: "Law Enforcement", description: "Crime scene investigation and forensic support for police & government agencies.", order: 3 },
  { icon: "🏢", name: "Corporate", description: "Internal fraud investigation, background verification, and digital forensics.", order: 4 },
  { icon: "🎓", name: "Academic & Research", description: "Internship programs, MOU partnerships, and forensic training for universities.", order: 5 },
  { icon: "🏥", name: "Healthcare & Medical", description: "Biological evidence analysis, toxicology reports, and medico-legal services.", order: 6 },
  { icon: "🪖", name: "Defence & Army", description: "Specialized forensic support, ballistic analysis, and identity verification.", order: 7 },
];

async function seed() {
  await dbConnect();
  await Sector.deleteMany({});
  await Sector.insertMany(data);
  console.log("Sectors seeded.");
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });

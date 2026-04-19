import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Gallery } from "../lib/models/gallery";

const data = [
  { title: "Fingerprint Enhancement", description: "Latent fingerprint developed using ninhydrin on a questioned document.", order: 0 },
  { title: "DNA Sample Collection", description: "Buccal swab collection for STR profiling in a paternity dispute case.", order: 1 },
  { title: "Document Examination", description: "UV and IR analysis of a suspected forged cheque under VSC equipment.", order: 2 },
  { title: "Crime Scene Processing", description: "Systematic evidence collection and documentation at an indoor crime scene.", order: 3 },
  { title: "Ballistics Testing", description: "Firearm discharge residue analysis using SEM-EDX instrumentation.", order: 4 },
  { title: "Digital Forensics Lab", description: "Data recovery and analysis from encrypted mobile devices.", order: 5 },
];

async function seed() {
  await dbConnect();
  await Gallery.deleteMany({});
  await Gallery.insertMany(data);
  console.log(`${data.length} gallery items seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });

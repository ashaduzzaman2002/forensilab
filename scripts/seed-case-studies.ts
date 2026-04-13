import "dotenv/config";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../lib/models/case-study";

const data = [
  { slug: "fingerprint-analysis", title: "Fingerprint Analysis", description: "Latent print identification using advanced chemical and digital enhancement techniques.", order: 0 },
  { slug: "dna-profiling", title: "DNA Profiling", description: "Genetic marker extraction and STR analysis for precise individual identification.", order: 1 },
  { slug: "ballistics-analysis", title: "Ballistics Analysis", description: "Firearm discharge residue testing and projectile trajectory reconstruction.", order: 2 },
  { slug: "cyber-forensics", title: "Cyber Forensics Report", description: "Digital evidence recovery from encrypted devices and network intrusion analysis.", order: 3 },
];

async function seed() {
  await dbConnect();
  const count = await CaseStudy.countDocuments();
  if (count > 0) { console.log(`${count} case studies exist, skipping.`); process.exit(0); }
  await CaseStudy.insertMany(data);
  console.log(`${data.length} case studies seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });

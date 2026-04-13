import "dotenv/config";
import { dbConnect } from "../lib/db";
import { TrustedBy } from "../lib/models/trusted-by";

const data = [
  { name: "CipherTrace", order: 0 },
  { name: "Axiom Cyber", order: 1 },
  { name: "NIST", order: 2 },
  { name: "Veritas", order: 3 },
  { name: "SecureLogix", order: 4 },
  { name: "Interpol Cyber", order: 5 },
  { name: "Meta", order: 6 },
  { name: "Palantir", order: 7 },
];

async function seed() {
  await dbConnect();
  const count = await TrustedBy.countDocuments();
  if (count > 0) { console.log(`${count} partners exist, skipping.`); process.exit(0); }
  await TrustedBy.insertMany(data);
  console.log(`${data.length} partners seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });

import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Partnership } from "../lib/models/partnership";

const data = [
  { name: "Adamas University", subtitle: "", type: "mou", order: 0 },
  { name: "Kalinga University", subtitle: "Raipur, India", type: "mou", order: 1 },
  { name: "Sandip University", subtitle: "UGC Recognised", type: "mou", order: 2 },
  { name: "Usha Martin University", subtitle: "", type: "mou", order: 3 },
  { name: "IEML Labs", subtitle: "", type: "moa", order: 4 },
  { name: "Aryaman Detection of Truth", subtitle: "", type: "moa", order: 5 },
  { name: "Sandip University", subtitle: "UGC Recognised", type: "moa", order: 6 },
  { name: "Usha Martin University", subtitle: "", type: "moa", order: 7 },
];

async function seed() {
  await dbConnect();
  await Partnership.deleteMany({});
  await Partnership.insertMany(data);
  console.log(`${data.length} partnerships seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });

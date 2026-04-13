import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Location } from "../lib/models/location";

const data = [
  { name: "Main Laboratory (HQ)", address: "123 Lab Street, Science City, CA 90210", phone: "+1 (555) 000-0000", email: "info@forensilabs.com", isHeadquarters: true, order: 0 },
  { name: "East Coast Lab", address: "456 Forensic Ave, New York, NY 10001", phone: "+1 (555) 111-1111", email: "east@forensilabs.com", isHeadquarters: false, order: 1 },
  { name: "Midwest Facility", address: "789 Evidence Blvd, Chicago, IL 60601", phone: "+1 (555) 222-2222", email: "midwest@forensilabs.com", isHeadquarters: false, order: 2 },
];

async function seed() {
  await dbConnect();
  const count = await Location.countDocuments();
  if (count > 0) { console.log(`${count} locations exist, skipping.`); process.exit(0); }
  await Location.insertMany(data);
  console.log(`${data.length} locations seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });

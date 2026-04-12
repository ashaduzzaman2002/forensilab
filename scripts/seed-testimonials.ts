import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Testimonial } from "../lib/models/testimonial";

const data = [
  { name: "Dr. Sarah Mitchell", role: "Chief Forensic Officer, National Crime Lab", text: "ForensiLabs delivered exceptional DNA analysis results that were instrumental in closing a high-profile case. Their precision is unmatched.", order: 0 },
  { name: "James Carter", role: "Senior Detective, Metro PD", text: "The ballistics team provided critical evidence within 48 hours. Their turnaround time and accuracy exceeded all expectations.", order: 1 },
  { name: "Dr. Priya Sharma", role: "Director, Toxicology Institute", text: "We've partnered with ForensiLabs for three years. Their chemical analysis capabilities and professionalism set the industry standard.", order: 2 },
  { name: "Michael Torres", role: "Cybercrime Unit Lead, FBI", text: "Their digital forensics division recovered encrypted data that other labs couldn't. Truly cutting-edge technology and expertise.", order: 3 },
  { name: "Emily Zhang", role: "Legal Counsel, Morrison & Associates", text: "Court-admissible reports, clear documentation, and expert testimony support. ForensiLabs is our go-to forensic partner.", order: 4 },
  { name: "Robert Okafor", role: "Lab Manager, State Forensic Services", text: "The trace evidence analysis was thorough and delivered ahead of schedule. Their team communicates clearly at every step.", order: 5 },
];

async function seed() {
  await dbConnect();
  const count = await Testimonial.countDocuments();
  if (count > 0) {
    console.log(`${count} testimonials already exist, skipping seed.`);
    process.exit(0);
  }
  await Testimonial.insertMany(data);
  console.log(`${data.length} testimonials seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });

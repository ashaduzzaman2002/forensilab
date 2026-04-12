import { dbConnect } from "@/lib/db";
import { Testimonial } from "@/lib/models/testimonial";
import { TestimonialsClient } from "./testimonials-client";

const fallback = [
  { name: "Dr. Sarah Mitchell", role: "Chief Forensic Officer, National Crime Lab", text: "ForensiLabs delivered exceptional DNA analysis results that were instrumental in closing a high-profile case. Their precision is unmatched." },
  { name: "James Carter", role: "Senior Detective, Metro PD", text: "The ballistics team provided critical evidence within 48 hours. Their turnaround time and accuracy exceeded all expectations." },
  { name: "Dr. Priya Sharma", role: "Director, Toxicology Institute", text: "We've partnered with ForensiLabs for three years. Their chemical analysis capabilities and professionalism set the industry standard." },
  { name: "Michael Torres", role: "Cybercrime Unit Lead, FBI", text: "Their digital forensics division recovered encrypted data that other labs couldn't. Truly cutting-edge technology and expertise." },
  { name: "Emily Zhang", role: "Legal Counsel, Morrison & Associates", text: "Court-admissible reports, clear documentation, and expert testimony support. ForensiLabs is our go-to forensic partner." },
  { name: "Robert Okafor", role: "Lab Manager, State Forensic Services", text: "The trace evidence analysis was thorough and delivered ahead of schedule. Their team communicates clearly at every step." },
];

export async function Testimonials() {
  await dbConnect();
  const docs = await Testimonial.find().sort({ order: 1 }).lean();
  const items = docs.length > 0 ? JSON.parse(JSON.stringify(docs)) : fallback;
  return <TestimonialsClient testimonials={items} />;
}

import "dotenv/config";
import { dbConnect } from "../lib/db";
import { About } from "../lib/models/about";

async function seed() {
  await dbConnect();
  const existing = await About.findOne();
  if (existing) { console.log("About already exists, skipping."); process.exit(0); }
  await About.create({
    title: "Trusted Experts in Forensic & Digital Investigation",
    subtitle: "About Us",
    content: "<p>ForensiLabs is a premier forensic science laboratory dedicated to delivering accurate, reliable, and court-admissible results. With over a decade of experience, our team of certified analysts combines scientific rigor with cutting-edge technology.</p><p>From DNA profiling and toxicology to cyber forensics and ballistics, we provide comprehensive investigative support to law enforcement agencies, legal professionals, and corporate clients worldwide.</p><p>Our mission is to empower justice through scientific analysis — ensuring every piece of evidence is handled with the highest standards of integrity and confidentiality.</p>",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Certified & Accredited Lab", "Advanced Technology", "Experienced Analysts", "Confidential & Secure"],
    stats: [{ value: "500+", label: "Cases Solved" }, { value: "10+", label: "Years Experience" }, { value: "50+", label: "Expert Analysts" }, { value: "99%", label: "Client Satisfaction" }],
  });
  console.log("About page seeded."); process.exit(0);
}
seed().catch((e) => { console.error("Seed failed:", e); process.exit(1); });

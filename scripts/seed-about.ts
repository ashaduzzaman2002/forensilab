import "dotenv/config";
import { dbConnect } from "../lib/db";
import { About } from "../lib/models/about";

async function seed() {
  await dbConnect();
  const existing = await About.findOne();
  if (existing) { console.log("About already exists, skipping."); process.exit(0); }
  await About.create({
    subtitle: "About Us",
    whoWeAre: {
      title: "Trusted Experts in Forensic & Digital Investigation",
      content: "<p>ForensiLabs is a premier forensic science laboratory dedicated to delivering accurate, reliable, and court-admissible results. With over a decade of experience, our team of certified analysts combines scientific rigor with cutting-edge technology.</p>",
    },
    whatWeDo: {
      title: "Comprehensive Forensic Services",
      content: "<p>From DNA profiling and toxicology to cyber forensics and ballistics, we provide comprehensive investigative support to law enforcement agencies, legal professionals, and corporate clients worldwide.</p>",
    },
    others: {
      title: "Our Certifications",
      content: "<p>ISO 9001:2015 Certification — A globally recognized standard ensuring our laboratory and investigative processes meet benchmarks.</p><p>DPIIT Start-up India Recognition — Official recognition by the Department for Promotion of Industry and Internal Trade.</p>",
    },
    stats: [{ value: "500+", label: "Cases Solved" }, { value: "10+", label: "Years Experience" }, { value: "50+", label: "Expert Analysts" }, { value: "99%", label: "Client Satisfaction" }],
  });
  console.log("About page seeded."); process.exit(0);
}
seed().catch((e) => { console.error("Seed failed:", e); process.exit(1); });

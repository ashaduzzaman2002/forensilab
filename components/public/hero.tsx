import { dbConnect } from "@/lib/db";
import { Hero as HeroModel } from "@/lib/models/hero";
import { HeroClient } from "./hero-client";

const fallback = {
  badge: "DPIIT Recognized · ISO 9001:2015 Certified",
  headingLine1: "Forensic",
  headingLine2: "Solutions",
  headingLine3: "& Lab Services",
  description: "Empowering justice through scientific analysis. A multidisciplinary forensic agency delivering precise, court-admissible results.",
  primaryBtnText: "Explore Lab →",
  primaryBtnLink: "/gallery",
  secondaryBtnText: "Request a Quote",
  secondaryBtnLink: "#contact",
  stats: [
    { value: "12+", label: "Corporate Clients" },
    { value: "4", label: "University MOUs" },
    { value: "3", label: "City Offices" },
  ],
};

export async function Hero() {
  await dbConnect();
  const doc = await HeroModel.findOne().lean();
  const data = doc ? JSON.parse(JSON.stringify(doc)) : fallback;
  return <HeroClient data={{ ...fallback, ...data }} />;
}

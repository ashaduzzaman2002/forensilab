import { dbConnect } from "@/lib/db";
import { Hero as HeroModel } from "@/lib/models/hero";
import { HeroClient } from "./hero-client";

const fallback = {
  heading: "FORENSIC SOLUTIONS",
  subheading: "AND LAB SERVICES",
  subtitle: "Empowering justice through scientific analysis",
  primaryBtnText: "Explore Services",
  primaryBtnLink: "/services",
  secondaryBtnText: "Download Catalog",
  secondaryBtnLink: "#",
  bgImage: "/hero-bg.png",
};

export async function Hero() {
  await dbConnect();
  const doc = await HeroModel.findOne().lean();
  const data = doc ? JSON.parse(JSON.stringify(doc)) : fallback;
  return <HeroClient data={{ ...fallback, ...data }} />;
}

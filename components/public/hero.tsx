import { dbConnect } from "@/lib/db";
import { Hero as HeroModel } from "@/lib/models/hero";
import { HeroClient } from "./hero-client";

export async function Hero() {
  await dbConnect();
  const doc = await HeroModel.findOne().lean();
  if (!doc) return null;
  return <HeroClient data={JSON.parse(JSON.stringify(doc))} />;
}

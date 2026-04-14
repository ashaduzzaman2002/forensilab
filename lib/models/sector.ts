import mongoose, { Schema } from "mongoose";

const SectorSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.Sector) delete mongoose.models.Sector;
export const Sector = mongoose.model("Sector", SectorSchema);

import mongoose, { Schema } from "mongoose";

const PartnershipSchema = new Schema({
  name: { type: String, required: true },
  subtitle: { type: String, default: "" },
  type: { type: String, enum: ["mou", "moa"], required: true },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.Partnership) delete mongoose.models.Partnership;
export const Partnership = mongoose.model("Partnership", PartnershipSchema);

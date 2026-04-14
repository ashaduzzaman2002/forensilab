import mongoose, { Schema } from "mongoose";

const EquipmentSchema = new Schema({
  badge: { type: String, default: "" },
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.Equipment) delete mongoose.models.Equipment;
export const Equipment = mongoose.model("Equipment", EquipmentSchema);

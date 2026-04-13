import mongoose, { Schema } from "mongoose";

const LocationSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  mapEmbed: { type: String, default: "" },
  isHeadquarters: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.Location) delete mongoose.models.Location;
export const Location = mongoose.model("Location", LocationSchema);

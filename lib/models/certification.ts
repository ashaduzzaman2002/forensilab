import mongoose, { Schema } from "mongoose";

const CertificationSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  icon: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.Certification) delete mongoose.models.Certification;
export const Certification = mongoose.model("Certification", CertificationSchema);

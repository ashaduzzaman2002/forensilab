import mongoose, { Schema } from "mongoose";

const GallerySchema = new Schema({
  caseId: { type: String, required: true },
  scene: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.Gallery) delete mongoose.models.Gallery;
export const Gallery = mongoose.model("Gallery", GallerySchema);

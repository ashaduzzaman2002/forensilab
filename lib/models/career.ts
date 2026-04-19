import mongoose, { Schema } from "mongoose";

const CareerSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, default: "" },
  requirements: { type: String, default: "" },
  applyLink: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.Career) delete mongoose.models.Career;
export const Career = mongoose.model("Career", CareerSchema);

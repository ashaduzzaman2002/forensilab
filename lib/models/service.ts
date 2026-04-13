import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "" },
  image: { type: String, default: "" },
  thumbnail: { type: String, default: "" },
  content: { type: String, default: "" },
  details: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Delete cached model to pick up schema changes in dev
if (mongoose.models.Service) {
  delete mongoose.models.Service;
}

export const Service = mongoose.model("Service", ServiceSchema);

import mongoose, { Schema } from "mongoose";

const TeamSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  email: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.Team) delete mongoose.models.Team;
export const Team = mongoose.model("Team", TeamSchema);

import mongoose, { Schema, models, model } from "mongoose";

const StatSchema = new Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
}, { _id: false });

const HeroSchema = new Schema({
  badge: { type: String, default: "" },
  headingLine1: { type: String, required: true },
  headingLine2: { type: String, required: true },
  headingLine3: { type: String, default: "" },
  description: { type: String, required: true },
  primaryBtnText: { type: String, required: true },
  primaryBtnLink: { type: String, required: true },
  secondaryBtnText: { type: String, required: true },
  secondaryBtnLink: { type: String, required: true },
  stats: { type: [StatSchema], default: [] },
}, { timestamps: true });

export const Hero = models.Hero || model("Hero", HeroSchema);

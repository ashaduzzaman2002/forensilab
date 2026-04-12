import mongoose, { Schema, models, model } from "mongoose";

const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);

import mongoose, { Schema } from "mongoose";

const QuoteRequestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  requirement: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

if (mongoose.models.QuoteRequest) delete mongoose.models.QuoteRequest;
export const QuoteRequest = mongoose.model("QuoteRequest", QuoteRequestSchema);

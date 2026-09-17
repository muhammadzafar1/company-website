import mongoose from 'mongoose';

const quoteRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '', trim: true },
    company: { type: String, default: '', trim: true },
    service: { type: String, required: true, trim: true },
    budget: { type: String, default: '', trim: true },
    description: { type: String, required: true, trim: true },
    deadline: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('QuoteRequest', quoteRequestSchema);

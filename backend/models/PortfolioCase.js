import mongoose from 'mongoose';

const portfolioCaseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    client: { type: String, default: '', trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    technologies: { type: [String], default: [] },
    challenge: { type: String, default: '' },
    solution: { type: String, default: '' },
    result: { type: String, default: '' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('PortfolioCase', portfolioCaseSchema);

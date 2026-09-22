import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    platform: { type: String, default: 'Web', trim: true },
    platforms: { type: String, default: '', trim: true },
    technologies: { type: [String], default: [] },
    features: { type: [String], default: [] },
    image: { type: String, default: '' },
    link: { type: String, default: '' },
    playStore: { type: String, default: '' },
    liveDemo: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);

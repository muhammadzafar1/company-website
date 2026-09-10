import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, default: '' },
    review: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Web', 'Mobile', 'E-Commerce', 'SaaS'], default: 'Web' },
    image: { type: String, default: '' },
    technologies: [{ type: String }],
    liveDemo: { type: String, default: '' },
    github: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);

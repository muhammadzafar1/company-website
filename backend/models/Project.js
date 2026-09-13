import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);

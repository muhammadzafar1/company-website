import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    label: { type: String, default: 'Team' },
    shortBio: { type: String, default: '' },
    about: { type: String, default: '' },
    location: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    experience: { type: String, default: '' },
    availability: { type: String, default: '' },
    skills: [{ type: String }],
    focus: [{ type: String }],
    portfolio: [{ type: String }],
    image: { type: String, default: '' },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Team', teamSchema);

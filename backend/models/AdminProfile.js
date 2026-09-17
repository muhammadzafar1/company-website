import mongoose from 'mongoose';

const adminProfileSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      default: 'Admin',
      trim: true,
    },
    email: {
      type: String,
      default: '',
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('AdminProfile', adminProfileSchema);

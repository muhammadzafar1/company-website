import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from './models/Admin.js';

dotenv.config();

const email = process.env.ADMIN_EMAIL || 'admin@example.com';
const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
const name = process.env.ADMIN_USERNAME || 'Admin';
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Missing MONGO_URI in backend/.env');
  process.exit(1);
}

try {
  await mongoose.connect(mongoUri);

  const passwordHash = await bcrypt.hash(password, 10);
  const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });

  if (existingAdmin) {
    existingAdmin.name = name;
    existingAdmin.password = passwordHash;
    existingAdmin.role = 'super-admin';
    await existingAdmin.save();
    console.log(`Admin updated: ${email}`);
  } else {
    await Admin.create({
      name,
      email: email.toLowerCase(),
      password: passwordHash,
      role: 'super-admin',
    });
    console.log(`Admin created: ${email}`);
  }

  console.log(`Login password: ${password}`);
} catch (error) {
  console.error('Admin insert failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}

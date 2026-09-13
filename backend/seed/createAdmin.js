import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

dotenv.config();

const runSeed = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!mongoUri) {
    console.error('Seed failed: MONGO_URI is missing in .env');
    process.exit(1);
  }

  if (!adminEmail || !adminPassword) {
    console.error('Seed failed: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    const normalizedEmail = adminEmail.toLowerCase();
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });

    if (existingAdmin) {
      const passwordMatches = await bcrypt.compare(adminPassword, existingAdmin.password);

      if (!passwordMatches || existingAdmin.role !== 'super-admin' || existingAdmin.name !== 'Super Admin') {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await Admin.updateOne(
          { _id: existingAdmin._id },
          {
            $set: {
              name: 'Super Admin',
              email: normalizedEmail,
              password: hashedPassword,
              role: 'super-admin',
            },
          }
        );
        console.log(`Admin updated successfully: ${normalizedEmail}`);
      } else {
        console.log(`Admin already exists with matching credentials: ${normalizedEmail}`);
      }

      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await Admin.create({
      name: 'Super Admin',
      email: normalizedEmail,
      password: hashedPassword,
      role: 'super-admin',
    });

    console.log(`Admin created successfully: ${normalizedEmail}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed. Real error:', error.message);
    console.error('Possible cause: wrong Mongo URI, MongoDB not running, auth failure, or network issue.');
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

runSeed();

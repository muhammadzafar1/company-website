import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import Admin from '../models/Admin.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      return sendResponse(res, 503, false, 'Database is unavailable. Please start MongoDB and try again.', {});
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return sendResponse(res, 401, false, 'Invalid email or password', {});
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, 'Invalid email or password', {});
    }

    const token = jwt.sign(
      {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    );

    return sendResponse(res, 200, true, 'Login successful', {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const seedAdmin = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('Admin seed skipped: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
      return;
    }

    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      const passwordMatches = await bcrypt.compare(adminPassword, existingAdmin.password);

      if (!passwordMatches || existingAdmin.role !== 'super-admin' || existingAdmin.name !== 'Super Admin') {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await Admin.updateOne(
          { _id: existingAdmin._id },
          {
            $set: {
              name: 'Super Admin',
              email: adminEmail,
              password: hashedPassword,
              role: 'super-admin',
            },
          }
        );
        console.log(`Admin updated to env credentials: ${adminEmail}`);
      }

      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await Admin.create({
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'super-admin',
    });
    console.log(`Default admin created: ${adminEmail}`);
  } catch (error) {
    console.error('Admin seed failed:', error.message);
  }
};

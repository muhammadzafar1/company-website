import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import AdminProfile from '../models/AdminProfile.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

const getEnvAdminCredentials = () => {
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const adminUsername = (process.env.ADMIN_USERNAME || '').trim();
  const adminPassword = process.env.ADMIN_PASSWORD || '';

  return { adminEmail, adminUsername, adminPassword };
};

const ensureAdminProfile = async () => {
  const { adminEmail, adminUsername } = getEnvAdminCredentials();

  let profile = await AdminProfile.findOne({});

  if (!profile) {
    profile = await AdminProfile.create({
      displayName: adminUsername || 'Admin',
      email: adminEmail || '',
      passwordHash: '',
    });
  }

  if (adminEmail && (!profile.email || profile.email !== adminEmail)) {
    profile.email = adminEmail;
  }

  if (adminUsername && (!profile.displayName || profile.displayName !== adminUsername)) {
    profile.displayName = adminUsername;
  }

  await profile.save();
  return profile;
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

    const { email, username, password } = req.body;
    const { adminEmail, adminUsername, adminPassword } = getEnvAdminCredentials();

    const providedIdentifier = (email || username || '').trim().toLowerCase();
    const databaseAdmin = await Admin.findOne({
      $or: [
        { email: providedIdentifier },
        { name: providedIdentifier },
      ],
    });

    let authenticatedAdmin = null;
    if (databaseAdmin && await bcrypt.compare(password, databaseAdmin.password)) {
      authenticatedAdmin = databaseAdmin;
    } else {
      const validEnvIdentifier = providedIdentifier === adminEmail
        || providedIdentifier === adminUsername.toLowerCase();
      if (validEnvIdentifier && adminPassword && password === adminPassword) {
        authenticatedAdmin = {
          _id: 'admin',
          name: adminUsername || 'Admin',
          email: adminEmail,
          role: 'super-admin',
        };
      }
    }

    if (!authenticatedAdmin) {
      return sendResponse(res, 401, false, 'Invalid email or password', {});
    }

    const token = jwt.sign(
      {
        id: authenticatedAdmin._id.toString(),
        name: authenticatedAdmin.name,
        email: authenticatedAdmin.email,
        role: authenticatedAdmin.role,
      },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    );

    return sendResponse(res, 200, true, 'Login successful', {
      token,
      admin: {
        id: authenticatedAdmin._id.toString(),
        name: authenticatedAdmin.name,
        email: authenticatedAdmin.email,
        role: authenticatedAdmin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const profile = await ensureAdminProfile();

    if (name) profile.displayName = name.trim();
    if (email) profile.email = email.trim().toLowerCase();

    await profile.save();

    return sendResponse(res, 200, true, 'Profile updated successfully', {
      profile: {
        name: profile.displayName,
        email: profile.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const profile = await ensureAdminProfile();
    const hash = await bcrypt.hash(newPassword, 10);

    profile.passwordHash = hash;
    await profile.save();

    return sendResponse(res, 200, true, 'Password updated successfully', {
      profile: {
        name: profile.displayName,
        email: profile.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const seedAdmin = async () => {
  try {
    const { adminEmail, adminUsername, adminPassword } = getEnvAdminCredentials();

    if (!adminEmail || !adminPassword) {
      console.warn('Admin seed skipped: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
      return;
    }

    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await Admin.create({
        name: adminUsername || 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'super-admin',
      });
      console.log(`Default admin created: ${adminEmail}`);
    } else {
      const passwordMatches = await bcrypt.compare(adminPassword, existingAdmin.password);
      if (!passwordMatches || existingAdmin.role !== 'super-admin') {
        await Admin.findByIdAndUpdate(existingAdmin._id, {
          $set: {
            name: adminUsername || existingAdmin.name || 'Admin',
            email: adminEmail,
            password: await bcrypt.hash(adminPassword, 10),
            role: 'super-admin',
          },
        });
        console.log(`Admin updated to env credentials: ${adminEmail}`);
      }
    }

    await ensureAdminProfile();
  } catch (error) {
    console.error('Admin seed failed:', error.message);
  }
};

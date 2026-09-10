import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@stepbystep.com' });
    if (!existingAdmin) {
      const password = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin',
        email: 'admin@stepbystep.com',
        password,
        role: 'admin',
      });
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Admin seed failed:', error.message);
  }
};

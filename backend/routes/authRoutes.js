import express from 'express';
import { body } from 'express-validator';
import { login, updatePassword, updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').optional({ values: 'falsy' }).isString(),
    body('username').optional({ values: 'falsy' }).isString(),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  login
);

router.put(
  '/update-profile',
  authMiddleware,
  [
    body('name').optional().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long.'),
    body('email').optional().isEmail().withMessage('Valid email is required.'),
  ],
  updateProfile
);

router.put(
  '/update-password',
  authMiddleware,
  [
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  ],
  updatePassword
);

export default router;

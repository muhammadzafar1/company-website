import express from 'express';
import { body } from 'express-validator';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  login
);

export default router;

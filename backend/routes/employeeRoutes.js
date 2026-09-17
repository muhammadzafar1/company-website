import express from 'express';
import { body } from 'express-validator';
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
} from '../controllers/employeeController.js';
import authMiddleware, { authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

const employeeValidation = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('role').trim().notEmpty().withMessage('Role is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
];

router.get('/', getEmployees);
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  employeeValidation,
  createEmployee
);
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  deleteEmployee
);

export default router;

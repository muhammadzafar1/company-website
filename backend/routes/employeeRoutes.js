import express from 'express';
import { body } from 'express-validator';
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from '../controllers/employeeController.js';
import authMiddleware, { authorizeRoles } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

const employeeValidation = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('designation').trim().notEmpty().withMessage('Designation is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
  body('department').trim().notEmpty().withMessage('Department is required.'),
  body('joiningDate').isISO8601().withMessage('Joining date must be a valid date.'),
];

router.get('/', getEmployees);
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  upload.single('image'),
  employeeValidation,
  createEmployee
);
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  upload.single('image'),
  employeeValidation,
  updateEmployee
);
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  deleteEmployee
);

export default router;

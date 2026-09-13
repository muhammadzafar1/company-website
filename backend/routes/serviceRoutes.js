import express from 'express';
import { body } from 'express-validator';
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from '../controllers/serviceController.js';
import authMiddleware, { authorizeRoles } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

const serviceValidation = [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('description').trim().notEmpty().withMessage('Description is required.'),
];

router.get('/', getServices);
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  upload.single('image'),
  serviceValidation,
  createService
);
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  upload.single('image'),
  serviceValidation,
  updateService
);
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  deleteService
);

export default router;

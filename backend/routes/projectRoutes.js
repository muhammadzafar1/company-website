import express from 'express';
import { body } from 'express-validator';
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '../controllers/projectController.js';
import authMiddleware, { authorizeRoles } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('description').trim().notEmpty().withMessage('Description is required.'),
  body('category').trim().notEmpty().withMessage('Category is required.'),
];

router.get('/', getProjects);
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  upload.single('image'),
  projectValidation,
  createProject
);
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  upload.single('image'),
  projectValidation,
  updateProject
);
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  deleteProject
);

export default router;

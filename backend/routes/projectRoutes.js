import express from 'express';
import { body } from 'express-validator';
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '../controllers/projectController.js';
import authMiddleware, { authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

const projectValidation = [
  body('name').trim().notEmpty().withMessage('Project name is required.'),
  body('client').trim().notEmpty().withMessage('Client name is required.'),
  body('status').isIn(['ongoing', 'completed', 'upcoming']).withMessage('Status is invalid.'),
  body('startDate').isISO8601().withMessage('A valid start date is required.'),
  body('deadline').isISO8601().withMessage('A valid deadline is required.'),
  body('startDate').custom((value, { req }) => {
    if (!req.body.deadline) return true;
    if (new Date(value) > new Date(req.body.deadline)) {
      throw new Error('Start date cannot be after deadline.');
    }
    return true;
  }),
];

router.get('/', getProjects);
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  projectValidation,
  createProject
);
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
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

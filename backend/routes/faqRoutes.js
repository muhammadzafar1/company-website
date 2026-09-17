import express from 'express';
import { body } from 'express-validator';
import { createFaq, deleteFaq, getFaqs, updateFaq } from '../controllers/faqController.js';
import authMiddleware, { authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getFaqs);
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  [
    body('question').trim().notEmpty().withMessage('Question is required.'),
    body('answer').trim().notEmpty().withMessage('Answer is required.'),
    body('category').trim().notEmpty().withMessage('Category is required.'),
  ],
  createFaq
);
router.put('/:id', authMiddleware, authorizeRoles('admin', 'super-admin'), updateFaq);
router.delete('/:id', authMiddleware, authorizeRoles('admin', 'super-admin'), deleteFaq);

export default router;

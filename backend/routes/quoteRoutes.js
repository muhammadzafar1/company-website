import express from 'express';
import { body } from 'express-validator';
import { deleteQuote, getQuotes, submitQuote } from '../controllers/quoteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('service').trim().notEmpty().withMessage('Service is required.'),
    body('description').trim().notEmpty().withMessage('Project description is required.'),
  ],
  submitQuote
);
router.get('/', authMiddleware, getQuotes);
router.delete('/:id', authMiddleware, deleteQuote);

export default router;

import express from 'express';
import { deleteContact, getContacts, submitContact } from '../controllers/contactController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/', [
	body('name').trim().notEmpty().withMessage('Name is required.'),
	body('email').isEmail().withMessage('Valid email is required.'),
	body('message').trim().notEmpty().withMessage('Message is required.'),
], submitContact);
router.get('/', authMiddleware, getContacts);
router.delete('/:id', authMiddleware, deleteContact);

export default router;

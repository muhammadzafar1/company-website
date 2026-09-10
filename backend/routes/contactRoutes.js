import express from 'express';
import { deleteContact, getContacts, submitContact } from '../controllers/contactController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', authMiddleware, getContacts);
router.delete('/:id', authMiddleware, deleteContact);

export default router;

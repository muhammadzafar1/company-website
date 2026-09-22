import express from 'express';
import authMiddleware, { authorizeRoles } from '../middleware/authMiddleware.js';
import {
  createContent,
  deleteContent,
  getContentMeta,
  listContent,
  updateContent,
} from '../controllers/adminContentController.js';

const router = express.Router();
const adminOnly = [authMiddleware, authorizeRoles('admin', 'super-admin')];

router.use(...adminOnly);
router.get('/meta', getContentMeta);
router.get('/:resource', listContent);
router.post('/:resource', createContent);
router.put('/:resource/:id', updateContent);
router.delete('/:resource/:id', deleteContent);

export default router;
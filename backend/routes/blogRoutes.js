import express from 'express';
import { body } from 'express-validator';
import { createBlogPost, deleteBlogPost, getBlogPosts, getBlogPostBySlug, updateBlogPost } from '../controllers/blogController.js';
import authMiddleware, { authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin', 'super-admin'),
  [
    body('title').trim().notEmpty().withMessage('Title is required.'),
    body('slug').trim().notEmpty().withMessage('Slug is required.'),
    body('category').trim().notEmpty().withMessage('Category is required.'),
    body('excerpt').trim().notEmpty().withMessage('Excerpt is required.'),
    body('content').trim().notEmpty().withMessage('Content is required.'),
  ],
  createBlogPost
);
router.put('/:id', authMiddleware, authorizeRoles('admin', 'super-admin'), updateBlogPost);
router.delete('/:id', authMiddleware, authorizeRoles('admin', 'super-admin'), deleteBlogPost);

export default router;

import { validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const getBlogPosts = async (_req, res, next) => {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ publishedAt: -1 });
    return sendResponse(res, 200, true, 'Blog posts fetched successfully', { posts });
  } catch (error) {
    next(error);
  }
};

export const getBlogPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return sendResponse(res, 404, false, 'Blog post not found', {});
    }
    return sendResponse(res, 200, true, 'Blog post fetched successfully', { post });
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    const post = await BlogPost.create({ ...req.body, author: req.user?.name || 'AZ MEER Team' });
    return sendResponse(res, 201, true, 'Blog post created successfully', { post });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) {
      return sendResponse(res, 404, false, 'Blog post not found', {});
    }
    return sendResponse(res, 200, true, 'Blog post updated successfully', { post });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req, res, next) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return sendResponse(res, 404, false, 'Blog post not found', {});
    }
    return sendResponse(res, 200, true, 'Blog post deleted successfully', { post: deleted });
  } catch (error) {
    next(error);
  }
};

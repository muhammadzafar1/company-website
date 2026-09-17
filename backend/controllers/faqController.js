import { validationResult } from 'express-validator';
import Faq from '../models/Faq.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const getFaqs = async (_req, res, next) => {
  try {
    const faqs = await Faq.find({ isActive: true }).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'FAQs fetched successfully', { faqs });
  } catch (error) {
    next(error);
  }
};

export const createFaq = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    const faq = await Faq.create(req.body);
    return sendResponse(res, 201, true, 'FAQ created successfully', { faq });
  } catch (error) {
    next(error);
  }
};

export const updateFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) {
      return sendResponse(res, 404, false, 'FAQ not found', {});
    }
    return sendResponse(res, 200, true, 'FAQ updated successfully', { faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) {
      return sendResponse(res, 404, false, 'FAQ not found', {});
    }
    return sendResponse(res, 200, true, 'FAQ deleted successfully', { faq });
  } catch (error) {
    next(error);
  }
};

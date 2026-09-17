import { validationResult } from 'express-validator';
import QuoteRequest from '../models/QuoteRequest.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const submitQuote = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    const quote = await QuoteRequest.create(req.body);
    return sendResponse(res, 201, true, 'Quote request submitted successfully', { quote });
  } catch (error) {
    next(error);
  }
};

export const getQuotes = async (_req, res, next) => {
  try {
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Quote requests fetched successfully', { quotes });
  } catch (error) {
    next(error);
  }
};

export const deleteQuote = async (req, res, next) => {
  try {
    const deleted = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return sendResponse(res, 404, false, 'Quote request not found', {});
    }

    return sendResponse(res, 200, true, 'Quote request deleted successfully', { quote: deleted });
  } catch (error) {
    next(error);
  }
};

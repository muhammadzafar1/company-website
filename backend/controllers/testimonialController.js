import Testimonial from '../models/Testimonial.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const getTestimonials = async (_req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Testimonials fetched successfully', { testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    return sendResponse(res, 201, true, 'Testimonial created successfully', { testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) {
      return sendResponse(res, 404, false, 'Testimonial not found', {});
    }

    return sendResponse(res, 200, true, 'Testimonial updated successfully', { testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return sendResponse(res, 404, false, 'Testimonial not found', {});
    }

    return sendResponse(res, 200, true, 'Testimonial deleted successfully', { testimonial });
  } catch (error) {
    next(error);
  }
};

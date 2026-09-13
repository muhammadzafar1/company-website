import { validationResult } from 'express-validator';
import Service from '../models/Service.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const getServices = async (_req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Services fetched successfully', { services });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    const { title, description, price } = req.body;

    const service = await Service.create({
      title,
      description,
      price: price ? Number(price) : 0,
      image: req.file ? `/uploads/${req.file.filename}` : '',
    });

    return sendResponse(res, 201, true, 'Service created successfully', { service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    if (req.body.price !== undefined) {
      updateData.price = Number(req.body.price);
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return sendResponse(res, 404, false, 'Service not found', {});
    }

    return sendResponse(res, 200, true, 'Service updated successfully', { service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return sendResponse(res, 404, false, 'Service not found', {});
    }

    return sendResponse(res, 200, true, 'Service deleted successfully', { service });
  } catch (error) {
    next(error);
  }
};

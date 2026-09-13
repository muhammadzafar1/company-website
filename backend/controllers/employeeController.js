import { validationResult } from 'express-validator';
import Employee from '../models/Employee.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const getEmployees = async (_req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Employees fetched successfully', { employees });
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    const { name, designation, email, phone, department, joiningDate } = req.body;

    const employee = await Employee.create({
      name,
      designation,
      email,
      phone,
      department,
      joiningDate,
      photo: req.file ? `/uploads/${req.file.filename}` : '',
    });

    return sendResponse(res, 201, true, 'Employee created successfully', { employee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return sendResponse(res, 404, false, 'Employee not found', {});
    }

    return sendResponse(res, 200, true, 'Employee updated successfully', { employee });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return sendResponse(res, 404, false, 'Employee not found', {});
    }

    return sendResponse(res, 200, true, 'Employee deleted successfully', { employee });
  } catch (error) {
    next(error);
  }
};

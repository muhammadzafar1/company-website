import { validationResult } from 'express-validator';
import Employee from '../models/Employee.js';
import Project from '../models/Project.js';

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
    const { name, role, email } = req.body;

    const employee = await Employee.create({
      name,
      role,
      email,
      assignedProjectsCount: 0,
    });

    return sendResponse(res, 201, true, 'Employee created successfully', { employee });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return sendResponse(res, 404, false, 'Employee not found', {});
    }

    await Project.updateMany(
      { assignedEmployees: employee._id },
      { $pull: { assignedEmployees: employee._id } }
    );

    await Employee.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, true, 'Employee deleted successfully', { employee });
  } catch (error) {
    next(error);
  }
};

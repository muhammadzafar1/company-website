import { validationResult } from 'express-validator';
import Project from '../models/Project.js';
import Employee from '../models/Employee.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const getProjects = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status && ['ongoing', 'completed', 'upcoming'].includes(status) ? { status } : {};
    const projects = await Project.find(filter).populate('assignedEmployees', 'name role').sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Projects fetched successfully', { projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    const { name, client, status, startDate, deadline, assignedEmployees } = req.body;

    if (!startDate || !deadline || new Date(startDate) > new Date(deadline)) {
      return sendResponse(res, 400, false, 'Start date cannot be after deadline.', {});
    }

    const employeeIds = Array.isArray(assignedEmployees)
      ? assignedEmployees.filter(Boolean)
      : [];

    const project = await Project.create({
      name,
      client,
      status,
      startDate: new Date(startDate),
      deadline: new Date(deadline),
      assignedEmployees: employeeIds,
    });

    if (employeeIds.length) {
      await Employee.updateMany(
        { _id: { $in: employeeIds } },
        { $inc: { assignedProjectsCount: 1 } }
      );
    }

    return sendResponse(res, 201, true, 'Project created successfully', { project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', { errors: errors.array() });
  }

  try {
    const existing = await Project.findById(req.params.id);
    if (!existing) {
      return sendResponse(res, 404, false, 'Project not found', {});
    }

    const updateData = { ...req.body };
    if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
    if (updateData.deadline) updateData.deadline = new Date(updateData.deadline);

    if (updateData.startDate && updateData.deadline && new Date(updateData.startDate) > new Date(updateData.deadline)) {
      return sendResponse(res, 400, false, 'Start date cannot be after deadline.', {});
    }

    if (Array.isArray(updateData.assignedEmployees)) {
      const oldIds = existing.assignedEmployees.map((id) => id.toString());
      const newIds = updateData.assignedEmployees.filter(Boolean);
      const removed = oldIds.filter((id) => !newIds.includes(id));
      const added = newIds.filter((id) => !oldIds.includes(id));

      if (removed.length) {
        await Employee.updateMany({ _id: { $in: removed } }, { $inc: { assignedProjectsCount: -1 } });
      }
      if (added.length) {
        await Employee.updateMany({ _id: { $in: added } }, { $inc: { assignedProjectsCount: 1 } });
      }
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('assignedEmployees', 'name role');

    return sendResponse(res, 200, true, 'Project updated successfully', { project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return sendResponse(res, 404, false, 'Project not found', {});
    }

    if (project.assignedEmployees.length) {
      await Employee.updateMany(
        { _id: { $in: project.assignedEmployees } },
        { $inc: { assignedProjectsCount: -1 } }
      );
    }

    await Project.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, true, 'Project deleted successfully', { project });
  } catch (error) {
    next(error);
  }
};

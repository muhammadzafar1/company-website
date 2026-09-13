import { validationResult } from 'express-validator';
import Project from '../models/Project.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const getProjects = async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
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
    const { title, description, category, technologies, link } = req.body;

    const project = await Project.create({
      title,
      description,
      category,
      technologies: technologies ? technologies.split(',').map((item) => item.trim()).filter(Boolean) : [],
      link: link || '',
      image: req.file ? `/uploads/${req.file.filename}` : '',
    });

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
    const updateData = { ...req.body };

    if (req.body.technologies && typeof req.body.technologies === 'string') {
      updateData.technologies = req.body.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return sendResponse(res, 404, false, 'Project not found', {});
    }

    return sendResponse(res, 200, true, 'Project updated successfully', { project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return sendResponse(res, 404, false, 'Project not found', {});
    }

    return sendResponse(res, 200, true, 'Project deleted successfully', { project });
  } catch (error) {
    next(error);
  }
};

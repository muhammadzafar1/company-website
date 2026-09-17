import Team from '../models/Team.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const getTeam = async (_req, res, next) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Team fetched successfully', { team });
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const member = await Team.create({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image || '',
    });

    return sendResponse(res, 201, true, 'Team member created successfully', { member });
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return sendResponse(res, 404, false, 'Team member not found', {});
    }

    const updatedData = {
      ...req.body,
      ...(req.file ? { image: `/uploads/${req.file.filename}` } : {}),
    };

    const updatedMember = await Team.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return sendResponse(res, 200, true, 'Team member updated successfully', { member: updatedMember });
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      return sendResponse(res, 404, false, 'Team member not found', {});
    }

    return sendResponse(res, 200, true, 'Team member deleted successfully', { member });
  } catch (error) {
    next(error);
  }
};

import Contact from '../models/Contact.js';

const sendResponse = (res, statusCode, success, message, data = {}) => {
  return res.status(statusCode).json({ success, message, data });
};

export const submitContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    return sendResponse(res, 201, true, 'Message sent successfully', { contact });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (_req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Contact messages fetched successfully', { contacts });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return sendResponse(res, 404, false, 'Message not found', {});
    }

    return sendResponse(res, 200, true, 'Message deleted successfully', { contact });
  } catch (error) {
    next(error);
  }
};

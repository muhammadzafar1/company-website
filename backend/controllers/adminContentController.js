import BlogPost from '../models/BlogPost.js';
import Contact from '../models/Contact.js';
import Employee from '../models/Employee.js';
import Faq from '../models/Faq.js';
import Admin from '../models/Admin.js';
import AdminProfile from '../models/AdminProfile.js';
import Project from '../models/Project.js';
import Product from '../models/Product.js';
import PortfolioCase from '../models/PortfolioCase.js';
import QuoteRequest from '../models/QuoteRequest.js';
import Service from '../models/Service.js';
import Team from '../models/Team.js';
import Testimonial from '../models/Testimonial.js';

const resources = {
  adminprofiles: {
    label: 'Admin profiles',
    model: AdminProfile,
    fields: [
      { name: 'displayName', label: 'Display name', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
    ],
  },
  admins: {
    label: 'Admins',
    model: Admin,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', requiredOnCreate: true },
      { name: 'role', label: 'Role', type: 'select', options: ['admin', 'super-admin'], required: true },
    ],
    protectFields: ['password'],
  },
  projects: {
    label: 'Projects',
    model: Project,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'client', label: 'Client', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['ongoing', 'completed', 'upcoming'], required: true },
      { name: 'startDate', label: 'Start date', type: 'date', required: true },
      { name: 'deadline', label: 'Deadline', type: 'date', required: true },
      { name: 'assignedEmployees', label: 'Assigned employee IDs', type: 'json', array: true },
    ],
  },
  products: {
    label: 'Products',
    model: Product,
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'platform', label: 'Platform', type: 'text' },
      { name: 'platforms', label: 'Platforms', type: 'text' },
      { name: 'technologies', label: 'Technologies (JSON array)', type: 'json', array: true },
      { name: 'features', label: 'Features (JSON array)', type: 'json', array: true },
      { name: 'image', label: 'Image URL', type: 'url' },
      { name: 'link', label: 'Link', type: 'url' },
      { name: 'playStore', label: 'Play Store URL', type: 'url' },
      { name: 'liveDemo', label: 'Live demo URL', type: 'url' },
      { name: 'rating', label: 'Rating', type: 'number' },
      { name: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  portfoliocases: {
    label: 'Portfolio cases',
    model: PortfolioCase,
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'client', label: 'Client', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'image', label: 'Image URL', type: 'url' },
      { name: 'technologies', label: 'Technologies (JSON array)', type: 'json', array: true },
      { name: 'challenge', label: 'Challenge', type: 'textarea' },
      { name: 'solution', label: 'Solution', type: 'textarea' },
      { name: 'result', label: 'Result', type: 'textarea' },
      { name: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  employees: {
    label: 'Employees',
    model: Employee,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
    ],
  },
  services: {
    label: 'Services',
    model: Service,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'image', label: 'Image URL', type: 'url' },
      { name: 'price', label: 'Price', type: 'number' },
    ],
  },
  teams: {
    label: 'Teams',
    model: Team,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'position', label: 'Position', type: 'text', required: true },
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'shortBio', label: 'Short bio', type: 'textarea' },
      { name: 'about', label: 'About', type: 'textarea' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'experience', label: 'Experience', type: 'text' },
      { name: 'availability', label: 'Availability', type: 'text' },
      { name: 'skills', label: 'Skills (JSON array)', type: 'json', array: true },
      { name: 'focus', label: 'Focus (JSON array)', type: 'json', array: true },
      { name: 'portfolio', label: 'Portfolio (JSON array)', type: 'json', array: true },
      { name: 'image', label: 'Image URL', type: 'url' },
      { name: 'socialLinks', label: 'Social links (JSON object)', type: 'json' },
    ],
  },
  blogposts: {
    label: 'Blog posts',
    model: BlogPost,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
      { name: 'content', label: 'Content', type: 'textarea', required: true },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'tags', label: 'Tags (JSON array)', type: 'json', array: true },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'image', label: 'Image URL', type: 'url' },
      { name: 'seoTitle', label: 'SEO title', type: 'text' },
      { name: 'seoDescription', label: 'SEO description', type: 'textarea' },
      { name: 'publishedAt', label: 'Published at', type: 'date' },
      { name: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  faqs: {
    label: 'FAQs',
    model: Faq,
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'category', label: 'Category', type: 'select', options: ['General', 'Applications', 'Client Services'] },
      { name: 'isActive', label: 'Active', type: 'checkbox' },
    ],
  },
  testimonials: {
    label: 'Testimonials',
    model: Testimonial,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'review', label: 'Review', type: 'textarea', required: true },
      { name: 'rating', label: 'Rating', type: 'number' },
      { name: 'image', label: 'Image URL', type: 'url' },
    ],
  },
  contacts: {
    label: 'Contact messages',
    model: Contact,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'subject', label: 'Subject', type: 'text' },
      { name: 'service', label: 'Service', type: 'text' },
      { name: 'budget', label: 'Budget', type: 'text' },
      { name: 'message', label: 'Message', type: 'textarea', required: true },
    ],
  },
  quoterequests: {
    label: 'Quote requests',
    model: QuoteRequest,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'service', label: 'Service', type: 'text', required: true },
      { name: 'budget', label: 'Budget', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'deadline', label: 'Deadline', type: 'text' },
    ],
  },
};

const send = (res, status, message, data = {}) => res.status(status).json({ success: status < 400, message, data });

const getResource = (key) => resources[key];

const cleanPayload = (resource, body) => resource.fields.reduce((payload, field) => {
  const isProtectedField = (resource.protectFields || []).includes(field.name);
  if (body[field.name] !== undefined && (!isProtectedField || body[field.name])) {
    payload[field.name] = body[field.name];
  }
  return payload;
}, {});

const cleanAdminResponse = (resource, item) => {
  const serialized = item.toObject ? item.toObject() : item;
  (resource.protectFields || []).forEach((field) => delete serialized[field]);
  return serialized;
};

const hashAdminPassword = async (resource, payload) => {
  if (resource !== resources.admins || !payload.password) return payload;

  const bcrypt = await import('bcryptjs');
  return { ...payload, password: await bcrypt.default.hash(payload.password, 10) };
};

export const getContentMeta = (_req, res) => send(res, 200, 'Content metadata fetched successfully', {
  resources: Object.entries(resources).map(([key, resource]) => ({ key, label: resource.label, fields: resource.fields })),
});

export const listContent = async (req, res, next) => {
  const resource = getResource(req.params.resource);
  if (!resource) return send(res, 404, 'Content resource not found');

  try {
    const items = await resource.model.find().sort({ createdAt: -1 });
    return send(res, 200, `${resource.label} fetched successfully`, {
      items: items.map((item) => cleanAdminResponse(resource, item)),
    });
  } catch (error) {
    return next(error);
  }
};

export const createContent = async (req, res, next) => {
  const resource = getResource(req.params.resource);
  if (!resource) return send(res, 404, 'Content resource not found');

  try {
    const payload = await hashAdminPassword(resource, cleanPayload(resource, req.body));
    const item = await resource.model.create(payload);
    return send(res, 201, `${resource.label} item created successfully`, { item: cleanAdminResponse(resource, item) });
  } catch (error) {
    return next(error);
  }
};

export const updateContent = async (req, res, next) => {
  const resource = getResource(req.params.resource);
  if (!resource) return send(res, 404, 'Content resource not found');

  try {
    const payload = await hashAdminPassword(resource, cleanPayload(resource, req.body));
    const item = await resource.model.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!item) return send(res, 404, `${resource.label} item not found`);
    return send(res, 200, `${resource.label} item updated successfully`, { item: cleanAdminResponse(resource, item) });
  } catch (error) {
    return next(error);
  }
};

export const deleteContent = async (req, res, next) => {
  const resource = getResource(req.params.resource);
  if (!resource) return send(res, 404, 'Content resource not found');

  try {
    const item = await resource.model.findByIdAndDelete(req.params.id);
    if (!item) return send(res, 404, `${resource.label} item not found`);
    return send(res, 200, `${resource.label} item deleted successfully`, { item: cleanAdminResponse(resource, item) });
  } catch (error) {
    return next(error);
  }
};
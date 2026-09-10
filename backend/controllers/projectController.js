import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image || '',
    });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const updatedData = {
      ...req.body,
      ...(req.file ? { image: `/uploads/${req.file.filename}` } : {}),
    };

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project' });
  }
};

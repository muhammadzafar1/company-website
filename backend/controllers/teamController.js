import Team from '../models/Team.js';

export const getTeam = async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch team members' });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const member = new Team({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image || '',
    });
    const saved = await member.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create team member' });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Team member not found' });

    const updatedData = {
      ...req.body,
      ...(req.file ? { image: `/uploads/${req.file.filename}` } : {}),
    };

    const updatedMember = await Team.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update team member' });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Team member not found' });
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete team member' });
  }
};

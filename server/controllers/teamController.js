import { store } from '../utils/store.js';

export const getTeam = async (req, res) => {
  try {
    const { department } = req.query;
    let team = store.get('team');

    if (department && department !== 'ALL') {
      team = team.filter(t => t.department.toUpperCase() === department.toUpperCase());
    }

    res.json({ success: true, count: team.length, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const newMember = store.create('team', req.body);
    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const updated = store.update('team', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const deleted = store.delete('team', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.json({ success: true, message: 'Team member removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

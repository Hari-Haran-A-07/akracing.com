import { store } from '../utils/store.js';

export const getChampionships = async (req, res) => {
  try {
    const championships = store.get('championships');
    res.json({ success: true, count: championships.length, data: championships });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChampionshipById = async (req, res) => {
  try {
    const champ = store.findById('championships', req.params.id);
    if (!champ) {
      return res.status(404).json({ success: false, message: 'Championship not found' });
    }
    res.json({ success: true, data: champ });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createChampionship = async (req, res) => {
  try {
    const item = store.create('championships', req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateChampionship = async (req, res) => {
  try {
    const updated = store.update('championships', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Championship not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteChampionship = async (req, res) => {
  try {
    const deleted = store.delete('championships', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Championship not found' });
    }
    res.json({ success: true, message: 'Championship deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

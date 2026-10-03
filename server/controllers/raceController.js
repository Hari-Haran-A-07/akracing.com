import { store } from '../utils/store.js';

export const getRaces = async (req, res) => {
  try {
    const { status, season, country } = req.query;
    let races = store.get('races');

    if (status) {
      races = races.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }
    if (country) {
      races = races.filter(r => r.country.toLowerCase().includes(country.toLowerCase()));
    }

    res.json({ success: true, count: races.length, data: races });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRaceById = async (req, res) => {
  try {
    const race = store.findById('races', req.params.id);
    if (!race) {
      return res.status(404).json({ success: false, message: 'Race not found' });
    }
    res.json({ success: true, data: race });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRace = async (req, res) => {
  try {
    const newRace = store.create('races', req.body);
    res.status(201).json({ success: true, data: newRace });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRace = async (req, res) => {
  try {
    const updated = store.update('races', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Race not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRace = async (req, res) => {
  try {
    const deleted = store.delete('races', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Race not found' });
    }
    res.json({ success: true, message: 'Race removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Race Results
export const getResults = async (req, res) => {
  try {
    const results = store.get('results');
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createResult = async (req, res) => {
  try {
    const newResult = store.create('results', req.body);
    res.status(201).json({ success: true, data: newResult });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResult = async (req, res) => {
  try {
    const updated = store.update('results', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const deleted = store.delete('results', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    res.json({ success: true, message: 'Result deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

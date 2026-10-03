import { store } from '../utils/store.js';

export const getExperiences = async (req, res) => {
  try {
    const experiences = store.get('experiences');
    res.json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

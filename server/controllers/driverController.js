import { store } from '../utils/store.js';

export const getDriver = async (req, res) => {
  try {
    const driver = store.get('driver');
    res.json({ success: true, data: driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDriver = async (req, res) => {
  try {
    const updated = store.update('driver', 'ajith-kumar', req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

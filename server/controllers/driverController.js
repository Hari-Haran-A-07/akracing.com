import { store } from '../utils/store.js';

export const getDriver = async (req, res) => {
  try {
    const driver = store.get('driver');
    const drivers = store.get('drivers') || [driver];
    res.json({ success: true, data: driver, drivers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDrivers = async (req, res) => {
  try {
    const drivers = store.get('drivers') || [store.get('driver')];
    res.json({ success: true, data: drivers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = store.findById('driver', id);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
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

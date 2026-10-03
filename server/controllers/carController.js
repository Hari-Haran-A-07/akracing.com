import { store } from '../utils/store.js';

export const getCars = async (req, res) => {
  try {
    const cars = store.get('cars');
    res.json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = store.findById('cars', req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    res.json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCar = async (req, res) => {
  try {
    const newCar = store.create('cars', req.body);
    res.status(201).json({ success: true, data: newCar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const updated = store.update('cars', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const deleted = store.delete('cars', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    res.json({ success: true, message: 'Car removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

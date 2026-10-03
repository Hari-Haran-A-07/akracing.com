import { store } from '../utils/store.js';

export const getPartners = async (req, res) => {
  try {
    const partners = store.get('partners');
    res.json({ success: true, count: partners.length, data: partners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPartner = async (req, res) => {
  try {
    const newPartner = store.create('partners', req.body);
    res.status(201).json({ success: true, data: newPartner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const deleted = store.delete('partners', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    res.json({ success: true, message: 'Partner removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

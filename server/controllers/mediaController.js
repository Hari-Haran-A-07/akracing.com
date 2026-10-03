import { store } from '../utils/store.js';

export const getMedia = async (req, res) => {
  try {
    const { category, type } = req.query;
    let media = store.get('media');

    if (category && category !== 'ALL') {
      media = media.filter(m => m.category.toUpperCase() === category.toUpperCase());
    }
    if (type && type !== 'ALL') {
      media = media.filter(m => m.type.toLowerCase() === type.toLowerCase());
    }

    res.json({ success: true, count: media.length, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMedia = async (req, res) => {
  try {
    const newMedia = store.create('media', req.body);
    res.status(201).json({ success: true, data: newMedia });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const deleted = store.delete('media', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }
    res.json({ success: true, message: 'Media removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

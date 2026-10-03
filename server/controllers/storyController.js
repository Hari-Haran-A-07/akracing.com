import { store } from '../utils/store.js';

export const getStories = async (req, res) => {
  try {
    const { section } = req.query;
    let stories = store.get('stories');

    if (section && section !== 'ALL') {
      stories = stories.filter(s => s.section.toLowerCase() === section.toLowerCase());
    }

    res.json({ success: true, count: stories.length, data: stories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStoryBySlug = async (req, res) => {
  try {
    const story = store.findById('stories', req.params.slug);
    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    res.json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createStory = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newStory = store.create('stories', { ...req.body, slug });
    res.status(201).json({ success: true, data: newStory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStory = async (req, res) => {
  try {
    const updated = store.update('stories', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const deleted = store.delete('stories', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    res.json({ success: true, message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

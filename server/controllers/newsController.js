import { store } from '../utils/store.js';

export const getNews = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let news = store.get('news');

    if (category && category !== 'ALL') {
      news = news.filter(n => n.category.toLowerCase() === category.toLowerCase());
    }
    if (featured === 'true') {
      news = news.filter(n => n.featured);
    }

    res.json({ success: true, count: news.length, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    const article = store.findById('news', req.params.slug);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newArticle = store.create('news', { ...req.body, slug, publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
    res.status(201).json({ success: true, data: newArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const updated = store.update('news', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const deleted = store.delete('news', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import { store } from '../utils/store.js';

export const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newMessage = store.create('messages', {
      name,
      email,
      phone: phone || '',
      category: category || 'General',
      message,
      status: 'unread'
    });

    res.status(201).json({
      success: true,
      message: 'Your dispatch has reached the Ajith Kumar Racing headquarters. Our operations desk will respond shortly.',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = store.get('messages');
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    const updated = store.update('messages', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

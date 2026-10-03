import jwt from 'jsonwebtoken';
import { store } from '../utils/store.js';

const JWT_SECRET = process.env.JWT_SECRET || 'akr_motorsport_super_secure_jwt_secret_2026';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Default master admin account for instant access
    if (
      (email === 'admin@ajithkumarracing.com' && (password === 'akr2026' || password === 'admin123' || password === 'admin')) ||
      (email === 'director@akr.com')
    ) {
      const token = jwt.sign(
        { id: 'usr-admin', name: 'Ajith Kumar Racing Director', email, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '30d' }
      );
      return res.json({
        success: true,
        token,
        user: {
          id: 'usr-admin',
          name: 'AKR Race Director',
          email,
          role: 'admin'
        }
      });
    }

    // Standard member login simulation
    const user = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: email.includes('admin') ? 'admin' : 'member'
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      success: true,
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'member'
    };

    const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      success: true,
      token,
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

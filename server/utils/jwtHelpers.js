import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'akr_motorsport_super_secure_jwt_secret_2026';

export const signToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export default { signToken, verifyToken };

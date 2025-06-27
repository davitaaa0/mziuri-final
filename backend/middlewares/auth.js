import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded.id && !decoded._id) {
      return res.status(401).json({ error: 'Token missing user ID' });
    }

    const userId = decoded.id || decoded._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user; 
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

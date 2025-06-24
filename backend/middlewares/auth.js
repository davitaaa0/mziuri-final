import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ err: 'User not logged in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { id: decoded.id }; 
    next();
  } catch (err) {
    res.status(401).json({ err: 'Invalid token' });
  }
};


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.cookies['x-access-token'];

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

export default authMiddleware;

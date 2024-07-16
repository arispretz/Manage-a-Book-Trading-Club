import User from '../models/userModel.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken || req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error getting user' });
  }
};

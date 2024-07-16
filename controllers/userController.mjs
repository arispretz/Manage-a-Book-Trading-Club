import User from '../models/userModel.mjs';
import Book from '../models/bookModel.mjs';
import Request from '../models/requestModel.mjs';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate({
      path: 'ownedBooks',
      model: 'Book'
    }).populate({
      path: 'incomingRequests',
      model: 'Request'
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('ownedBooks');
    res.json(user.ownedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.params.userId }).populate('book', 'title');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Request from '../models/requestModel.mjs';
import Book from '../models/bookModel.mjs';
import User from '../models/userModel.mjs';

export const getRequestedBooks = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: 'requestedBooks',
      populate: [
        {
          path: 'book',
          model: 'Book',
          populate: {
            path: 'owner',
            model: 'User',
            select: 'name city'
          }
        }
      ]
    });
    res.json(user.requestedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRequestedBooks = async (req, res) => {
  try {
    const { userId, requestedBookIds } = req.body;
    const user = await User.findById(userId);
    user.requestedBooks = requestedBookIds;
    await user.save();
    res.json(user.requestedBooks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

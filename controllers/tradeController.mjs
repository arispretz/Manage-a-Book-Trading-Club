// controllers/tradeController.mjs
import Trade from '../models/tradeModel.mjs';
import User from '../models/userModel.mjs';
import Book from '../models/bookModel.mjs';

export const getTrades = async (req, res) => {
  try {
    const trades = await Trade.find()
      .populate('user', 'name')
      .populate('offeredBook')
      .populate('requestedBook');
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

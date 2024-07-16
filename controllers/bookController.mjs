import Book from '../models/bookModel.mjs';
import User from '../models/userModel.mjs';
import Request from '../models/requestModel.mjs';

export const addBook = async (req, res) => {
  try {
    const { title, description, owner } = req.body;
    const book = new Book({
      title,
      description,
      owner
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('owner', 'name');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookRequests = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate('requests.user', 'name');
    res.json(book.requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const requestBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    const request = new Request({
      book: book._id,
      user: req.body.userId,
      status: 'pending'
    });
    await request.save();
    book.requests.push(request);
    await book.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ owner: req.params.userId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

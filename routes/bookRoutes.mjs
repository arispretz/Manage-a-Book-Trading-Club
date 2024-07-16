import express from 'express';
import { getBooks, getBookRequests, requestBook, addBook, deleteBook, getUserBooks } from '../controllers/bookController.mjs';

const router = express.Router();

router.get('/', getBooks);
router.get('/:bookId/requests', getBookRequests);
router.post('/:bookId/request', requestBook);
router.post('/', addBook);
router.delete('/:bookId', deleteBook);
router.get('/user/:userId', getUserBooks);

export default router;

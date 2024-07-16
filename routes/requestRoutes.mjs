import express from 'express';
import { getRequestedBooks, updateRequestedBooks } from '../controllers/requestController.mjs';

const router = express.Router();

router.get('/user/:userId', getRequestedBooks);
router.put('/user/:userId', updateRequestedBooks);

export default router;

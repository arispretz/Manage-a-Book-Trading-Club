// routes/tradeRoutes.mjs
import express from 'express';
import { getTrades } from '../controllers/tradeController.mjs';

const router = express.Router();

router.get('/', getTrades);

export default router;

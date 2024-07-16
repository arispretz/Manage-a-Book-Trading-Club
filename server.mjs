import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import tradeRoutes from './routes/tradeRoutes.mjs';
import requestRoutes from './routes/requestRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { verifyToken } from './controllers/authController.mjs';

const app = express();
dotenv.config();

app.use(cors({
  origin: 'https://book-trading-club-frontend-ci06l6mor.vercel.app',
  credentials: true,
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cookieParser());

// Public routes
app.use('/api/books', bookRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/users', userRoutes);

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

// Protected routes
app.use('/api/user', verifyToken, userRoutes);
app.use('/api/requests', verifyToken, requestRoutes);

// Public route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offeredBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  requestedBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  status: { type: String, enum: ['Pending', 'Completed', 'Rejected'], default: 'Pending' }
});

export default mongoose.model('Trade', tradeSchema);

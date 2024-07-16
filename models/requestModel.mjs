import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
  requestedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

export default mongoose.model('Request', requestSchema);

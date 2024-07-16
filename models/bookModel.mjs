import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
});

export default mongoose.model('Book', bookSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  ownedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  incomingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
});

export default mongoose.model('User', userSchema);

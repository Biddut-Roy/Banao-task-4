import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  id: { type: String, required: true },
  symbol: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  direction: { type: String, enum: ['above', 'below'], required: true },
  notified: { type: Boolean, default: false },
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;

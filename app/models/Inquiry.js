import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  numberOfNights: {
    type: Number,
    required: true,
  },
  numberOfAdults: {
    type: Number,
    required: true,
  },
  numberOfKids: {
    type: Number,
    default: 0,
  },
  kidsAges: {
    below12: { type: Number, default: 0 },
    below5: { type: Number, default: 0 },
    below2: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema); 
import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  starCategory: {
    type: String,
    required: true,
    enum: ['3 Star', '4 Star', '5 Star', '5 Star Deluxe']
  },
  basis: {
    type: String,
    required: true,
    enum: ['BB', 'HB', 'FB', 'AI']
  },
  rates: {
    single: {
      type: Number,
      required: true
    },
    double: {
      type: Number,
      required: true
    },
    triple: {
      type: Number,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema); 
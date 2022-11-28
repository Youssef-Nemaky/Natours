const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: [true, 'Duration is required'],
  },

  difficulty: {
    type: String,
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: '{VALUE} is not valid',
    },
  },

  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required'],
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
  },

  summary: {
    type: String,
    trim: true,
    required: [true, 'Summary is required'],
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'Max group size is required'],
  },

  imageCover: {
    type: String,
    required: [true, 'Image Cover is required'],
  },
  ratingsAverage: {
    type: Number,
    required: [true, 'Ratings Average is required'],
  },
  ratingsQuantity: {
    type: Number,
    required: [true, 'Ratings Quantity is required'],
  },
  images: [String],
  startDates: [Date],
});

module.exports = mongoose.model('Tour', TourSchema);

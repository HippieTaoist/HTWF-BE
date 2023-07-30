const mongoose = require('mongoose');

const WormTipSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  story: {
    type: String,
  },
  image: {
    type: { type: String },
  },
  published_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = BlogPost = mongoose.model('', WormTipSchema);

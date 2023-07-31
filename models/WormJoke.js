const mongoose = require('mongoose');

const WormJokeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    t,
  },
  type: {
    type: String,
    required: true,
    enum: ['Q&A', 'Meme', 'Story'],
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

module.exports = BlogPost = mongoose.model('wormjoke', WormJokeSchema);

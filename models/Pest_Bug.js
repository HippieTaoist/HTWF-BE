const mongoose = require('mongoose');

const Pest_Bug = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  pros: {
    type: String,
  },
  cons: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: { type: String },
  },
  beddings: [
    {
      type: Schema.ObjectId,
      ref: 'bedding',
    },
  ],
  worms: [
    {
      type: Schema.ObjectId,
      ref: 'worm',
    },
  ],
  issues_resolutions: [
    {
      type: Schema.ObjectId,
      ref: 'issue_resolution',
    },
  ],
  author: {
    type: String,
    required: true,
  },
  published_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Pest_Bug = mongoose.model('pest_bug', Pest_Bug);

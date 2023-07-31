const mongoose = require('mongoose');

const BinSchema = new mongoose.Schema({
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
  worms: [
    {
      type: Schema.ObjectId,
      ref: 'worm',
    },
  ],
  diys: [
    {
      type: Schema.ObjectId,
      ref: 'diy',
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

module.exports = Bin = mongoose.model('bin', BinSchema);

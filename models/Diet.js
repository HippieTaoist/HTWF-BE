const mongoose = require('mongoose');

const DietSchema = new mongoose.Schema({
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
  diys: [{ type: Schema.ObjectId, ref: 'diy' }],
  worms: [{ type: Schema.ObjectId, ref: 'worm' }],
  issues_resolutions: [{ type: Schema.ObjectId, ref: 'issue_resolution' }],
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

module.exports = Diet = mongoose.model('diet', DietSchema);

const mongoose = require('mongoose');

const Issue_ResolutionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
  },
  resolution: {
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
  bins: [
    {
      type: Schema.ObjectId,
      ref: 'bin',
    },
  ],
  diets: [
    {
      type: Schema.ObjectId,
      ref: 'diet',
    },
  ],
  worms: [
    {
      type: Schema.ObjectId,
      ref: 'worm',
    },
  ],
  temperature: [
    {
      type: Schema.ObjectId,
      ref: 'temperature',
    },
  ],
  pests_bugs: [
    {
      type: Schema.ObjectId,
      ref: 'pest_bug',
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

module.exports = Issue_Resolution = mongoose.model(
  'issue_resolution',
  Issue_ResolutionSchema
);

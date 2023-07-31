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
  diy:{type:objectI}
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

module.exports = <Bedding></Bedding> = mongoose.model('bedding', BinSchema);

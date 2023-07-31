const mongoose = require('mongoose');

const WormSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    husbandry:{
      bedding: [{type:Schema.ObjectId, ref:'bedding'}],

      bin: [{type:Schema.ObjectId, ref:'bin'}],

      diet: [{type:Schema.ObjectId, ref:'diet'}],

      issue_resolution: [{type:Schema.ObjectId, ref:'issue_resolution'}],
},
  description: {
    type: String,
  },
  image: {
    type: { type: String },
  }
  ,
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

module.exports = <Bedding></Bedding> = mongoose.model('bedding', BeddingSchema);

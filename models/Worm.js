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

      bin_types: [{type:Schema.ObjectId, ref:'bin_types'}],

      feed_diet: [{type:Schema.ObjectId, ref:'feed_diet'}],

      issues_resolutions: [{type:Schema.ObjectId, ref:'issues_resolutions'}],

      worm_types: [{type:Schema.ObjectId, ref:'worm_types'}],
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

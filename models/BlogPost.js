const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  main_img: {
    type: String,
    default: '../imgs/Yin_and_Yang_symbol.svg.png',
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  post_body: {
    type: String,
  },
  published_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = BlogPost = mongoose.model('blogpost', BlogPostSchema);

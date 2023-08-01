const express = require('express');
const router = express.Router();

//Load Book Model
const BlogPost = require('../../models/BlogPost.js');

//@route Get api/books/test
//@description tests books route
//@access Public
router.get('/test', (req, res) => res.send('blogpost route testing!'));

//@route GET api/books/
//@description Get all books
//@access Public
router.get('/', (req, res) => {
  BlogPost.find()
    .then((blogposts) => res.json(blogposts))
    .catch((err) =>
      res.status(404).json({ noblogpostsfound: 'No Blog Posts Found' })
    );
});

//@route GET api/books/:id
//@description Get single book by id
//@access Public
router.get('/:id', (req, res) => {
  BlogPost.findById(req.params.id)
    .then((blogpost) => res.json(blogpost))
    .catch((err) =>
      res.status(404).json({ noblogpostfound: 'No Blog Post Found' })
    );
});

//@route GET api/blogposts
//@description add/save book
//@access Public
router.post('/', (req, res) => {
  BlogPost.create(req.body)
    .then((blogpost) => res.json({ msg: 'Blog Post added successfully' }))
    .catch((err) =>
      res.status(404).json({ error: 'Unable to add this blog post' })
    );
});

//@route GET api/blogposts/:id
//@description Update book
//@access Public
router.put('/:id', (req, res) => {
  BlogPost.findByIdAndUpdate(req.params.id, req.body)
    .then((blogpost) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

//@route GET api/blogposts/:id
//@description Delete blog post by id
//@access Public
router.delete('/:id', (req, res) => {
  BlogPost.findByIdAndDelete(req.params.id, req.body)
    .then((blogpost) =>
      res.json({ msg: 'Blog Post entry deleted successfully' })
    )
    .catch((err) => res.status(404).json({ error: 'No such a blog post' }));
});

module.exports = router;

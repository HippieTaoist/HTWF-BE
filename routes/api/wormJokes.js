const express = require('express');
const router = express.Router();

//Load WormJoke Model
const wormJoke = require('../../models/WormJoke.js');

//@route Get api/wormJokes/test
//@description tests wormJokes route
//@access Public
router.get('/test', (req, res) => res.send('wormJokes route testing!'));

//@route GET api/wormJokes/
//@description Get all wormJokes
//@access Public
router.get('/', (req, res) => {
  wormJoke
    .find()
    .then((wormJokes) => res.json(wormJokes))
    .catch((err) =>
      res.status(404).json({ noWormJokesfound: 'No Worm Jokes Found' })
    );
});

//@route GET api/wormJokes/:id
//@description Get single wormJoke by id
//@access Public
router.get('/:id', (req, res) => {
  wormJoke
    .findById(req.params.id)
    .then((wormJoke) => res.json(wormJoke))
    .catch((err) =>
      res.status(404).json({ nowormJokefound: 'No Worm Joke Found' })
    );
});

//@route GET api/wormJokes
//@description add/save book
//@access Public
router.post('/', (req, res) => {
  wormJoke
    .create(req.body)
    .then((wormJoke) => res.json({ msg: 'Worm joke added successfully' }))
    .catch((err) =>
      res.status(404).json({ error: 'Unable to add this worm joke' })
    );
});

//@route GET api/wormJokes/:id
//@description Update book
//@access Public
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((wormJoke) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

//@route GET api/wormJokes/:id
//@description Delete worm joke by id
//@access Public
router.delete('/:id', (req, res) => {
  WormJoke.findByIdAndDelete(req.params.id, req.body)
    .then((wormJoke) =>
      res.json({ msg: 'Blog Post entry deleted successfully' })
    )
    .catch((err) => res.status(404).json({ error: 'No such a blog post' }));
});

module.exports = router;

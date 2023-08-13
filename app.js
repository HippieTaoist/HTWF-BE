// app.js
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const users = require('./routes/users/usersRouter');
const books = require('./routes/api/books');
const blogPosts = require('./routes/api/blogPosts');
const wormJokes = require('./routes/api/wormJokes');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.send('Hello world! This is not the page you are looking for.')
);

// use Routes
app.use('/api/books', books);
app.use('/api/blogposts', blogPosts);
app.use('/api/wormjokes', wormJokes);
app.use('/api/users', users);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

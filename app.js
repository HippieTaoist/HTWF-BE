// app.js
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const books = require('./routes/api/books');
const blogPosts = require('./routes/api/blogposts');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);
app.use('/api/blogposts', blogPosts);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

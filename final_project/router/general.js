const express = require('express');
const axios = require('axios'); // REQUIRED
let router = express.Router();
let books = require("./booksdb.js");

// Get all books using async
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Get by ISBN using Promise
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => res.json(response.data))
    .catch(error => res.status(404).json({ message: "Book not found" }));
});

// Get by Author using async
router.get('/author/:author', async (req, res) => {
  try {
    const author = req.params.author;
    const result = Object.values(books).filter(
      book => book.author === author
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching author books" });
  }
});

// Get by Title using async
router.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const result = Object.values(books).filter(
      book => book.title === title
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching title books" });
  }
});

module.exports = router;

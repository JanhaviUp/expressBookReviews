const express = require('express');
let router = express.Router();
let books = require("./booksdb.js");

// Get all books
router.get('/', (req, res) => {
  res.send(books);
});

// Get by ISBN
router.get('/isbn/:isbn', (req, res) => {
  res.send(books[req.params.isbn]);
});

// Get by author
router.get('/author/:author', (req, res) => {
  const author = req.params.author;
  const result = Object.values(books).filter(
    book => book.author === author
  );
  res.send(result);
});

// Get by title
router.get('/title/:title', (req, res) => {
  const title = req.params.title;
  const result = Object.values(books).filter(
    book => book.title === title
  );
  res.send(result);
});

// Get reviews
router.get('/review/:isbn', (req, res) => {
  res.send(books[req.params.isbn].reviews);
});

module.exports = router;

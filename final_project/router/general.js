const express = require('express');
let router = express.Router();
let books = require("./booksdb.js");

// Get all books (async)
router.get('/', async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Get by ISBN (Promise)
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  })
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: err }));
});

// Get by Author (async)
router.get('/author/:author', async (req, res) => {
  const author = req.params.author;

  const result = Object.values(books).filter(
    book => book.author === author
  );

  return res.json(result);
});

// Get by Title (async)
router.get('/title/:title', async (req, res) => {
  const title = req.params.title;

  const result = Object.values(books).filter(
    book => book.title === title
  );

  return res.json(result);
});

module.exports = router;

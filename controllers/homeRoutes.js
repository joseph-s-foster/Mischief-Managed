const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { User, Book, Trivia, UserTrivia } = require('../models');
const withAuth = require('../utils/auth');

// Load book data from JSON file
const booksDataPath = path.join(__dirname, '../seeds/book_data.json');
const books = JSON.parse(fs.readFileSync(booksDataPath, 'utf-8'));

router.get('/', async (req, res) => {
  try {
    res.render('login', { layout: 'main', loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/session', withAuth, async (req, res) => {
  try {
    // Assuming you retrieve these data from your database or source
    const loggedIn = req.session.logged_in;
    const users = []; // Populate this array with user data

    res.render('session', {
      layout: 'main',
      loggedIn,
      books, // Send the books data to the session.hbs template
      users,
      // ... Add other data needed for the session.hbs template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/display/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const bookData = books.find(book => book.id === bookId);

    if (!bookData) {
      res.status(404).json({ message: 'No book found with that id!' });
      return;
    }

    console.log('Image URL:', bookData.image); // Log the image URL

    res.render('singleBook', {
      layout: 'main',
      title: bookData.title, // Pass the book title
      image: bookData.image, // Pass the image URL
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/session', async (req, res) => {
  try {
    // Handle form submission logic here
    // For example, you can update user session based on form data
    req.session.logged_in = true;
    res.redirect('/session'); // Redirect to the session page after form submission
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

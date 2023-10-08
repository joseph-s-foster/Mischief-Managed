const express = require('express');
const router = express.Router();
const { User, Book, Trivia, UserTrivia } = require('../../models');

// Route to display the session view
router.get('/', async (req, res) => {
  try {
    // Fetch data related to the session from the models
    const users = await User.findAll();
    const books = await Book.findAll();
    const trivia = await Trivia.findAll();
    const userTrivia = await UserTrivia.findAll();

    // Pass the fetched data to the 'session' view
    res.render('session', {
      layout: 'main',
      loggedIn: req.session.logged_in,
      users,
      books,
      trivia,
      userTrivia,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to handle a specific session ID (e.g., session/1)
router.get('/:id', (req, res) => {
  const id = req.params.id;
  // Handle the request for this specific ID (e.g., redirect to the appropriate page)
  // In this example, we'll just send a response indicating the requested ID
  res.send(`You requested session with ID ${id}`);
});

module.exports = router;

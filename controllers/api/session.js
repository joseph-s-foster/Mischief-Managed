const router = require('express').Router();
const { User, Book, Trivia, UserTrivia } = require('../../models');

router.get('/session', async (req, res) => {
  try {
    // You can use these constants in your route handler logic
    const users = await User.findAll(); // Example: Fetch users from the database
    const books = await Book.findAll(); // Example: Fetch books from the database
    const trivia = await Trivia.findAll(); // Example: Fetch trivia data
    const userTrivia = await UserTrivia.findAll(); // Example: Fetch user trivia data
    
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

module.exports = router;

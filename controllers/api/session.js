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

router.get('/:id', (req, res) => {
  const id = req.params.id;
  // Handle the request for this specific ID (e.g., redirect to the appropriate page)
  // In this example, we'll just send a response indicating the requested ID
  res.send(`You requested session with ID ${id}`);
});


module.exports = router;

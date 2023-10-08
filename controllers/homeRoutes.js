const router = require('express').Router();
const { User, Book, Trivia, UserTrivia  } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('login', { layout: 'main', loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/session', async (req, res) => {
  try {
    // Fetch data from the models
    const users = await User.findAll();
    const books = await Book.findAll();
    const triviaItems = await Trivia.findAll();
    const userTrivia = await UserTrivia.findAll();

    // Pass the fetched data to the 'session' view
    res.render('session', {
      layout: 'main',
      loggedIn: req.session.logged_in,
      users,
      books,
      triviaItems,
      userTrivia
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
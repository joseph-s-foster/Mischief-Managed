const router = require('express').Router();
const { User, Book, Trivia, UserTrivia } = require('../models');
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
    // Assuming you retrieve these data from your database or source
    const loggedIn = req.session.logged_in;
    const users = []; // Populate this array with user data

    // Assuming you have fetched the book data from your database
    const books = [
      { id: 1, title: "Harry Potter and the Sorcerer's Stone", image: "/covers/sorcerers_stone.png" },
      { id: 2, title: "Harry Potter and the Chamber of Secrets", image: "/covers/chamber_of_secrets.png" },
      { id: 3, title: "Harry Potter and the Prisoner of Azkaban", image: "/covers/prisoner_of_azkaban.png" },
      { id: 4, title: "Harry Potter and the Goblet of Fire", image: "/covers/goblet_of_fire.png" },
      { id: 5, title: "Harry Potter and the Order of the Phoenix", image: "/covers/order_of_the_phoenix.png" },
      { id: 6, title: "Harry Potter and the Half-Blood Prince", image: "/covers/half_blood_prince.png" },
      { id: 7, title: "Harry Potter and the Deathly Hallows", image: "/covers/deathly_hallows.png" }
    ];

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
    const bookData = await Book.findByPk(req.params.id);

    if (!bookData) {
      res.status(404).json({ message: 'No book found with that id!' });
      return;
    }

    res.render('singleBook', {
      layout: 'main',
      book: bookData,
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

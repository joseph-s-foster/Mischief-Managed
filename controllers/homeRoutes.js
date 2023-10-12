const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { User, Book, Trivia, UserTrivia } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require("sequelize");
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
    const bookId = parseInt(req.params.id, 10);  // Convert id to an integer

    const bookData = await Book.findOne({ where: { id: bookId } });
    if (!bookData) {
      res.status(404).json({ message: 'No book found with that id!' });
      return;
    }

    const book = bookData.get({ plain: true });
    const triviaData = await Trivia.findAll({ where: { book_id: bookId } });

    const milestoneTrivia = triviaData.map(t => t.get({ plain: true }));

    console.log('Image URL:', book.image);

    res.render('singleBook', {
      layout: 'main',
      title: book.title,
      image: book.image,
      id: book.id,
      milestoneTrivia
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

router.get('/user', withAuth, async (req,res)=> {
  try {
    const userTriviaData = await UserTrivia.findAll({where: {user_id: req.session.user_id}})
    const userTrivia = userTriviaData.map(t=>t.get({plain:true}))
    const triviaIds = userTrivia.map(t=>t.trivia_id)
    const triviaData = await Trivia.findAll({
      where: {
        id: { [Op.in]: triviaIds },

      }, 
      include: [Book]
    });
    const trivia = triviaData.map(t=>t.get({plain:true}))
    console.log(trivia);
    res.render("profile", {trivia})
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message)
  }
})

module.exports = router;

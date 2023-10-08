const express = require('express');
const router = express.Router();
const { Book } = require('../../models');
const sessionRoutes = require('./session');

// Include sessionRoutes
router.use('/session', sessionRoutes);

// Get a single book by ID
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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

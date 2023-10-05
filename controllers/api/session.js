const router = require('express').Router();
const { User, Book, Trivia, UserTrivia  } = require('../../models');

router.get('/session', async (req, res) => {
    try {
      res.render('session', { layout: 'main', loggedIn: req.session.logged_in });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router
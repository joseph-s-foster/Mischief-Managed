const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('login', { layout: 'main', loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router
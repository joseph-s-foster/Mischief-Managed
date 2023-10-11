const router = require('express').Router();
const passport = require('passport');
const { User } = require('../../models');


// User Registration Route
router.post('/', async (req, res) => {
  try {
    // Ensure that req.body contains 'password_hash' and 'email'
    const { password_hash, email } = req.body;

    // Create a new user with hashed password
    const userData = await User.create({
      password_hash, // Assuming this is already hashed
      email,
    });

    // Save user data in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;

      // Respond with user data or a success message
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ message: 'Failed to create a new user.' }); // Respond with an error message
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password_hash);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


// User Logout Route
router.post('/logout', (req, res) => {
  console.log(req.session.logged_in);
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');


// Configure Passport to use the LocalStrategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, {
            message: 'Incorrect email or password, please try again',
          });
        }

        const validPassword = await bcrypt.compare(password);

        if (!validPassword) {
          return done(null, false, {
            message: 'Incorrect email or password, please try again',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user data to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user data from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// User Registration Route
router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    // hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, 10);
    // create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// User Login Route
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/homepage', // Redirect on successful login
    failureRedirect: '/login', // Redirect on failed login
    failureFlash: true, // Enable flash messages for authentication errors
  })
);

// User Logout Route
router.post('/logout', (req, res) => {
  req.logout();
  res.status(204).end();
});

module.exports = router;
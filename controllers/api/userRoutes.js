const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');


// Configure Passport to use the LocalStrategy
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password_hash',
//     },
//     async (email, password_hash, done) => {
//       try {
//         const user = await User.findOne({ where: { email } });

//         if (!user) {
//           return done(null, false, {
//             message: 'Incorrect email or password, please try again',
//           });
//         }

//         const validPassword = await bcrypt.compare(password_hash);

//         if (!validPassword) {
//           return done(null, false, {
//             message: 'Incorrect email or password, please try again',
//           });
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// // Serialize user data to store in the session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user data from the session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findByPk(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

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
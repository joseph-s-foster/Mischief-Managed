const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ defaultLayout: "main", extname: '.hbs', helpers: helpers });
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const passport = require('passport');
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(routes);

app.get('/auth/google', 
  passport.authenticate('google', {
    scope:
    ['email']
  }
));

app.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/login', 
  }),
  function (req, res) {
    res.redirect('/session')
  }
);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


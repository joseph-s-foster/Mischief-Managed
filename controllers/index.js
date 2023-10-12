const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Import bookRoutes
// const bookRoutes = require('./api/bookRoutes');

// Use the imported routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Use the bookRoutes under the '/api/books' path
// router.use('/books', bookRoutes);

module.exports = router;



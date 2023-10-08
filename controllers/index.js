const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const bookRoutes = require('./api/bookRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/api', bookRoutes);

module.exports = router;


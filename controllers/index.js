const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const session = require('./api/session');
router.use('/api', apiRoutes);
router.use("/", homeRoutes);
router.use("/session", session);
module.exports = router;

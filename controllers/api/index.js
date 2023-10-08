const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use('/api', bookRoutes);

module.exports = router;

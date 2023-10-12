const express = require("express");
const router = express.Router();
const { Book, Trivia, UserTrivia } = require("../../models");
const sessionRoutes = require("./session");
const withAuth = require('../../utils/auth')
// Include sessionRoutes
router.use("/session", sessionRoutes);

// Get a single book by ID
router.get("/singlebook/:id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id);

    if (!bookData) {
      res.status(404).json({ message: "No book found with that id!" });
      return;
    }

    console.log("Image URL:", bookData.image); // Log the image URL

    res.render("singleBook", {
      layout: "main",
      title: bookData.title, // Pass the book title
      image: bookData.image, // Pass the image URL
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/trivia/:bookid/:milestone", withAuth, async (req, res) => {
  try {
      const triviaData = await Trivia.findAll({
    where: { book_id: req.params.bookid, trivia: req.params.milestone },
  });
  console.log(req.session.user_id);
  const trivia = triviaData.map((t) => t.get({ plain: true }));
  await UserTrivia.create({
    user_id: req.session.user_id,
    trivia_id: trivia[0].id,
  });
  res.json(trivia);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("You have already saved this milestone")
  }

});


module.exports = router;

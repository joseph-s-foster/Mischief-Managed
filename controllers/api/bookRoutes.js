const express = require("express");
const router = express.Router();
const { Trivia, UserTrivia } = require("../../models");
const withAuth = require('../../utils/auth')

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

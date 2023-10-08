const router = require('express').Router();
const { User, Book } = require('../../models');
const sessionRoutes = require('./session');

// TODO: refactor and rename to fit project
router.get('/', async (req, res) => {
  try {
    const bookData = await books.findAll({
      include: [{ model: User}],
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bookData = await books.findByPk(req.params.id, {
      include: [{ model: User}],
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found with that id!'})
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete('/:id', async (req, res) => {
//   try {
//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.use('/session', sessionRoutes);

module.exports = router;

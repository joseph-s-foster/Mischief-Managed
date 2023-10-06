const sequelize = require("../config/connection");
const { User, Book, Trivia, UserTrivia } = require("../models");
// TODO: refactor and rename to fit project
const userData = require("./user_data.json");
const bookData = require("./book_data.json");
const triviaData = require("./trivia_data.json");
const UserTriviaData = require("./user_trivia_data.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Book.bulkCreate(bookData);
  
  await Trivia.bulkCreate(triviaData);

  await UserTrivia.bulkCreate(UserTriviaData);

  console.log("Seeding done!");

  process.exit(0);
};

seedDatabase();

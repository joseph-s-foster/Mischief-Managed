const User = require('./User');
const Book = require('./book');
const Trivia = require('./trivia');
const UserTrivia = require('./user_trivia');
// TODO refactor to reflect our project
User.belongsToMany(Trivia, {
  foreignKey: 'user_id',
  through: UserTrivia,
});

Trivia.belongsToMany(User, {
  foreignKey: 'trivia_id',
  through: UserTrivia
});

Book.hasMany(Trivia, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE'
});

Trivia.belongsTo(Book, {
  foreignKey: 'book_id'
});

module.exports = { User, Book, Trivia, UserTrivia };

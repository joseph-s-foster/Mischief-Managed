const User = require('./User');
const Book = require('./book');
const Trivia = require('./trivia');
// TODO refactor to reflect our project
User.hasMany(Trivia, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Trivia.belongsTo(User, {
  foreignKey: 'user_id'
});

Book.hasMany(Trivia, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE'
});

Trivia.belongsTo(Book, {
  foreignKey: 'book_id'
});

module.exports = { User, Book, Trivia };

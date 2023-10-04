const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
    // },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;
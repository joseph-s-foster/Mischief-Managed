const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserTrivia extends Model {}

UserTrivia.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    trivia_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "trivia",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_trivia",
  }
);

module.exports = UserTrivia;

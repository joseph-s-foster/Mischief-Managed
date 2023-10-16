const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Spell extends Model {}

Spell.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "Spell", // Model name to use in Sequelize
    tableName: "spells", // Table name in the database (optional)
  }
);

module.exports = Spell;

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,

    },
    cooking_time_minutes: DataTypes.INTEGER,
    servings: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "recipe",
    underscored: true,
    freezeTableName: true,
    timestamps: false,
  }
);

// Export Post model
module.exports = Recipe;

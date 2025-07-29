const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe_Ingredient extends Model {}


Recipe_Ingredient.init(
  {
    recipe_id: DataTypes.INTEGER,
    ingredient_id: DataTypes.INTEGER,
    quantity: DataTypes.FLOAT,
    unit: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "recipe_ingredient",
    underscored: true,
    freezeTableName: true,
    timestamps: false,
  }
);

// Export Post model
module.exports = Recipe_Ingredient;
const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class Recipe_Ingredient extends Model {}


Recipe_Ingredient.init(
  {
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe_ingredients",
  }
);

// Export Post model
module.exports = Recipe_Ingredient;

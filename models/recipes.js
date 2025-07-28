const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipes.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cooking_time_minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "recipes",
  }
);

// Export Post model
module.exports = Recipe;

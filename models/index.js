const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

// import all models
const User = require("./User");
const Category = require("./Category");
const Ingredient = require("./Ingredient");
const Instructions = require("./Instructions");
const Recipe = require("./Recipe");
const Recipe_Ingredient = require("./Recipe_Ingredient");


//Associations between tables
Recipe.belongsTo(Category, { foreignKey: "category_id" });
Recipe.hasMany(Instructions, { foreignKey: "recipe_id", onDelete: "CASCADE" });
Recipe.hasMany(Recipe_Ingredient, { foreignKey: "recipe_id", onDelete: "CASCADE" });

Instructions.belongsTo(Recipe, { foreignKey: "recipe_id" });

Recipe_Ingredient.belongsTo(Recipe, { foreignKey: "recipe_id" });
Recipe_Ingredient.belongsTo(Ingredient, { foreignKey: "ingredient_id" });

module.exports = {
  sequelize,
  User,
  Recipe,
  Category,
  Ingredient,
  Instructions,
  Recipe_Ingredient,
};

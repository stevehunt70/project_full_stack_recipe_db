const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

// Initialize each model by calling the factory functions
const RecipeModel = require("./recipe");
const IngredientModel = require("./ingredient");
const RecipeIngredientModel = require("./recipe_ingredient");
const CategoryModel = require("./category");
const InstructionsModel = require("./instructions");
const UserModel = require("./user");

const Recipe = RecipeModel;
const Ingredient = IngredientModel(sequelize, Sequelize.DataTypes);
const RecipeIngredient = RecipeIngredientModel(sequelize, Sequelize.DataTypes);
const Category = CategoryModel;
const Instructions = InstructionsModel(sequelize, Sequelize.DataTypes);
const User = UserModel;


// Associations
// Category ↔ Recipe
Recipe.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Category.hasMany(Recipe, { foreignKey: "category_id" });

// Recipe ↔ Ingredient (Many-to-Many via RecipeIngredient)
Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  foreignKey: "recipe_id",
  otherKey: "ingredient_id",
  as: "ingredients",
});

Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient,
  foreignKey: "ingredient_id",
  otherKey: "recipe_id",
  as: "recipes",
});

// Recipe ↔ Instructions (One-to-Many)
Recipe.hasMany(Instructions, { 
  foreignKey: "recipe_id", 
  as: "instructions",
  onDelete: "CASCADE" 
});

Instructions.belongsTo(Recipe, { 
  foreignKey: "recipe_id" 
});

// Export the fully initialized models
module.exports = {
  sequelize,
  Sequelize,
  Recipe,
  Ingredient,
  RecipeIngredient,
  Category,
  Instructions,
  User,
};

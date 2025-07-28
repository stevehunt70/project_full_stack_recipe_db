// import all models
const Category = require("./Category");
const Ingredient = require("./Ingredient");
const Instructions = require("./Instructions");
const Recipe = require("./Recipe");
const Recipe_Ingredients = require("./Recipe_Ingredients");


//Associations between tables
Recipe.belongsTo(Category, {
    foreignKey: "category_id",
})

Category.hasMany(Recipe {
    foreignKey: "category_id",
});

Recipe.hasMany(Instructions, {
  foreignKey: "recipe_id",
});

Instructions.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

Recipe.belongsToMany(Ingredient, {
  through: Recipe_Ingredients,
  foreignKey: "recipe_id",
});

Ingredient.belongsToMany(Recipe, {
  through: Recipe_Ingredients,
  foreignKey: "ingredient_id",
});

module.exports = {
  Recipe,
  Category,
  Ingredient,
  Instructions,
  Recipe_Ingredients,
};

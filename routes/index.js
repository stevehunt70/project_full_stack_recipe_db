const router = require("express").Router();

const recipeRoutes = require("./recipes");
const categoryRoutes = require("./categories");
const ingredientRoutes = require("./ingredients");
const instructionRoutes = require("./instructions");
const recipeIngredientsRoutes = require("./recipe_ingredients");


router.use("/recipes", recipeRoutes);
router.use("/categories", categoryRoutes);
router.use("/ingredients", ingredientRoutes);
router.use("/instructions", instructionRoutes);
router.use("/recipe_ingredientss", recipeIngredientsRoutes);

module.exports = router;

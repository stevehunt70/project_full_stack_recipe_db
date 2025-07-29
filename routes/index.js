const router = require("express").Router();

const authRoutes = require("./auth");
const recipeRoutes = require("./recipes");
const categoriesRoutes = require("./categories");
const ingredientsRoutes = require("./ingredients");
const instructionsRoutes = require("./instructions");
const recipeIngredientsRoutes = require("./recipe_ingredients");

router.use("/auth", authRoutes);
router.use("/recipes", recipeRoutes);
router.use("/categories", categoriesRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/instructions", instructionsRoutes);
router.use("/recipe_ingredients", recipeIngredientsRoutes);

module.exports = router;

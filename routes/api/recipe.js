const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/authMiddleware");
const { Recipe, Category, Ingredient, RecipeIngredient, Instructions } = require("../../models");

router.get("/recipes", authenticate, async (req, res) => {

  console.log("📥 GET /api/recipes hit");

  try {
    const recipes = await Recipe.findAll({
      include: [
        { 
          model: Category,
          as: "category" },
        {
          model: Ingredient,
          through: { 
            model: RecipeIngredient,
            attributes: ["quantity", "unit"],
           },
          as: "ingredients",
        },
        {
          model: Instructions,
          as: "instructions",
        }
      ]
    });
    console.log("Fetched recipes:", JSON.stringify(recipes, null, 2));

    recipes.forEach((r) => {
      console.log(`➡️ Recipe:, ${r.title}`);
      r.ingredients.forEach((i) => {
        console.log(`   🧂 Ingredient: ${i.name}`);
        console.log(`      Quantity: ${i.recipe_ingredient?.quantity}`);
        console.log(`      Unit: ${i.recipe_ingredient?.unit}`)
      });
    });

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

module.exports = router;

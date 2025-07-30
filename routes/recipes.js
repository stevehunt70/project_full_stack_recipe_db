const express = require("express");
const router = express.Router();
const { Recipe, Category, Ingredient, RecipeIngredient, Instructions } = require("../models");
const auth = require("../middleware/authMiddleware");

// Get all recipes with ingredients and instructions
router.get("/", auth, async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        { model: Category, as: "category" },
        {
          model: Ingredient,
          as: "ingredients",
          through: { attributes: ["quantity", "unit"] },
        },
        { model: Instructions, as: "instructions" },
      ],
    });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipes", error });
  }
});

// Get recipe by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        { model: Category, as: "category" },
        {
          model: Ingredient,
          as: "ingredients",
          through: { attributes: ["quantity", "unit"] },
        },
        { model: Instructions, as: "instructions" },
      ],
    });

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving recipe" });
  }
});

// Add new recipe
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, cooking_time_minutes, servings, category_id, created_at } = req.body;
    const recipe = await Recipe.create({
      title,
      description,
      cooking_time_minutes,
      servings,
      category_id,
      created_at,
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error adding recipe", error });
  }
});

// Update recipe
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, cooking_time_minutes, servings, category_id, created_at } = req.body;
    const updated = await Recipe.update(
      { title, description, cooking_time_minutes, servings, category_id, created_at },
      { where: { id: req.params.id } }
    );
    if (updated[0] === 0) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating recipe" });
  }
});

// Delete recipe and related instructions and recipe_ingredients
router.delete("/:id", auth, async (req, res) => {
  try {
    await Instructions.destroy({ where: { recipe_id: req.params.id } });
    await RecipeIngredient.destroy({ where: { recipe_id: req.params.id } });
    const deleted = await Recipe.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting recipe" });
  }
});

// Test join for recipe with ingredients
router.get("/test-join", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      where: { id: 1 },
      include: [
        {
          model: Ingredient,
          as: "ingredients",
          through: { attributes: ["quantity", "unit"] },
        },
      ],
    });

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: "Join test failed" });
  }
});

module.exports = router;

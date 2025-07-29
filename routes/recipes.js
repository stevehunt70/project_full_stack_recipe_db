// create a new router
const express = require("express");
const router = express.Router();
const { Recipe, Instructions, Recipe_Ingredients } = require("../models");
const auth = require("../middleware/authMiddleware");

// Route to get all recipes
router.get("/", auth, async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipes", error: error });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving recipes" });
  }
});

// Route to add a new recipe
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, cooking_time_minutes, servings, category_id, created_at } = req.body;
    const recipe = await Recipe.create(
        { title, description, cooking_time_minutes, servings, category_id, created_at }
    );
    res.status(201).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error adding recipe", error: error });
  }
});

// Route to update a recipe
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, cooking_time_minutes, servings, category_id, created_at } = req.body;
    const update = await Recipe.update(
      { title, description, cooking_time_minutes, servings, category_id, created_at },
      { where: { id: req.params.id } }
    );
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: "Error updating recipe" });
  }
});

// Route to delete a recipe
router.delete("/:id", auth, async (req, res) => {
  try {
    await Instructions.destroy({ where: { recipe_id: req.params.id } });
    await Recipe_Ingredients.destroy({ where: { recipe_id: req.params.id } });
    await Recipe.destroy({ where: { id: req.params.id } });
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting recipe" });
  }
});

// export the router
module.exports = router;

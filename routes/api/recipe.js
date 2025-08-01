const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/authMiddleware");
const { Recipe, Category, Ingredient, RecipeIngredient, Instructions } = require("../../models");

//retrieve recipes
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

//add recipe
router.post("/recipes/add", authenticate, async (req, res) => {
  try {
    const {
      title,
      description,
      cooking_time_minutes,
      servings,
      category_id,
      instructions,
      ingredients,
    } = req.body;

    // 1. Create the Recipe
    const newRecipe = await Recipe.create({
      title,
      description,
      cooking_time_minutes,
      servings,
      category_id,
    });

    const recipe_id = newRecipe.id;

    // 2. Add Instructions
    if (Array.isArray(instructions)) {
      for (const step of instructions) {
        await Instructions.create({
          recipe_id,
          step_number: step.step_number,
          instruction: step.instruction,
        });
      }
    }

    // 3. Add Ingredients
    if (Array.isArray(ingredients)) {
      for (const ing of ingredients) {
        // Find or create the ingredient
        const [ingredient] = await Ingredient.findOrCreate({
          where: { name: ing.name.trim().toLowerCase() },
        });

        // Link with quantity/unit
        await RecipeIngredient.create({
          recipe_id,
          ingredient_id: ingredient.id,
          quantity: ing.quantity,
          unit: ing.unit,
        });
      }
    }

    res.status(201).json({ message: "Recipe added successfully!" });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ error: "Failed to add recipe" });
  }
});

//update recipe
router.put("/recipes/update/:id", authenticate, async (req, res) => {
  try {
    const recipeId = req.params.id;
    const {
      title,
      description,
      cooking_time_minutes,
      servings,
      category_id,
      instructions,
      ingredients
    } = req.body;

    // 1. Update Recipe
    await Recipe.update(
      { title, description, cooking_time_minutes, servings, category_id },
      { where: { id: recipeId } }
    );

    // 2. Replace instructions
    await Instructions.destroy({ where: { recipe_id: recipeId } });
    for (const step of instructions) {
      await Instructions.create({
        recipe_id: recipeId,
        step_number: step.step_number,
        instruction: step.instruction,
      });
    }

    // 3. Replace ingredients
    await RecipeIngredient.destroy({ where: { recipe_id: recipeId } });

    for (const ing of ingredients) {
      const [ingredient] = await Ingredient.findOrCreate({
        where: { name: ing.name.trim().toLowerCase() },
      });

      await RecipeIngredient.create({
        recipe_id: recipeId,
        ingredient_id: ingredient.id,
        quantity: ing.quantity,
        unit: ing.unit,
      });
    }

    res.json({ message: "Recipe updated successfully." });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

//delete recipe
router.delete("/recipes/:id", authenticate, async (req, res) => {
  const recipeId = req.params.id;

  try {
    // First delete instructions & ingredients
    await Instructions.destroy({ where: { recipe_id: recipeId } });
    await RecipeIngredient.destroy({ where: { recipe_id: recipeId } });

    // Then delete the recipe itself
    const deleted = await Recipe.destroy({ where: { id: recipeId } });

    if (deleted) {
      res.json({ message: "Recipe deleted successfully" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});



module.exports = router;

// create a new router
const app = require("express").Router();

// import the models
const { Recipe_Ingredients } = require("../models/index");

// Route to add a new recipe ingredients
app.post("/", async (req, res) => {
  try {
    const { recipe_id, ingredient_id, quantity, unit } = req.body;
    const recipe_ingredients = await Recipe_Ingredients.create(
        { recipe_id, ingredient_id, quantity, unit }
    );
    res.status(201).json(recipe_ingredients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding recipe ingredients", error: error });
  }
});

// Route to get all recipe ingredients
app.get("/", async (req, res) => {
  try {
    const recipe_ingredients = await Recipe_Ingredients.findAll();
    console.log(recipe_ingredients);
    res.json(recipe_ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error adding recipe_ingredients", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const recipe_ingredients = await Recipe_Ingredients.findByPk(req.params.id);
    res.json(recipe_ingredients);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving recipe ingredients" });
  }
});

// Route to update a recipe ingredient
app.put("/:id", async (req, res) => {
  try {
    const { recipe_id, ingredient_id, quantity, unit } = req.body;
    const update = await Recipe_Ingredients.update(
        { recipe_id, ingredient_id, quantity, unit }
    );
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: "Error updating recipe ingredients" });
  }
});

// Route to delete a recipe
app.delete("/:id", async (req, res) => {
  try {
    const deleted = await Recipe_Ingredients.destroy({ where: { id: req.params.id } });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Error deleting recipe ingredients" });
  }
});

// export the router
module.exports = app;

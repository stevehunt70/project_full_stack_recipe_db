// create a new router
const app = require("express").Router();

// import the models
const { Recipe } = require("../models/index");

// Route to add a new recipe
app.post("/", async (req, res) => {
  try {
    const { title, description, cooking_time_minutes, servings, category_id, created_at } = req.body;
    const recipes = await Recipe.create(
        { title, description, cooking_time_minutes, servings, category_id, created_at }
    );
    res.status(201).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding recipe", error: error });
  }
});

// Route to get all recipes
app.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    console.log(recipes);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipes", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const recipes = await Recipe.findByPk(req.params.id);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving recipes" });
  }
});

// Route to update a recipe
app.put("/:id", async (req, res) => {
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
app.delete("//:id", async (req, res) => {
  try {
    const deleted = await Recipe.destroy({ where: { id: req.params.id } });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Error deleting recipe" });
  }
});

// export the router
module.exports = app;

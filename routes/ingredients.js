// create a new router
const app = require("express").Router();

// import the models
const { Ingredient } = require("../models/index");

// Route to add a new ingredient
app.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const ingredient = await Ingredient.create({ name });
    res.status(201).json(ingredients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding ingredient", error: error });
  }
});

// Route to get all ingredients
app.get("/", async (req, res) => {
  try {
    console.log("Getting all ingredients");
    const ingredients = await Ingredient.findAll();
    console.log(ingredients);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error adding ingredients", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving ingredients" });
  }
});

// Route to update an ingredient
app.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const post = await Ingredient.update(
      { name },
      { where: { id: req.params.id } }
    );
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error updating ingredient" });
  }
});

// Route to delete an ingredient
app.delete("//:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.destroy({ where: { id: req.params.id } });
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: "Error deleting ingredient" });
  }
});

// export the router
module.exports = app;

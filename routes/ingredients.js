// create a new router
const express = require("express");
const router = express.Router();

// import the models
const { Ingredient } = require("../models");
const auth = require("../middleware/authMiddleware");

// Route to get all ingredients
router.get("/", auth, async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ingredients", error: error });
  }
});

// Route to add a new ingredient
router.post("/", auth, async (req, res) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error creating ingredient", error: error });
  }
});

// export the router
module.exports = router;

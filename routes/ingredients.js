const express = require("express");
const router = express.Router();

const { Ingredient } = require("../models");
const auth = require("../middleware/authMiddleware");

// Get all ingredients
router.get("/", auth, async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ingredients", error });
  }
});

// Add new ingredient
router.post("/", auth, async (req, res) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: "Error creating ingredient", error });
  }
});

module.exports = router;

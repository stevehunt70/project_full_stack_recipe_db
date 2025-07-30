const express = require("express");
const router = express.Router();
const { Category } = require("../models");
const auth = require("../middleware/authMiddleware");

// Get all categories
router.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories", error });
  }
});

// Add a new category
router.post("/", auth, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
});

module.exports = router;

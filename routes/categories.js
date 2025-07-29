// create a new router
const express = require("express");
const router = express.Router();
// import the model
const { Category } = require("../models");
const auth = require("../middleware/authMiddleware");

// Route to get all categories
router.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories", error: error });
  }
});

// Route to add a new category
router.post("/", auth, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error });
  }
});



// export the router
module.exports = router;

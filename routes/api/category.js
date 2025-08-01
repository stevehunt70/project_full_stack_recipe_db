const express = require("express");
const router = express.Router();
const { Category } = require("../../models");
const authenticate = require("../../middleware/authMiddleware");

// GET /api/categories - Get all categories
router.get("/categories", authenticate, async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name"], // Only return what you need
      order: [["name", "ASC"]]
    });
    res.json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;

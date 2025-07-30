const express = require("express");
const router = express.Router();

const { RecipeIngredient } = require("../models");
const auth = require("../middleware/authMiddleware");

router.get("/:recipe_id", auth, async (req, res) => {
  try {
    const rec_ings = await RecipeIngredient.findAll({
      where: { recipe_id: req.params.recipe_id },
    });

    res.json(rec_ings);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipe ingredients", error });
  }
});

module.exports = router;

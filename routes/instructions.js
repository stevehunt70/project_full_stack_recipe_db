// create a new router
const express = require("express");
const router = express.Router();

// import the models
const { Instructions } = require("../models");
const auth = require("../middleware/authMiddleware");

router.get("/:recipeId", auth, async (req, res) => {
  try {
    const steps = await Instructions.findByAll({
      where: { recipe_id:req.params.recipeID},
      prder: [["step_number", "ASC"]],
    });
    res.json(steps);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving instruction" });
  }
});

// add instruction to recipe
router.post("/", auth, async (req, res) => {
  try {
    const step = await Instructions.create(req.body);
    res.status(201).json(step);
  } catch (err) {
    res.status(500).json({ error: "Failed to add instruction" });
  }
});

// export the router
module.exports = router;
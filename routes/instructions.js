// create a new router
const app = require("express").Router();

// import the models
const { Instructions } = require("../models/index");

// Route to add a new instruction
app.post("/", async (req, res) => {
  try {
    const { recipe_id, step_number, instruction } = req.body;
    const new_instruction = await Instructions.create(
        { recipe_id, step_number, instruction }
    );
    res.status(201).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding instructions", error: error });
  }
});

// Route to get all instructions
app.get("/", async (req, res) => {
  try {
    const instructions = await Instructions.findAll();
    console.log(instructions);
    res.json(instructions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving instructions", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const instruction = await Instructions.findByPk(req.params.id);
    res.json(instruction);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving instruction" });
  }
});

// Route to update an instruction
app.put("/:id", async (req, res) => {
  try {
    const { recipe_id, step_number, instruction } = req.body;
    const updated = await Instructions.update(
        { recipe_id, step_number, instruction }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating instructions" });
  }
});

// Route to delete an instruction
app.delete("//:id", async (req, res) => {
  try {
    const deleted = await Instructions.destroy({ where: { id: req.params.id } });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Error deleting instruction" });
  }
});

// export the router
module.exports = app;

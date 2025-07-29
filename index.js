// backend/index.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/connection");

// Import routes
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Database sync and server start
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

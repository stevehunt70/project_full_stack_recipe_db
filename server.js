const dotenv = require("dotenv");
const express = require("express");
console.log("🚀 Server file loaded and running!");

const path = require("path");
const sequelize = require("./config/connection");
const authRoutes = require("./routes/auth"); 
const routes = require("./routes"); 
const recipeRoutes = require("./routes/api/recipe");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));
const categoryRoutes = require("./routes/api/category");
// API Routes
app.use("/api", categoryRoutes);
app.use("/api", recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", routes);

// Start server after DB sync
sequelize.sync().then(() => {
  console.log("Database synced.");
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});

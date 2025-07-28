const Sequelize = require("sequelize");

require("dotenv").config();

if (process.env.DB_PASSWORD === "ChangeMe!") {
  console.error("Please update the .env file with your database password.");
  process.exit(1);
}

const sequelize = new Sequelize(
      process.env.DB_DBNAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        port: process.env.DB_PORT || "3306",
        logging: false,
      }
    );

module.exports = sequelize;
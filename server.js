const express = require("express");
const app = express();
const routes = require("./routes");
const sequelize = require("./config/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("./api", routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
});
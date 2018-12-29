// external dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport-jwt");
const mongoose = require("mongoose");
// custom module dependencies
const config = require("./src/config/database");

//connect app to MongoDB database
mongoose.connect(config.database);
//on connection
mongoose.connection.on("connected", () => {
    console.log("connected to database " + config.database);
});
//on connection error
mongoose.connection.on("error", (error) => {
    console.log("Error connecting to database: " + error);
});

//initialize app
const app = express();
const port = 3000;

const users = require("./src/routes/users");

//enable cors and bodyparser middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/users", users);

app.use(express.static(path.join(__dirname, "/src/public")));

//set route into app homepage
app.get("/", (req, res) => {
    res.send("invalid endpoint");
});

//start server
app.listen(port, () => {
    console.log("Server started on port " + port);
});


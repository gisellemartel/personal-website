// external dependencies
const express = require("express");
const path = require("path");

//initialize app
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "/src")));

//set route into app homepage
app.get("/", (req, res) => {
    res.send("invalid endpoint");
});

//start server
app.listen(process.env.PORT || port, () => {
    console.log("Server started on port " + port);
});

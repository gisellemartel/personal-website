//server.js
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'src')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});
app.listen(process.env.PORT || 8080, () => {
    console.log("listening on port");
});

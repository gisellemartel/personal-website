const express = require("express");
const passport = require("passport-jwt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");

//register
router.post("/register", (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err) => {
        if (err) {
            res.json({ success: false, msg: "failed to register user" });
        } else {
            console.log("success");
            res.json({ success: true, msg: "User registered successfully" });
        }
    });
});

//authenticate
router.post("/authenticate", (req, res, next) => {
    res.send("authenticate");
});

//profile
router.get("/profile", (req, res, next) => {
    res.send("profile");
});

//validate
router.get("/validate", (req, res, next) => {
    res.send("/validate");
});

module.exports = router;
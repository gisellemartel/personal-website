const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database")
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
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(username, (err, user) => {
        if (err) {
            throw err;
        }

        if (user) {
            User.comparePassword(password, user.password, (err, isAMatch) => {
                if (err) {
                    throw err;
                }
                if (isAMatch) {
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800
                    });

                    res.json({
                        success: true,
                        token: "bearer" + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    })
                } else {
                    return res.json({ success: false, msg: "invalid password" });
                }
            });
        } else {
            return res.json({ success: false, msg: "failed to find user" });
        }
    })
});

//profile
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

//validate
router.get("/validate", (req, res, next) => {
    res.send("/validate");
});

module.exports = router;
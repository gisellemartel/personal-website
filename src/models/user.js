const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const config = require("../config/database");

//create database model for user information

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model("User", userSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUserName = (username, callback) => {
    const query = { username: username };
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (!err && newUser.password) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                newUser.password = hash;
                newUser.save(callback);
            });
        }
    });
};

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isAMatch) => {
        if (err) {
            throw err;
        }

        callback(null, isAMatch);
    });
};
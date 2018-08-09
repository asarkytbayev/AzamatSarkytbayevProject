const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * Registers the user
 * 
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
const register = function(req, res) {
    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    // user.dob = req.body.dob;
    // user.height = req.body.height;
    // user.position = req.body.position;
    // user.attack = req.body.attack;
    // user.defense = req.body.defense;
    // user.passing = req.body.passing;

    user.setPassword(req.body.password);

    user.save(function(err) {
        if (err) {
            res
                .status(400)
                .json(err);
            return;
        }
        let token;
        token = user.generateJwt();
        res
            .status(200)
            .json({
                "token": token
            });
    });
};

/**
 * Handles the login
 * 
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
const login = function(req, res) {
    // IIFE - immediately invoked function expression
    passport.authenticate('local', function(err, user, info) {
        // if passport throws error
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        let token;
        // if user is found
        if (user) {
            token = user.generateJwt();
            res
                .status(200)
                .json({
                    "token": token
                });
        } else {
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login
};
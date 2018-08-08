const passport = require('passport');
const mongoose = require('mongoose');
const Player = mongoose.model('Player');

/**
 * Registers the player
 * 
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
const register = function(req, res) {
    let player = new Player();

    player.name = req.body.name;
    player.dob = req.body.dob;
    player.height = req.body.height;
    player.position = req.body.position;
    player.attack = req.body.attack;
    player.defense = req.body.defense;
    player.passing = req.body.passing;

    player.setPassword(req.body.password);

    player.save(function(err) {
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
}

/**
 * Handles the login
 * 
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
const login = function(req, res) {
    // IIFE - immediately invoked function expression
    passport.authenticate('local', function(err, player, info) {
        // if passport throws error
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        let token;
        // if user is found
        if (player) {
            token = player.generateJwt();
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
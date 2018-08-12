const mongoose = require('mongoose');;
const Player = mongoose.model('Player');

/**
 * Creates a player
 * 
 * @param req HTTP request object
 * @param res HTTP request object
 */
const playersCreate = function(req, res) {
    Player.create({
        email: req.body.email,
        name: req.body.name,
        dob: req.body.dob,
        height: req.body.height,
        position: req.body.position,
        attack: req.body.attack,
        defense: req.body.defense,
        passing: req.body.passing
    }, (err, player) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(player);
        }
    });
};


/**
 * Reads a player profile
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const playersReadOne = function(req, res) {
    if (req.params && req.params.playerId) {
        Player
            .findById(req.params.playerId)
            .exec((err, player) => {
                if (!player) {
                    res
                        .status(404)
                        .json({
                            "message": "player not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(player);
            });
    } else {
        res
            .status(404)
            .json({
                "message" : "no playerId in request"
            });
    }
};

/**
 * Updates the players profile
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const playersUpdateOne = function(req, res) {
    if (!req.params.playerId) {
        res
            .status(404)
            .json({
                "message" : "Not found, playerId required"
            });
        return;
    }

    Player
        .findById(req.params.playerId)
        .exec((err, player) => {
            if (!player) {
                res
                    .json(404)
                    .status({
                        "message" : "playerId not found"
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            player.name = req.body.name;
            player.dob = req.body.dob;
            player.height = req.body.height;
            player.position = req.body.position;
            player.attack = req.body.attack;
            player.defense = req.body.defense;
            player.passing = req.body.passing;
            player.save((err, player) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(player);
                }
            });
        }
    );
};

/**
 * Finds and deletes the player profile
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const playersDeleteOne = function(req, res) {
    const playerId = req.params.playerId;
    if (playerId) {
        Loc
            .findByIdAndRemove(playerId)
            .exec((err, player) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(204)
                    .json(null);
            }
        );
    } else {
        res
            .status(404)
            .json({
                "message" : "No playerId"
            });
    }
}

/**
 * Finds and returns player profile by email
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const playersReadByEmail = function(req, res) {
    // console.log(req.params.playerEmail);
    // console.log(req.params);
    // req.param.playerEmail = 'a';
    if (req.params && req.params.playerEmail) {
        Player
            .findOne({ email: req.params.playerEmail })
            .exec((err, player) => {
                if (!player) {
                    res
                        .status(404)
                        .json({
                            "message": "player by email not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                // console.log(player);
                res
                    .status(200)
                    .json(player);
            });
    } else {
        res
            .status(404)
            .json({
                "message" : "no playerEmail in request"
            });
    }
};

module.exports = {
    playersCreate,
    playersReadOne,
    playersUpdateOne,
    playersDeleteOne,
    playersReadByEmail
};
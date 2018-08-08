const mongoose = require('mongoose');
const Player = mongoose.model('Player');

/**
 * Returns the player profile information
 * 
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
const profileRead = function(req, res) {
    if (!req.payload._id) {
        res
            .status(401)
            .json({
                "message": "UnauthorizedError: private profile"
            });
    } else {
        Player
            .findById(req.payload._id)
            .exec(function(err, user) {
                if (err) {
                    res
                        .status(404)
                        .json({
                            "message": "Profile not found"
                        });
                    return;
                }
                res
                    .status(200)
                    .json(user);
            });

    }
}

module.exports = {
    profileRead
};
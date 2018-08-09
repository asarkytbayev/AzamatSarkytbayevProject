const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * Returns the user profile information
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
    User
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
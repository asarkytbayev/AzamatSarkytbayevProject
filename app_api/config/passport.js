const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Player = mongoose.model('Player');

/**
 * Use Node module that simplifies the process of handling authentication
 */
passport.use(new LocalStrategy({
        // configure username
        usernameField: 'email'
    },
    function(username, password, done) {
        Player.findOne({ email: username}, function(err, player) {
            if (err) {
                return done(err);
            }
            // return if user isn't found in the db
            if (!player) {
                return done(null, false, {
                    message: 'Player not found'
                });
            }
            // return if password is wrong
            if (!player.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // if credentials are correct - return user object
            return done(null, player);
        });
    }
));
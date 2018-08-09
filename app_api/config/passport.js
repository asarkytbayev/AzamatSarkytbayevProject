const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * Use Node module that simplifies the process of handling authentication
 */
passport.use(new LocalStrategy({
        // configure username
        usernameField: 'email'
    },
    function(username, password, done) {
        User.findOne({ email: username}, function(err, user) {
            if (err) {
                return done(err);
            }
            // return if user isn't found in the db
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // if credentials are correct - return user object
            return done(null, user);
        });
    }
));
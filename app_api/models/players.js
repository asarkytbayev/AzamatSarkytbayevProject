const mongoose = require('mongoose');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

const playerSchema = new mongoose.Schema({
    // email: {
    //     type: String,
    //     unique: true,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    dob: Date,
    height: Number,
    position: {
        type: String,
        required: true
    },
    attack: Number,
    defense: Number,
    passing: Number,
    hash: String,
    salt: String
});

// /**
//  * Sets the password for the user by setting the salt and hash code
//  * 
//  * @param {string} password user's password
//  */
// playerSchema.methods.setPassword = function(password) {
//     // sets the salt
//     this.salt = crypto.randomBytes(16).toString('hex');
//     // sets the hash
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// };

// /**
//  * Compares input password's hash with the stored hash
//  * 
//  * @param {string} password entered password
//  */
// playerSchema.methods.validPassword = function(password) {
//     const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//     return this.hash === hash;
// }

// /**
//  * Generates a JSON Web Token (JWT) so that API
//  * can send it out as a response
//  * 
//  */
// playerSchema.methods.generateJwt = function() {
//     let expiry = new Date();
//     expiry.setDate(expiry.getDate() + 7);

//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         name: this.name,
//         exp: parseInt(expiry.getTime()/1000)
//     }, process.env.MY_SECRET);
// }

mongoose.model('Player', playerSchema);
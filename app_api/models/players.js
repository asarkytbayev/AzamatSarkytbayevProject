const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
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
});

mongoose.model('Player', playerSchema);
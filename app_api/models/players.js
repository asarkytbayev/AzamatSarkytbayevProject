const mongoose = require('mongoose');

const playerSchema = {
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
    passing: Number
};

mongoose.model('Player', playerSchema);
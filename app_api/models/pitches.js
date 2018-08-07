const mongoose = require('mongoose');

/**
 * Defines the schema for opening times
 */
const openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});

/**
 * Defines the schema for reviews
 */
const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

/**
 * Defines the main schema for a pitch
 */
const pitchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
    },
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    facilities: [String],
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Pitch', pitchSchema);
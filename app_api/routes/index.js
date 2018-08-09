const express = require('express');
const router = express.Router();

const ctrlPitches  = require('../controllers/pitches');
const ctrlReviews = require('../controllers/reviews');
const ctrlPlayers = require('../controllers/players');
const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const jwt = require('express-jwt');

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config({path: '../../.env'});
// }

const auth = jwt({
    // TODO: SET AN ENVIRONMENT VARIABLE
    secret: process.env.MY_SECRET,
    userProperty: 'payload'
});

/**
 * Handles routing for displaying a list of pitches and adding a pitch
 */
router
    .route('/pitches')
    .get(ctrlPitches.pitchesListByDistance)
    .post(ctrlPitches.pitchesCreate);

/**
 * Handles routing for reading, updating and deleting a pitch
 */
router
    .route('/pitches/:pitchId')
    .get(ctrlPitches.pitchesReadOne)
    .put(ctrlPitches.pitchesUpdateOne)
    .delete(ctrlPitches.pitchesDeleteOne);

/**
 * Handles routing for creating a review
 */
router
    .route('/piches/:pitchesId/reviews')
    .post(ctrlReviews.reviewsCreate);

/**
 * Handles routing for reading, updating and deleting a review
 */
router
    .route('/pitches/:pitchId/reviews/:reviewId')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

/**
 * Handles routing for registering
 */
// router
//     .route('/register')
//     .post(ctrlPlayers.playersCreate);

/**
 * Handles routing for reading, updating and deleting a player
 */
router
    .route('/players/:playerId')
    .get(ctrlPlayers.playersReadOne)
    .put(ctrlPlayers.playersUpdateOne)
    .delete(ctrlPlayers.playersDeleteOne);

/**
 * TODO: Add logic to CRUD a player + authentication
 */
router
    .route('/register')
    .post(ctrlAuth.register)

router
    .route('/login')
    .post(ctrlAuth.login);

router
    .route('/profile')
    .get(auth, ctrlProfile.profileRead);

module.exports = router;
const express = require('express');
const router = express.Router();

const ctrlPitches  = require('../controllers/pitches');
const ctrlReviews = require('../controllers/reviews');
const ctrlPlayers = require('../controllers/players');

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
 * Handles routing for creating a player
 */
router
    .route('/players')
    .post(ctrlPlayers.playersCreate);

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

module.exports = router;
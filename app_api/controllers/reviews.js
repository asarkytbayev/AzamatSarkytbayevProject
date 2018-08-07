const mongoose = require('mongoose');
const Pitch = mongoose.model('Pitch');

/**
 * Sets the average rating
 * 
 * @param pitch the pitch object
 */
const _doSetAverageRating = function(pitch) {
  // if there are reviews
  if (pitch.reviews && pitch.reviews.length > 0) {
    const reviewCount = pitch.reviews.length;
    // use reduce methods to add up ratings
    const ratingTotal = pitch.reviews.reduce((total, review) => {
      return total + review.rating;
    }, 0);
    let ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    pitch.rating = ratingAverage;
    pitch.save((err) => { // saves the document with updated rating
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};

/**
 * Updates the rating for the pitch given id
 * 
 * @param pitchId the id of a given pitch
 */
const _updateAverageRating = function(pitchId) {
  Pitch
    .findById(pitchId) // finds doc by Id to update the rating
    .select('rating reviews')
    .exec((err, pitch) => {
      if (!err) {
        _doSetAverageRating(pitch);
      }
    });
};

/**
 * Adds review for a given pitch
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 * @param pitch the given pitch
 */
const _doAddReview = function(req, res, pitch) {
  if (!pitch) { // must provIde parent doc
    res
      .status(404)
      .json({
        "message": "pitchId not found"
      });
  } else {
    pitch.reviews = pitch.reviews.concat(
      [{ // pushes data into subdocument array
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
      }]
    );
    // parent doc must be saved, subdocs cannot be saved on their own
    pitch.save((err, pitch) => {
      if (err) { // error
        // console.log("***_doAddReview***");
        res
          .status(400)
          .json(err);
      } else {
        // update average rating upon successful save
        // Id is always returned
        _updateAverageRating(pitch._Id); // if successfully saved data
        let thisReview = pitch.reviews[pitch.reviews.length - 1]; // retrieve last review and return it as JSON confirmation response - but why let? TODO
        res
          .status(201)
          .json(thisReview);
      }
    });
  }
};

/**
 * Creates a review
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const reviewsCreate = function(req, res) {
  const pitchId = req.params.pitchId;
  if (pitchId) {
    Pitch
      .findById(pitchId)
      // returns pitch with only reviews as a path
      .select('reviews')
      .exec((err, pitch) => {
        if (err) {
          // console.log("***reviews create***");
          res
            .status(400)
            .json(err);
        } else {
          // adds review for given pitch
          _doAddReview(req, res, pitch);
        }
      });
  } else { // error
    res
      .status(404)
      .json({
        "message": "Not found, pitchId required"
      });
  }
};

/**
 * Gets a single review
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const reviewsReadOne = function(req, res) {
  // check if reviewId parameter exists
  if (req.params && req.params.pitchId && req.params.reviewId) {
    Pitch
      .findById(req.params.pitchId)
      // limit the paths return from MongoDB - name of cafe and reviews
      .select('name reviews')
      .exec((err, pitch) => {
        if (!pitch) {
          res
            .status(404)
            .json({
              "message": "pitchId not found"
            });
          return;
        }
        else if (err) {
          // console.log("***reviewsReadOne***");
          res
            .status(400)
            .json(err);
          return;
        }
        // check that returned pitch has review
        if (pitch.reviews && pitch.reviews.length > 0) {
          // select the necessary review
          let review = pitch.reviews.Id(req.params.reviewId);
          if (!review) {  // if review wasn't found
            res
              .status(404)
              .json({
                "message": "reviewId not found"
              });
          } else {
            // if review found - build response object returning pitch name & Id and review
            response = {
              pitch: {
                name: pitch.name,
                Id: req.params.pitchId
              },
              review: review
            };
            res
              .status(200)
              .json(response);
          }
        } else { // no reviews exist
          res
            .status(404)
            .json({
              "message": "No reviews found"
            });
        }
      });
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, pitchId and reviewId are both required"
      });
  }

};

/**
 * Updates a review
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const reviewsUpdateOne = function(req, res) {
  if (!req.params.pitchId || !req.params.reviewId) {
    res
      .status(404)
      .json({
        "message": "Not found, pitch and reviewId are both required"
      });
    return;
  }
  Pitch
    .findById(req.params.pitchId) // find parent
    .select('reviews')
    .exec((err, pitch) => {
      if (!pitch) {
        res
          .status(404)
          .json({
            "message": "pitch not found"
          });
        return;
      }
      else if (err) {
        res
          .status(404)
          .json(err);
        return;
      }
      if (pitch.reviews && pitch.reviews.length > 0) {
        let thisReview = pitch.reviews.Id(req.params.reviewId);
        if (!thisReview) {
          res
            .status(404)
            .json({
              "message": "reviewId not found"
            });
        } else { // make changes to subdocument
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          pitch.save((err, pitch) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              _updateAverageRating(pitch._Id);
              res
                .status(200)
                .json(thisReview);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No review to update"
          });
      }
    }
  );
};

/**
 * Deletes a review
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const reviewsDeleteOne = function(req, res) {
  if (!req.params.pitchId || !req.params.reviewId) {
    res
      .status(404)
      .json({
        "message": "Not found, pitchId and reviewId are both required"
      })
    return;
  }
  Pitch
    .findById(req.params.pitchId)
    .select('reviews')
    .exec((err, pitch) => {
      if (!pitch) {
        res
          .status(404)
          .json({
            "message": "pitchId not found"
          });
        return;
      } else if (err) {
        // console.log("***deleteOne***");
        res
          .status(400)
          .json(err);
        return;
      }
      if (pitch.reviews && pitch.reviews.length > 0) {
        if (!pitch.reviews.Id(req.params.reviewId)) {
          res
            .status(404)
            .json({
              "message": "reviewId not found"
            });
        } else {
          pitch.reviews.Id(req.params.reviewId).remove(); // delete review
          pitch.save((err) => { // save parent
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              _updateAverageRating(pitch._Id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No review to delete"
          });
      }
    }
  );
};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
}

'use strict';

let mongoose = require('mongoose');
require('../models/ReviewModel');

let Review = mongoose.model('Reviews');
// save review method
exports.save = function (review) {
   // console.log("inside review");
    const newreview = new Review(review);
  //  console.log("before order review");
    const promise = newreview.save();
  //  console.log(promise);
    return promise;
};


/**
 * Returns an all reviews.
 *
 */
exports.reviewList = function () {
    const promise = Review.find().exec();
    return promise;
}


exports.listOfMovieReview = function (movieId) {
 //   console.log(movieId, "verifying");
    const promise = Review.find({ movieid: movieId }).exec();
    return promise;
}


/**
 * Returns the order object matching the user id.
 *
 * @param {string} userId {Id of the User object which has made movie booking orders}
 */
exports.user_reviews = function (userId) {
//   console.log('finding' - userId)
    const promise = Review.find({ userid: userId }).exec();
    return promise
};

/**
 * Deletes the contact object matching the id.
 *
 * @param {string} reviewId {Id of the contact object}
 */
exports.delete = function (reviewId) {
    const promise = Review.remove({ _id: reviewId });
    return promise;
};

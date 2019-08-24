'use strict';
//import review service.
const reviewService = require('../services/reviewServices');

//code for post method
exports.create_review = function (req, res) {
    console.log("inside create review");
    const newReview = Object.assign({}, req.body);
    console.log(newReview);
    const resolve = (review) => {
        res.status(200);
        res.json(review);

    };
    reviewService.save(newReview)
        .then(resolve)
        .catch(renderErrorResponse(res));
};

// error function
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};


//     /**
//     * Returns a contact object in JSON.
//     *
//     * @param {request} {HTTP request object}
//     * @param {response} {HTTP response object}
//     */
exports.user_reviews = function (request, response) {
    const resolve = (u_reviews) => {
        response.status(200);
        response.json(u_reviews);
    };
    reviewService.user_reviews(request.params.userId)
        .then(resolve)
        .then(console.log("user id " + request.params.userId))
        .catch(renderErrorResponse(response));
};

/**
* Returns a list of orders in JSON
*
* @param {request} {HTTP request object}
* @param {response} {HTTP response object}
*/
exports.list_all_reviews = function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    const resolve = (reviews) => {
        response.status(200);
        response.json(reviews);
    };
    reviewService.reviewList({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};



exports.list_reviews_each_movie = function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    const resolve = (reviews) => {
        response.status(200);
        console.log(reviews);
        response.json(reviews);
    };
    //using movieid to fetch reviews of a particular movie
    console.log(request, "request");
    console.log(request.params, "request params");
    console.log(request.params.movieId, "request.params.movieid");
    reviewService.listOfMovieReview(request.params.movieId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**s
 * Deletes a review object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
    const resolve = (review) => {
        response.status(200);
        response.json({
            message: 'Review Successfully deleted'
        });
    };
    reviewService.delete(request.params.reviewId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};




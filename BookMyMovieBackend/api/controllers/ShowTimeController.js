'use strict';
//import user service.
const showtimeService = require('../services/showtimeServices');
let mongoose = require('mongoose');
/**
 * Returns a list of contacts in JSON
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
let ShowTime = mongoose.model('ShowTime');
exports.list = function (request, response) {

    const resolve = (showtime) => {
        response.status(200);
        response.json(showtime);
    };
    showtimeService.list({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};
// get list of showtime by movieId
exports.list_by_movie = function (request, response) {
    console.log(request.params.movieId);
    ShowTime.aggregate([
        { $match: { movieId: mongoose.Types.ObjectId(request.params.movieId) } },
        { '$lookup': { from: 'movies', localField: 'movieId', foreignField: '_id', as: 'movieRef' } },
        { '$unwind': '$movieRef' },
        { '$lookup': { from: 'theatres', localField: 'theatreId', foreignField: '_id', as: 'theatreRef' } },
        { '$unwind': '$theatreRef' }
    ]).exec(function (err, docs) {
        response.json(docs);

    });

};

//Get all show time
exports.list_all_showtime = function (request, response) {
    // lookup to get movie and theater data
    ShowTime.aggregate([
        { '$lookup': { from: 'movies', localField: 'movieId', foreignField: '_id', as: 'movieRef' } },
        { '$unwind': '$movieRef' },
        { '$lookup': { from: 'theatres', localField: 'theatreId', foreignField: '_id', as: 'theatreRef' } },
        { '$unwind': '$theatreRef' }
    ]).exec(function (err, docs) {
        response.json(docs);

    });
};

//code for post method
exports.create_showtime = function (req, res) {
    const newshowtime = Object.assign({}, req.body);
    console.log(req.body);
    const resolve = (show) => {

        res.status(200);
        res.json(show);
    };
    showtimeService.save(newshowtime)
        .then(resolve).then(console.log("resolved"))
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
exports.lists = function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    const resolve = (contacts) => {
        response.status(200);
        response.json(contacts);
    };
    showtimeService.userList({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

exports.show_detail = function (request, response) {
    const resolve = (show) => {
        response.status(200);
        response.json(show);
    };
    showtimeService.get_show(request.params.showId)
        .then(resolve)

        .catch(renderErrorResponse(response));
};



'use strict';

let mongoose = require('mongoose');
require('../models/TheatreModel');

let Theatre = mongoose.model('Theatre');
// save method
exports.save = function (theatre) {
    const newTheatre = new Theatre(theatre);
    const promise = newTheatre.save();
   // console.log(pr
    return promise;
};


exports.get = function (theaterId) {
    const promise = Theatre.findById(theaterId).exec();
    return promise;
};


/**
 * Returns an all theaters.
 *
 */
exports.theaterList = function() {
    const promise = Theatre.find().exec();
    return promise;
}

